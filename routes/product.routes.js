const ProductController = require("../controllers/product.controller");

const router = require("express").Router();

router.post("/add", ProductController.addProduct);

router.get("/:type", ProductController.listProducts);

module.exports = router;
