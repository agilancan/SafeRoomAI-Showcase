# backend\scripts\train_autoencoder.py
import os
import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

# 1. Load raw features
X = np.load("data/normal_features.npy").astype(np.float32)  # (N, feature_dim)

# 2. Compute and save mean/std
mean = X.mean(axis=0)
std  = X.std(axis=0)
std[std < 1e-6] = 1.0
os.makedirs("models", exist_ok=True)
np.savez("models/ae_norm_stats.npz", mean=mean, std=std)

# 3. Normalize for training
X_norm = (X - mean) / std

# 4. Build a simple autoencoder
input_dim = X_norm.shape[1]
inputs = keras.Input(shape=(input_dim,))
encoded = layers.Dense(64, activation="relu")(inputs)
encoded = layers.Dense(32, activation="relu")(encoded)
decoded = layers.Dense(64, activation="relu")(encoded)
outputs = layers.Dense(input_dim, activation="linear")(decoded)
autoencoder = keras.Model(inputs, outputs)
autoencoder.compile(optimizer="adam", loss="mse")

# 5. Train
autoencoder.fit(X_norm, X_norm,
                epochs=50, batch_size=16, shuffle=True)

# 6. Save the trained model
autoencoder.save("models/autoencoder.h5")
print("Autoencoder trained and saved → models/autoencoder.h5")
