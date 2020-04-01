const Product = require("../models/product.model");

module.exports = {
  async addProduct(req, res) {
    try {
      const newProduct = new Product(req.body);
      return res.status(201).json(await newProduct.save());
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  async listProducts(req, res) {
    try {
      const { type } = req.params;
      const { search } = req.query;

      let query = {};
      if (search != null && search != "") {
        query = {
          $text: {
            $search: search
          }
        };
      }

      console.log({ ...query, type });

      const products = await Product.find({ ...query, type });

      return res.json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
};
