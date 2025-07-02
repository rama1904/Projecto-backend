const express = require("express");
const router = express.Router();


const products = [
  { id: 1, title: 'Producto A', description: 'Desc A', code: 'PA1', price: 100, status: true, stock: 10, category: 'cat1', thumbnails: [] },
  { id: 2, title: 'Producto B', description: 'Desc B', code: 'PB2', price: 150, status: true, stock: 5, category: 'cat2', thumbnails: [] },
];

let currentId = products.length > 0 ? products[products.length - 1].id : 0;
const generatedId = () => ++currentId;


router.post("/", (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  if (!title || !description || !code || price == null || stock == null || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  const newProduct = {
    id: generatedId(),
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails: thumbnails || [],
  };

  products.push(newProduct);
  res.status(201).json({ message: "Producto agregado correctamente", product: newProduct });
});


router.put("/:pid", (req, res) => {
  const pid = parseInt(req.params.pid);
  const updateData = req.body;

  const index = products.findIndex(p => p.id === pid);
  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  
  delete updateData.id;

  products[index] = { ...products[index], ...updateData };
  res.status(200).json({ message: "Producto actualizado", product: products[index] });
});

module.exports = router;