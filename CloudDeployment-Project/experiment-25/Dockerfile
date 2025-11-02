# Multi-stage Dockerfile for CRA app at your code style/level

# 1) Builder stage: install deps and build static files
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (prefer npm ci when lockfile exists)
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# 2) Production stage: serve with Nginx
FROM nginx:alpine AS production

# Replace default config with a SPA-friendly one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled app from builder
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
