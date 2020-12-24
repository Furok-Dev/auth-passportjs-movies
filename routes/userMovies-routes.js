// rutas para las peliculas dle usuario
const express = require('express');

// hacemos uso de los servicios
const userMovieService = require('../services/userMovies-services');

// middleware para validacion de los esquemas
const validationHandler = require('../utils/middlewares/validationHandler');

// esquemas para generar la validacion
const { movieIdSchema } = require('../utils/schemas/movies-schemas');
const { userIdSchema } = require('../utils/schemas/user-schema');
const {
  createUserMovieSchema,
} = require('../utils/schemas/userMovies-schemas');

// para las ruta de las peliculas del usuario
const userMoviesApi = (app) => {
  const router = express.Router();
  app.use('/api/user-movies', router);

  // inicializamos nuestro servicio de las peliculas
  const UserMovieService = new UserMovieService();

  router.get(
    '/',
    validationHandler({ userId: userIdSchema }, 'query'),
    async function (req, res, next) {
      const { userId } = req.query;
      try {
        const userMovies = await userMovieService.getUserMovies({ userId });
        res.status(200).json({
          data: userMovies,
          message: 'User movies listed',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createUserMovieSchema),
    async (req, res, next) => {
      const { body: userMovie } = req;
      try {
        const createdUserMovieId = await userMovieService.addFavoriteUserMovies(
          { userMovie }
        );
        res
          .status(201)
          .json({ data: createdUserMovieId, message: 'Added to favorite' });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userMovieId',
    validationHandler(movieIdSchema),
    async (req, res, next) => {}
  );
};

module.exports = userMoviesApi;
