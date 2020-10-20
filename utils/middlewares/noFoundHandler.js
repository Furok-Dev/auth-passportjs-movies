/**
 * Este Middleware se encargar de los errores 404
 * haciendo uso de la dependencia de boom que nos descargamos
 */

const boom = require("@hapi/boom");

function notFoundHandler(req, res) {
  const {
    output: { statusCode, payload },
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;
