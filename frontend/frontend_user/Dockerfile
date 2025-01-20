# Use an official Node runtime as a parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and config.js files
COPY package*.json eslint.config.js vite.config.js ./

# Install any needed packages
ARG no_cache
RUN npm install


# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Make port 5174 available to the world outside this container
EXPOSE 5174

# Run the app using vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5174"]
