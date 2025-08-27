import express from "express";
import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";

const router = express.Router();

// Crear carrito
router.post("/", async (req, res) => {
  const newCart = await Cart.create({ products: [] });
  res.status(201).json({ message: "Carrito creado", cart: newCart });
});

// Obtener carrito con populate
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await Cart.findById(cid).populate("products.product");
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
  res.json(cart);
});

// Eliminar producto específico
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await Cart.findById(cid);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

  cart.products = cart.products.filter(p => p.product.toString() !== pid);
  await cart.save();
  res.json({ message: "Producto eliminado", cart });
});

// Reemplazar carrito completo
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
  res.json({ message: "Carrito actualizado", cart });
});

// Actualizar cantidad de un producto
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findById(cid);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

  const prodIndex = cart.products.findIndex(p => p.product.toString() === pid);

  if (prodIndex === -1) {
    cart.products.push({ product: pid, quantity });
  } else {
    cart.products[prodIndex].quantity = quantity;
  }

  await cart.save();
  res.json({ message: "Cantidad actualizada", cart });
});

// Vaciar carrito
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await Cart.findById(cid);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

  cart.products = [];
  await cart.save();
  res.json({ message: "Carrito vaciado", cart });
});

// Agregar producto (sumar cantidad o agregar nuevo)
router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).send({ error: "Carrito no encontrado" });

    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.send({ message: "Producto agregado al carrito", cart });
  } catch (error) {
    res.status(500).send({ error: "Error al agregar producto al carrito" });
  }
});

export default router;
