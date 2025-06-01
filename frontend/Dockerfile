# ── frontend/Dockerfile ─────────────────────────────────────

# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# 1) Copy package.json and package-lock.json, then install deps
COPY package.json package-lock.json* ./
RUN npm ci

# 2) Copy the rest of the source and build
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# 3) Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# 4) Copy build output from the "build" stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# 5) Copy our custom nginx.conf so that React Router (and /predict proxy) work
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 6) Expose port 3000 and run nginx
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
