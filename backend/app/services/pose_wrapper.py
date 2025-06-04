# backend/app/services/pose_wrapper.py

import cv2
import numpy as np
import mediapipe as mp

class PoseDetector:
    """
    Wraps MediaPipe Pose to output 18 landmark (x, y) coordinates per frame.
    Ignores z + visibility; only returns (x, y) in pixel coords.
    """

    def __init__(self, static_image_mode=False, min_detection_confidence=0.5):
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(
            static_image_mode=static_image_mode,
            min_detection_confidence=min_detection_confidence,
            model_complexity=1,
        )

        # Select exactly 18 indices from MediaPipe’s 0–32 range.
        self.selected_indices = [
            0,   # nose
            1,   # left eye inner
            11,  # left shoulder
            12,  # right shoulder
            13,  # left elbow
            14,  # right elbow
            15,  # left wrist
            16,  # right wrist
            23,  # left hip
            24,  # right hip
            25,  # left knee
            26,  # right knee
            27,  # left ankle
            28,  # right ankle
            29,  # left heel
            30,  # right heel
            31,  # left foot index
            32,  # right foot index
        ]

    def detect_pose(self, frame: np.ndarray) -> np.ndarray:
        """
        Given a BGR frame, return an array of shape (18, 2) containing
        (x, y) pixel coordinates for each selected landmark.
        If no landmarks are detected for a given index, returns (0, 0) for that joint.
        """
        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(img_rgb)

        coords = np.zeros((len(self.selected_indices), 2), dtype=np.float32)
        if results.pose_landmarks:
            h, w, _ = frame.shape
            for i, idx in enumerate(self.selected_indices):
                # Each landmark has normalized coordinates mp_landmark.x, mp_landmark.y
                lm = results.pose_landmarks.landmark[idx]
                coords[i, 0] = lm.x * w  # Convert normalized x to pixel
                coords[i, 1] = lm.y * h  # Convert normalized y to pixel
        # If no pose_landmarks or some indices missing, coords remains (0,0) for those entries
        return coords
