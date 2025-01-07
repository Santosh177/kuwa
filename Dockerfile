# Stage 1: Build the Next.js app
#FROM node:14.17.2-slim AS build
FROM node:16-slim AS build
# Set environment variables
#ENV NODE_ENV=staging
RUN NODE_OPTIONS="--max-old-space-size=4096"

# Set the working directory inside the container
WORKDIR /app

# Install node-gyp globally (if necessary for certain dependencies)
RUN npm install -g node-gyp

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Remove package-lock.json (optional, only if you don't need i
RUN rm -rf package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .


# Expose the necessary port (default: 3000)
EXPOSE 3000

# Run the Next.js app in production mode
CMD ["npm", "run", "dev"]
