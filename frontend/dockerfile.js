FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the entire local directory into the Docker image's working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Run npm start to start the React app when the container is run
CMD ["npm", "start"]
