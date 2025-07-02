import { engine } from "express-handlebars";
import path from 'path';
import { fileURLToPath } from 'url';






const express = require("express");
const productsRouter = require("./src/routes/products.router");


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/productos", productsRouter)


app.listen(PORT,() => {
    console.long("Servidor escuchando en http://localhost:${8080}")
})

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));


const viewsRouter = require("./src/routes/views.routes");
const productsRouter = require("./src/routes/products.router")

app.use("/",viewsRouter);
app.use("/api/products",productsRouter)

module.exports = app;