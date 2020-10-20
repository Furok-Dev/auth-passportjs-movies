/**
 * Creando un servidor con express y este sera el index de la aplicacion
 * donde la aplicacion se ejecutara
 */

const express = require("express");
const app = express();
const { config } = require("./config/index");
const moviesApi = require("./routes/movies-routes");

//Middlware para gestionar errores

const {
  errorHandler,
  logErrors,
  wrapErrors,
} = require("./utils/middlewares/errorHandlers");
const notFoundHandler = require("./utils/middlewares/noFoundHandler");

//Usamos el middleware de exprees que nos permite leer datos en formato Json, body-parser
app.use(express.json());

//la aplicacionde expren que gestiona las rutas
moviesApi(app);

//Middleware que gestiona los 404
app.use(notFoundHandler);

//Los middleware de error siempre debe ir al final de las rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);
app.listen(config.port, () =>
  console.log(`Example app listening on port http://localhost:${config.port}`)
);
