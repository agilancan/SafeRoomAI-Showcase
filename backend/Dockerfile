######### backend/Dockerfile #########

# ── Stage 1: Build React (frontend‐build) ─────────────────────────────────
FROM node:18-alpine AS frontend-build
WORKDIR /usr/src/frontend

# 1) Copy all of `frontend/` into the container *before* running npm ci
#    This way, npm ci installs into /usr/src/frontend and there is no "node_modules/frontend" clash.
COPY frontend/ ./

# 2) Install dependencies & build
RUN npm ci
RUN npm run build

# ── Stage 2: Build Python backend & include React build ────────────────
FROM python:3.9-slim AS backend-runtime
WORKDIR /app

# 3) OS‐level dependencies (FFmpeg, OpenCV libs, etc.)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      ffmpeg \
      libgl1 \
      libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# 4) Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5) Copy backend source
COPY backend/app    ./app
COPY backend/data   ./data
COPY backend/models ./models
COPY backend/scripts ./scripts

# 6) Copy React's build output from stage “frontend-build” into /app/app/static
COPY --from=frontend-build /usr/src/frontend/build ./app/static

# 7) Expose port & run
EXPOSE 8000
ENTRYPOINT ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
