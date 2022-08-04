
const express = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeCountry = require("./countries");
const routeActivity = require("./activities");




const router = express.Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", routeCountry);
router.use("/activities",routeActivity)


module.exports = router;
