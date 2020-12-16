/* eslint-disable no-unused-vars */
/**
 * Aqui vamos a ver que es un middleware y como funciona
 * tambien vamos a implementar una dependecia llamada boom
 * que nos ayudara  a gestionar los errores de una forma
 * super facil
 */
const boom = require("@hapi/boom");

const { config } = require("../../config/index");

//middleware que se encargara de recibir errores
function withErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack };
  }

  return err;
}

function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

//En este manejador de error los errores seran de tipo boom
function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  errorHandler,
  wrapErrors,
};
