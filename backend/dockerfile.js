# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install npm dependencies
RUN npm install --production

# Copy the entire local directory to the working directory inside the container
COPY . .

# Expose the port your app runs on (typically 3000 for Node.js applications)
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]
