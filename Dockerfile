FROM oven/bun:1.2.10

WORKDIR /app

COPY package.json .
COPY prisma/schema.prisma ./prisma/

RUN bun install
RUN bun run prisma generate

COPY . .

EXPOSE 3000
CMD ["bun", "run", "src/index.ts"]J
