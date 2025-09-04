import express from "express"

const router = express.Router();

let productos = [];

router.get("/", (req,res) => {
    res.render("home",{ productos});
});

router.get("/raltimeproducts" , (req,res) =>{
    res.render("realTimeProducts");
});


router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  res.render("profile");
  });


  router.get(
  "/private",
  passportCall("jwt", { session: false }),
  (req, res) => res.send(req.user)
);
 

export default router;
