const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productRouter = require("./product");
const categoryRouter = require("./category");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);

module.exports = router;
