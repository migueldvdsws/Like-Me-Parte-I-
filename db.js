import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  allowExitOnIdle: true,
});

// Obtener todos los posts
export const getPosts = async () => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id DESC");
  return result.rows;
};

// Agregar nuevo post
export const addPost = async ({ titulo, img, descripcion }) => {
  const consulta = `
    INSERT INTO posts (titulo, img, descripcion, likes)
    VALUES ($1, $2, $3, 0)
    RETURNING *;
  `;
  const values = [titulo, img, descripcion];
  const result = await pool.query(consulta, values);
  return result.rows[0];
};
