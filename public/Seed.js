import db from "#db/client";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await createUser("John Smith", "Pepperpuppy22");
  await createUser("Rebecca Stylist", "HairQueen22");
  await createUser("SalonAdmin", "AdminKey22");
}
