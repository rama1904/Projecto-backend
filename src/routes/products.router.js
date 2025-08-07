const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const path = require("path");
const fs = require("fs");

// Ruta para vista con Handlebars
router.get("/view", (req, res) => {
  const dataPath = path.join(__dirname, "../data/products.json");
  const products = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  res.render("productDisplay", { products }); // Asegurate de tener esta vista
});

//  Ruta paginada para la API
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query
      ? {
          $or: [
            { category: { $regex: query, $options: "i" } },
            { title: { $regex: query, $options: "i" } }
          ]
        }
      : {};

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {}
    };

    const result = await Product.paginate(filter, options);

    const buildLink = (p) => {
      if (!p) return null;
      const base = `/api/products`;
      let link = `${base}?page=${p}&limit=${limit}`;
      if (sort) link += `&sort=${sort}`;
      if (query) link += `&query=${query}`;
      return link;
    };

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: buildLink(result.prevPage),
      nextLink: buildLink(result.nextPage)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Error al obtener productos" });
  }
});

module.exports = router;