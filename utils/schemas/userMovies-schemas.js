// usamos la libreria joi de @hapi/joi para menejar los esquemas o formatos
const joi = require('@hapi/joi');

// esquemas necesarios que ya teniamos los ID
const { movieIdSchema } = require('./movies-schemas');
const { userIdSchema } = require('./user-schema');
//esquemas para este servicio
const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserMovieSchema = {
  userId: userIdSchema,
  movieId: movieIdSchema,
};

module.exports = { userMovieIdSchema, createUserMovieSchema };
