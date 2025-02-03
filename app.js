const express = require("express");
const axios = require("axios"); // Importar axios para hacer solicitudes HTTP
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
app.post("/buscar", async (req, res) => {
  const codigo = req.body.codigo || "";
  let resultado = codigo.startsWith("750"); // Ejemplo de validación para productos hechos en México

  // Llamada a la API de Open Food Facts para obtener información del producto
  try {
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${codigo}.json`);
    const producto = response.data.product;

    if (producto) {
      console.log("Información del producto:", producto.product_name);
      console.log("Marca:", producto.brands);
      console.log("Descripción:", producto.description);
      console.log("Ingredientes:", producto.ingredients_text);
    } else {
      console.log("Producto no encontrado.");
    }

    // Renderizar la vista con la información del producto
    res.render("index", { codigo, resultado, producto });

  } catch (error) {
    console.error("Error al obtener información del producto:", error);
    res.render("index", { codigo, resultado, producto: null });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});
