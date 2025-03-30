# Use official Node.js image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of the app
COPY . .

# Generate client
RUN npx prisma generate

# Expose port 3000 for Next.js
EXPOSE 3000

# Run migrations before starting the app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]