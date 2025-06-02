# backend/scripts/extract_normal_features.py
import os
import sys

# Make sure “app” is on the path
SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))
BACKEND_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, os.pardir))
sys.path.insert(0, BACKEND_DIR)

from app.services.pose_wrapper import PoseDetector
from ultralytics import YOLO
import cv2
import numpy as np

# Initialize Pose & YOLO
pose = PoseDetector()
yolo = YOLO("models/yolov8n.pt")
cap = cv2.VideoCapture(0)

features = []  # list of full feature vectors (pose, velocity, yolo_hist)

# Grab one initial pose to compute the first velocity
ret, first_frame = cap.read()
if not ret:
    print("Failed to grab first frame.")
    cap.release()
    sys.exit(1)

prev_pose_kpts = pose.detect_pose(first_frame).reshape(-1)  # (36,)

# Collect N frames (with real velocity)
N = 200
count = 0

while count < N:
    ret, frame = cap.read()
    if not ret:
        break

    # 1) Current pose keypoints
    curr_pose_kpts = pose.detect_pose(frame).reshape(-1)  # (36,)

    # 2) Compute pose velocity = curr - prev
    pose_vel = curr_pose_kpts - prev_pose_kpts  # (36,)
    prev_pose_kpts = curr_pose_kpts.copy()

    # 3) YOLO histogram
    yolo_res = yolo(frame, verbose=False)
    num_classes = len(yolo.model.names)
    class_hist = np.zeros(num_classes, dtype=np.float32)
    for cls_idx in yolo_res[0].boxes.cls.cpu().numpy().astype(int):
        class_hist[cls_idx] += 1.0

    # 4) Concatenate: [pose_coords, pose_vel, class_hist]
    feat = np.concatenate([curr_pose_kpts, pose_vel, class_hist])  # (36 + 36 + num_classes,)
    features.append(feat)

    count += 1

cap.release()

# Stack into array of shape (N, feature_dim)
features = np.vstack(features)
os.makedirs("data", exist_ok=True)
np.save("data/normal_features.npy", features)
print(f"Saved {features.shape[0]} normal feature vectors → data/normal_features.npy")
