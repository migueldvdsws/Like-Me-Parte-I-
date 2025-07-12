import express from "express";
import cors from "cors";
import { getPosts, addPost } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Obtener todos los posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error al obtener posts:", error.message);
    res.status(500).send("Error interno al obtener posts");
  }
});

// Agregar nuevo post
app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;

    if (!titulo || !url || !descripcion) {
      return res.status(400).send("Faltan datos requeridos");
    }

    // Mapear url -> img para base de datos
    const nuevoPost = await addPost({ titulo, img: url, descripcion });
    res.status(201).json(nuevoPost);
  } catch (error) {
    console.error("Error al crear post:", error.message);
    res.status(500).send("Error interno al crear post");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
