# Use an official Node.js runtime as a parent image for the build stage
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Set NPM configuration for a higher timeout (60 seconds) and disable progress to improve speed in slow networks
RUN npm config set timeout 60000 \
    && npm config set progress false

# Install dependencies with legacy peer dependencies flag
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server image to serve the built app
FROM nginx:alpine

# Copy the built React app from the build stage to the Nginx web server directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
