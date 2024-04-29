# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Build the app
RUN npm run build

# Install serve to serve your app on port 3000
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV PORT 3000

# Run serve when the container launches
CMD ["serve", "-s", "build", "-l", "3000"]
