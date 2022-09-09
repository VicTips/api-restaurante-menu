const { Router } = require("express");
const { Product } = require("../db")
const { Category } = require('../db')
const router = Router();
require("dotenv").config();

router.get("/", async (req, res, next) => {
  try {
    let products = await Product.findAll({
      include: {
        model: Category,
        attributes: ['name']
      }
    });
    res.send(products)
  } catch (error) {
    next(error)
  }
});

router.post("/", async (req, res, next) => {
  const { name, description, price, categoryId } = req.body;
  try {
    await Product.create({
      name,
      description,
      price: parseInt(price),
      categoryId
    }).then(() => {
      res.send({ msg: "New product created!" })
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const { name, description, price, categoryId } = req.body;
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.send({ msg: "ID not found!" })
    } else {
      const response = await product.update({ name: name, description: description, price: parseInt(price), categoryId: categoryId });
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.send({ msg: "ID not found!" })
    } else {
      await Product.destroy({ where: { id: id } });
      res.send({ msg: "Product deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;
