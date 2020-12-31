/**
 * Implementacion de una estrategia de tipo basic con passportjs
 *
 * esto nos servira para implementar passportjs
 */

const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

//servicio del usuario para buscar al usuario
const UsersService = require('../../../services/user-services');

//implementamos la estrategia
passport.use(
  new BasicStrategy(async function (email, password, cb) {
    const userService = new UsersService();
    try {
      const user = await userService.getUser({ email });

      //si el usuario no existe
      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      //verificar el password
      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      //borramos todo para un nuevo usuario
      delete user.password;

      return cb(null, true);
    } catch (err) {
      return cb(err);
    }
  })
);
