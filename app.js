const express = require("express");
const productsRouter = require("./src/routes/products.router");

const app = espress();
const PORT = 8080;

app.use(express.json());


app.use("/api/productos", productsRouter)


app.listen(PORT,() => {
    console.long("Servidor escuchando en http://localhost:${8080}")
})