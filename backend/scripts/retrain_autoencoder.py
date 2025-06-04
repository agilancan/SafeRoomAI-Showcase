# backend\scripts\retrain_autoencoder.py
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from sklearn.model_selection import train_test_split

# ── Config ───────────────────────────────────────────────────────────────────

# Paths 
FEATURES_PATH = os.path.join("data", "normal_features.npy")
MODEL_DIR     = os.path.join("models")
AE_MODEL_PATH = os.path.join(MODEL_DIR, "autoencoder.h5")
STATS_PATH    = os.path.join(MODEL_DIR, "ae_norm_stats.npz")

# Hyperparameters
TEST_SIZE      = 0.1        # 10% held out for validation
RANDOM_SEED    = 42
BATCH_SIZE     = 32
EPOCHS         = 50
LEARNING_RATE  = 1e-3
HIDDEN_UNITS  = [128, 64, 32, 64, 128]  # symmetric autoencoder
FEATURE_DIM   = None       # will infer from data
EPS_STD       = 1e-3       # floor for any very small std

# ── Load data ────────────────────────────────────────────────────────────────

print("1) Loading normal features from:", FEATURES_PATH)
features = np.load(FEATURES_PATH)  # shape: (N, D)
FEATURE_DIM = features.shape[1]
print(f"   → features.shape = {features.shape}\n")

# ── Split into train / val ──────────────────────────────────────────────────

train_feats, val_feats = train_test_split(
    features,
    test_size=TEST_SIZE,
    random_state=RANDOM_SEED,
    shuffle=True
)
print("2) Split into train / val:")
print("   train_feats.shape =", train_feats.shape)
print("   val_feats.shape   =", val_feats.shape, "\n")

# ── Compute normalization stats on training set ──────────────────────────────

print("3) Computing mean/std on training set…")
mean = np.mean(train_feats, axis=0)  # shape (D,)
std  = np.std(train_feats, axis=0)   # shape (D,)
print("   Pre‐cleanup: some std minima/maxima:",
      round(np.min(std), 6), "...", round(np.max(std), 6))

# Avoid any division by zero or extremely tiny values
std_corrected = std.copy()
too_small = std_corrected < EPS_STD
if np.any(too_small):
    print("   ⚠️ Replacing std < %g at indices:" % EPS_STD, np.where(too_small)[0][:10])
    std_corrected[too_small] = EPS_STD

print("   Post‐cleanup: std minima/maxima:",
      round(np.min(std_corrected), 6), "...", round(np.max(std_corrected), 6), "\n")

# Save normalization stats
os.makedirs(MODEL_DIR, exist_ok=True)
np.savez(STATS_PATH, mean=mean, std=std_corrected)
print(f"4) Saved normalization stats to: {STATS_PATH}\n")

# ── Normalize train/val sets ─────────────────────────────────────────────────

def normalize(x, mean, std):
    return (x - mean) / std

X_train = normalize(train_feats, mean, std_corrected).astype(np.float32)
X_val   = normalize(val_feats,   mean, std_corrected).astype(np.float32)

# Quick check that no NaN/Inf remain
assert not np.isnan(X_train).any(), "X_train contains NaN after normalization!"
assert not np.isinf(X_train).any(), "X_train contains Inf after normalization!"
assert not np.isnan(X_val).any(),   "X_val contains NaN after normalization!"
assert not np.isinf(X_val).any(),   "X_val contains Inf after normalization!"
print("5) Normalization sanity check passed (no NaN or Inf in X_train/X_val).\n")

# ── Build a simple fully‐connected autoencoder ─────────────────────────────────

print("6) Building autoencoder model…")
inputs = layers.Input(shape=(FEATURE_DIM,), name="encoder_input")
x = inputs
# Encoder
for i, units in enumerate(HIDDEN_UNITS[: len(HIDDEN_UNITS)//2 ]):
    x = layers.Dense(units, activation="relu", name=f"encoder_dense_{i}")(x)

# Bottleneck
bottleneck_units = HIDDEN_UNITS[len(HIDDEN_UNITS)//2]
x = layers.Dense(bottleneck_units, activation="relu", name="bottleneck")(x)

# Decoder (mirror encoder)
for i, units in enumerate(reversed(HIDDEN_UNITS[: len(HIDDEN_UNITS)//2 ])):
    x = layers.Dense(units, activation="relu", name=f"decoder_dense_{i}")(x)

# Reconstruction layer
outputs = layers.Dense(FEATURE_DIM, activation="linear", name="decoder_output")(x)

autoencoder = models.Model(inputs, outputs, name="autoencoder")

autoencoder.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=LEARNING_RATE),
    loss="mse"
)

autoencoder.summary()
print("\n")

# ── Train the autoencoder ────────────────────────────────────────────────────

print("7) Training autoencoder…")
history = autoencoder.fit(
    X_train, X_train,
    epochs=EPOCHS,
    batch_size=BATCH_SIZE,
    shuffle=True,
    validation_data=(X_val, X_val),
    verbose=2,
)

# After training, check that the loss curve never became NaN/Inf
if np.isnan(history.history["loss"][-1]):
    raise RuntimeError("❌ Training loss ended in NaN—something went wrong.")
print("   → Final training loss: ", history.history["loss"][-1])
print("   → Final validation loss:", history.history["val_loss"][-1], "\n")

# ── Verify the AE on a few “normal” validation samples ────────────────────────

print("8) Verifying autoencoder outputs on a few validation samples…")
x_test = X_val[:10]  # take first 10 normalized samples
x_pred = autoencoder.predict(x_test, verbose=False)

if np.isnan(x_pred).any() or np.isinf(x_pred).any():
    raise RuntimeError("❌ AE produced NaN or Inf on valid inputs—check the model.")

recon_errors = np.mean((x_pred - x_test) ** 2, axis=1)  # shape (10,)
print("   → recon_errors for 10 samples:", recon_errors)
print("   → mean reconstruction error:", np.mean(recon_errors), "\n")

# ── Save the trained autoencoder ──────────────────────────────────────────────

print(f"9) Saving autoencoder to: {AE_MODEL_PATH}")
autoencoder.save(AE_MODEL_PATH, include_optimizer=False)
print("   ✅ Model saved.\n")

print("All done. Your AE is now retrained and guaranteed not to output NaNs for normal data.")
