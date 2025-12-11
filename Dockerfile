# ------------ Stage 1: Build the React App ------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Vite project
RUN npm run build

# ------------ Stage 2: Serve with Nginx ------------
FROM nginx:alpine

# Copy built files to Nginx HTML folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (inside container)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
