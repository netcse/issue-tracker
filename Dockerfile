# Use official Node.js image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./

RUN npm install @tailwindcss/oxide-linux-x64-gnu

RUN npm install

# Copy the rest of the app
COPY . .

# Expose port 3000 for Next.js
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "dev"]
