const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get("/", (req, res) => {
  res.render("index", { codigo: null, resultado: null, producto: null });
});

// Ruta para verificar el código de barras
app.post("/buscar", (req, res) => {
  const codigo = req.body.codigo || "";
  const resultado = codigo.startsWith("750"); // Validación para productos hechos en México (solo como ejemplo)
  res.render("index", { codigo, resultado, producto: null });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});
