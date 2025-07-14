// prisma-generate.js
import { generate } from "@prisma/client/generator-build";
async function main() {
  await generate();
  console.log("Prisma Client generated successfully");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
