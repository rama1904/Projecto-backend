const socket = io();

const lista = document.getElementById("lista-productos");
const form = document.getElementById("formulario");

socket.on("productosActualizados", (productos) => {
  lista.innerHTML = "";
  productos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.title} - $${p.price}`;
    lista.appendChild(li);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const price = parseFloat(document.getElementById("price").value);

  socket.emit("nuevoProducto", { title, price });
  form.reset();
});