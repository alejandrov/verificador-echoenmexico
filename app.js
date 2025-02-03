const express = require("express");
const app = express();
const PORT = process.env.PORT

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Base de datos de productos de ejemplo
const productos = {
  "coca-cola": false,
  tequila: true,
  "chocolate abuelita": true,
  iphone: false,
  "volkswagen vocho": true,
};

// Ruta principal
app.get("/", (req, res) => {
  res.render("index", { codigo: null, resultado: null });
});
// Ruta para buscar el producto
app.post("/buscar", (req, res) => {
  const codigo = req.body.codigo || null;
  const resultado = codigo
    ? productos[codigo] !== undefined
      ? productos[codigo]
      : null
    : null;
  res.render("index", { codigo, resultado });
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo.`);
});
