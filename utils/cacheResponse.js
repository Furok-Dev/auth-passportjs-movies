/**
 * Aqui vamos a utilizar las constantes creadas
 * para configurar el cache
 */

const { config } = require("../config/index");
function cacheResponse(res, seconds) {
  if (process.env.NODE_ENV) {
    res.set("Cache-Control", `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;
