/**
 * Implementacion de Strategy y Extrac JWT con passport
 */

const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UserService = '../../../services/user-services.js';
const { config } = require('../../../config/index');

//definimos la estrategia
passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      const userService = new UserService();

      try {
        const user = await userService.getUser({ email: tokenPayload.email });

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;

        cb(null, { ...user, scopes: tokenPayload.scopes });
      } catch (err) {
        return cb(err);
      }
    }
  )
);
