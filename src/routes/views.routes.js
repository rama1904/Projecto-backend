import express from "express"

const router = express.Router();

let productos = [];

router.get("/", (req,res) => {
    res.render("home",{ productos});
});

router.get("/raltimeproducts" , (req,res) =>{
    res.render("realTimeProducts");
});

export default router;
