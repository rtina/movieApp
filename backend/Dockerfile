FROM node:20-alpine

# 1. Install libraries needed by Prisma's engine
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# 2. Copy dependency files first (best for caching)
COPY package*.json ./
COPY prisma ./prisma/ 

# 3. Install new dependencies (like @google/generative-ai)
RUN npm install

# 4. CRITICAL: Generate the Prisma client for this specific OS
RUN npx prisma generate

# 5. Copy the rest of your source code
COPY . .

EXPOSE 3000

CMD ["npx", "tsx", "src/index.ts"]