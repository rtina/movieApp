FROM node:20-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install

# Copy source and prisma
COPY . .
RUN npx prisma generate

EXPOSE 3000

# Use tsx to run the TypeScript entry point directly in ESM mode
CMD ["npx", "tsx", "src/index.ts"]