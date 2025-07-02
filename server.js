const { log } = require("console");
const app = require("./app");
const http = require ("http");
const { Server } = require("socker.io");

const Server = http.createServer(app);
const io = new Server(Server);

let products = [];

io.on("connection" , (socket) => {
    console.log("Cliente conectado");

    socket.emit("productosActualizados", products);

    socket.on("nuevoProducto", (producto) =>{
        products.push(producto);
        io.emit("productosActualizados", products);
    })
});

socket.on("eliminarProducto", (producto) =>{
    products = products.filter(p => p.id !== id );
    io.emit("productosActualizados", products);
});

app.locals,io = io;

Server.listen(8080,()=> {
    console.log("Servidor corriendo en puerto 8080")
})