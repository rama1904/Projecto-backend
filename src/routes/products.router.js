router.put("/:pid", (req, res) =>{
    const pid =parseInt(req.params.pid);
    const updateDta = req.body;

    const index = products.findIndex(p => p.id === pid);
    if (index === -1){
        return res.status(404).json({error: "Producto no encotrado"});
}
const express = require("expres");
const router = express.Router();

const products = [
    { id: 1, title: '', description: '', code: 'PA1', price: 100, status: true, stock: 10, category: '', thumbnails: [] },
  { id: 2, title: '', description: '', code: 'PB2', price: 150, status: true, stock: 5, category: '', thumbnails: [] },
];

let currentId = products.length > 0 ?  products[products.length - 1].id : 0;
const generatedId = () => ++currentId;


router.post("/", (req,res) => {
const { title, description, code, price, stock, category, thumbnails } = req.body;

   if (!title || !description || !code || price == null || stock == null || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
}});

const newProduct = {
    id: generatedId(),
    title,
    description,
    code,
    price,
    category,
    thumbnails : thumbnails ||[],
};

products.push(newProduct);
res.status(201).json({message:"Producto agregado correctamente., product: newProduct"});








module.exports = router;})