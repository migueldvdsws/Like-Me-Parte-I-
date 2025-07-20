import express from "express";
import cors from "cors";
import { getPosts, addPost, likePost, deletePost } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Obtener todos los posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error al obtener posts:", error.message);
    res.status(500).send("Error interno al obtener posts");
  }
});

// ✅ Agregar nuevo post
app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;

    if (!titulo || !url || !descripcion) {
      return res.status(400).send("Faltan datos requeridos");
    }

    const nuevoPost = await addPost({ titulo, img: url, descripcion });
    res.status(201).json(nuevoPost);
  } catch (error) {
    console.error("Error al crear post:", error.message);
    res.status(500).send("Error interno al crear post");
  }
});

// ✅ NUEVO: Dar like a un post
app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postActualizado = await likePost(id);
    res.json(postActualizado);
  } catch (error) {
    console.error("Error al dar like:", error.message);
    res.status(500).send("Error interno al dar like");
  }
});

// ✅ NUEVO: Eliminar un post
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postEliminado = await deletePost(id);
    res.json(postEliminado);
  } catch (error) {
    console.error("Error al eliminar post:", error.message);
    res.status(500).send("Error interno al eliminar post");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
