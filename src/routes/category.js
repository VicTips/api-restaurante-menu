const { Router } = require("express");
const { Category } = require("../db")
const router = Router();
require("dotenv").config();

router.get("/", async (req, res, next) => {
  try {
    let categories = await Category.findAll();
    res.send(categories)
  } catch (error) {
    next(error)
  }
});

router.post("/", async (req, res, next) => {
  let name = req.body;
  try {
    const response = await Category.create(name)
    res.send(response);
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const name = req.body;
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      res.send({ msg: "ID not found!" })
    } else {
      const response = await category.update(name);
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      res.send({ msg: "ID not found!" })
    } else {
      await Category.destroy({ where: { id: id } });
      res.send({ msg: "Category deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;
