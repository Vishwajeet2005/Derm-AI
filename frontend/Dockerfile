# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Vite port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
