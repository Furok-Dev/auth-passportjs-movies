/**
 * El corazon de la aplicacion esta
 * aqui en los SERVICIOS es donde estara
 * la LOGICA DE NEGOCIOS de todo nuestro aplicativo
 */

//Vamos a usar la base de datos
const MongoLib = require("../lib/mongo-db");

//Clase que tendra los metodos que utilizara la app
class MoviesService {
  constructor() {
    this.collection = "movies";
    this.mongoDB = new MongoLib();
  }
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  }

  async getSpecificMovie({ movieId }) {
    const specificMovie = await this.mongoDB.getOnly(this.collection, movieId);
    return specificMovie || {};
  }

  async createMovie({ movie }) {
    const newMovieId = await this.mongoDB.create(this.collection, movie);
    return newMovieId;
  }

  async updateMovie({ movieId, movie } = {}) {
    const updateMovieId = await this.mongoDB.update(
      this.collection,
      movieId,
      movie
    );
    return updateMovieId;
  }

  async deleteMovie({ movieId }) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId;
  }
}

//Exportamos la clase para usarla
module.exports = MoviesService;
