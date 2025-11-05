import { pool } from "./index";
import bcrypt from "bcrypt";

async function seed() {
  const password = await bcrypt.hash("password123", 10);

  await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES 
     ('Admin', 'admin@example.com', $1, 'admin'),
     ('User One', 'user1@example.com', $1, 'user'),
     ('User Two', 'user2@example.com', $1, 'user')`,
    [password]
  );

  console.log("✅ Dummy users seeded!");
  await pool.end();
}

seed();