/**
 * this middleware will protect the routes of the app
 */

const passport = require('passport');
const boom = require('@hapi/boom');
//JWT strategy
require('../auth/strategies/jwt');

const protectRoutes = (req, res, next) => {
  passport.authenticate('jwt', (error, user) => {
    //si ocurre un error o el usuario que me devuelve la strategia no existe
    //llamamos a next pasandole a boom
    if (error || !user) return next(boom.unauthorized());

    //De lo contrario ejecutaremos next para llame al siguiente middlware(que en   	//este caso seria el validation handler y el manejador de ruta)
    req.login(user, { session: false }, (err) => {
      if (err) return next(err);
      next();
    });
  })(req, res, next);
};

module.exports = protectRoutes;
