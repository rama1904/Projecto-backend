
import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce-futbol", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(" Conectado a MongoDB"))
  .catch(err => console.error(" Error al conectar a MongoDB", err));

// VARIABLES 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);
const PORT = 8080;

// MIDDLEWARES 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); 

// HANDLEBARS 
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views")); 

// ROUTERS 
import productsRouter from "./routes/products.router.js"; 
import cartsRouter from "./routes/cart.router.js";              
import viewsRouter from "./routes/views.routes.js";      

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// SOCKET.IO 
let products = [];

io.on("connection", (socket) => {
  console.log(" Cliente conectado");

  socket.emit("productosActualizados", products);

  socket.on("nuevoProducto", (producto) => {
    products.push(producto);
    io.emit("productosActualizados", products);
  });

  socket.on("eliminarProducto", (id) => {
    products = products.filter(p => p.id !== id);
    io.emit("productosActualizados", products);
  });
});

app.locals.io = io;

// INICIAR SERVIDOR
server.listen(PORT, () => {
  console.log(` Servidor escuchando en http://localhost:${PORT}`);
});

export default app;