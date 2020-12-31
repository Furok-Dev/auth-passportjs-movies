/* eslint-disable no-undef */
/**
 * ruta para las autenticaciones
 */

const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
//para el sign-up
const UserServices = require('../services/user-services');
const validationHandler = require('../utils/middlewares/validationHandler');
//implementamos el servicio de las KEYS
const ApiKeyService = require('../services/apiKeys-services');
const { config } = require('../config/index');

//schema for create a new user
const { createUserSchema } = require('../utils/schemas/user-schema');

// Basic Strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeyService();
  const userService = new UserServices();

  router.post('/sign-in', async function (req, res, next) {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apikeyToken is required'));
    }

    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }

        //implementamos el login
        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          const apikey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if (!apikey) {
            next(boom.unauthorized());
          }

          const { _id: id, name, email } = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '10',
          });

          return res.status(200).json({
            token,
            user: { id, name, email },
          });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/sign-up', validationHandler(createUserSchema), async function (
    req,
    res,
    next
  ) {
    const { body: user } = req;
    try {
      const createdUserId = await userService.createUser({ user });

      res.status(201).json({
        data: createdUserId,
        message: `User created successfully with id ${this.createdUserId}`,
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = authApi;
