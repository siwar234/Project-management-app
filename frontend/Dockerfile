# Use an official Node.js runtime as a parent image for the build stage
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps


# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server image to serve the built app
FROM nginx:alpine

# Copy the built React app from the build stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port on which nginx will run
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

