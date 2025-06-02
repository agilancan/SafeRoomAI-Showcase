# backend\scripts\test_ae_isolation.py
import numpy as np
import tensorflow as tf

# 1) Load the autoencoder (no compile needed)
ae = tf.keras.models.load_model("models/autoencoder.h5", compile=False)

# 2) Load the same normalization stats you used when training:
stats = np.load("models/ae_norm_stats.npz")
mean = stats["mean"]   # shape = (feature_dim,)
std  = stats["std"]    # shape = (feature_dim,)

# 2a) Guard against any zero‐std entries:
eps = 1e-6
std[std < eps] = eps

print("✓ AE and stats loaded.")
print("   mean.shape:", mean.shape, " std.shape:", std.shape)

# 3) Load a handful of your “normal” feature vectors (from data/normal_features.npy)
#    These were the pose+YOLO histograms you collected during extract_normal_features.py.
raw = np.load("data/normal_features.npy")  # shape = (N, feature_dim)
print("✓ raw.shape:", raw.shape)

# 4) Take the first 5 samples and check that normalization works:
for i in range(5):
    x_raw = raw[i].astype(np.float32)
    x_norm = (x_raw - mean) / std

    # Sanity check:
    if np.isnan(x_norm).any() or np.isinf(x_norm).any():
        raise RuntimeError(f"❌ x_norm[{i}] has NaN or Inf.")

    x_input = x_norm.reshape(1, -1)
    x_pred = ae.predict(x_input, verbose=False)

    # If reconstruction itself contains NaN, something is wrong:
    if np.isnan(x_pred).any():
        raise RuntimeError(f"❌ x_pred[{i}] has NaN. AE might be corrupted or stats mismatch.")

    recon_error = float(np.mean((x_pred - x_input) ** 2))
    print(f"[sample {i}] recon_error = {recon_error:.6f}")

# 5) If you get small, non‐NaN errors on these “normal” samples, your AE + stats are correct.
