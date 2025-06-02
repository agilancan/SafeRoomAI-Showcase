# backend\scripts\compute_threshold.py
import os
import numpy as np
import tensorflow as tf

# 1) Load the saved AE and normalization stats
ae     = tf.keras.models.load_model("models/autoencoder.h5", compile=False)
stats  = np.load("models/ae_norm_stats.npz")
mean   = stats["mean"]
std    = stats["std"]

# 2) Load held-out “normal” features.
raw = np.load("data/normal_features.npy")  # shape = (N, feature_dim)
from sklearn.model_selection import train_test_split
_, X_val_raw = train_test_split(
    raw, test_size=0.1, random_state=42, shuffle=True
)

# 3) Normalize X_val_raw exactly as during training:
X_val_norm = (X_val_raw - mean) / std
X_val_norm = X_val_norm.astype(np.float32)

# 4) Compute reconstruction errors on every validation example:
recon_errors = []
batch_size = 64
for i in range(0, len(X_val_norm), batch_size):
    batch = X_val_norm[i : i + batch_size]
    x_pred = ae.predict(batch, verbose=False)
    errs = np.mean((x_pred - batch) ** 2, axis=1)  # one error per sample
    recon_errors.extend(errs.tolist())

recon_errors = np.array(recon_errors, dtype=np.float32)

# 5) Inspect the distribution, e.g. print mean/std or percentiles:
print("validation recon_error mean:", recon_errors.mean())
print("validation recon_error std: ", recon_errors.std())
for p in [50, 90, 95, 99]:
    print(f"  {p}th percentile:", np.percentile(recon_errors, p))

# 6) Save these errors if you want to plot them somewhere:
np.save("data/val_recon_errors.npy", recon_errors)
