/**
 * Aqui vamos a automatizar el envio de mensajes en el archivo de rutas
 */

function buildMessage(entity, action) {
  if (action === "list") {
    return `${entity}s ${action}ed`;
  }
  return `${entity} ${action}d`;
}

module.exports = buildMessage;
