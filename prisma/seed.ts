import { PrismaClient } from '@prisma/client';
import productsList from './products.json';

const prisma = new PrismaClient();

async function main() {
  for (let product of productsList.products) {
    await prisma.products.create({
      data: product,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
