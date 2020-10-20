/**
 * En este archivo vamos  crear las rutas de nuestro CRUD
 * para platzi video
 */

//Nota los middleware van en la MITAD de la ruta y la definicionde la ruta ej: ("ruta","middleware","definicion de la ruta")
const express = require("express");
const MoviesService = require("../services/movies-services");
const validationHandler = require("../utils/middlewares/validationHandler");
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require("../utils/schemas/movies-schemas");
const cacheResponse = require("../utils/cacheResponse");
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require("../utils/time");

function moviesApi(app) {
  const router = express.Router();
  app.use("/api/movies", router);
  const moviesService = new MoviesService();

  router.get("/", async function (req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: "movies listed",
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    "/:movieId",
    validationHandler({ movieId: movieIdSchema }, "params"),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { movieId } = req.params;
      try {
        const movies = await moviesService.getSpecificMovie({ movieId });
        res.status(200).json({
          data: movies,
          message: "movie retrieved",
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post("/", validationHandler(createMovieSchema), async function (
    req,
    res,
    next
  ) {
    const { body: movie } = req;
    try {
      const createMovieID = await moviesService.createMovie({ movie });
      res.status(201).json({
        data: createMovieID,
        message: "movie created",
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    "/:movieId",
    validationHandler({ movieId: movieIdSchema }, "params"),
    validationHandler(updateMovieSchema),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updatedMovieId = await moviesService.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: updatedMovieId,
          message: "movie updated",
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/:movieId",
    validationHandler({ movieId: movieIdSchema }, "params"),
    async function (req, res, next) {
      const { movieId } = req.params;
      try {
        const deletedMovieId = await moviesService.deleteMovie({ movieId });
        res.status(200).json({
          data: deletedMovieId,
          message: "movie deleted",
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = moviesApi;
