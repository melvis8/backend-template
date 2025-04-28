# 1. Start from lightweight Alpine
FROM alpine:3.19

# 2. Install needed tools (curl, unzip, etc.)
RUN apk add --no-cache curl unzip bash

# 3. Install Bun manually
RUN curl -fsSL https://bun.sh/install | bash

# 4. Set environment for Bun
ENV PATH="/root/.bun/bin:$PATH"

# 5. Set working directory
WORKDIR /app

# 6. Copy important files first
COPY package.json bun.lock ./

# 7. Install only production dependencies
RUN bun install --production

# 8. Copy rest of the project
COPY . .

# 9. Generate Prisma Client
RUN bunx prisma generate

# 10. Expose the port
EXPOSE 3000

# 11. Run the app
CMD ["bun", "start"]
