# backend\scripts\test_ae.py
import numpy as np
import tensorflow as tf

# 1) Load the autoencoder model
ae = tf.keras.models.load_model("models/autoencoder.h5", compile=False)

# 2) Load your normalization statistics (must match exactly what the AE was trained on)
stats = np.load("models/ae_norm_stats.npz")
mean = stats["mean"]  # shape = (feature_dim,)
std  = stats["std"]   # shape = (feature_dim,)

# 3) Guard against any extremely small std to avoid division → ±∞:
eps = 1e-3
std[std < eps] = eps

# 4) Construct a “typical” input. 
#    A safe choice is to feed exactly the training‐mean vector:
x_raw  = mean.copy()                      # shape = (feature_dim,)
x_norm = (x_raw - mean) / std              # this should be all zeros
x_input = x_norm.reshape(1, -1).astype(np.float32)  # shape = (1, feature_dim)

# 5) Make sure x_input is finite:
if np.isnan(x_input).any() or np.isinf(x_input).any():
    raise RuntimeError("❌ x_input contains NaN or Inf—check your mean/std arrays.")

# 6) Run the AE’s predict() and inspect the output
x_pred = ae.predict(x_input, verbose=False)  # shape = (1, feature_dim)

# 7) Check for any NaNs in x_pred
print("Any NaN in x_pred? ", np.isnan(x_pred).any())
print("Any Inf in x_pred? ", np.isinf(x_pred).any())

# 8) Print the first few values and compute reconstruction error
print("x_pred[0,:5] =", x_pred[0, :5])
recon_error = float(np.mean((x_pred - x_input) ** 2))
print("Reconstruction error =", recon_error)
