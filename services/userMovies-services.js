const MongoLib = require('../lib/mongo-db');

class UserMovieService {
  constructor() {
    this.collection = 'user-movies';
    this.mongoDB = new MongoLib();
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const userMovies = await this.mongoDB.getAll(this.collection, query);

    return userMovies || [];
  }

  // para agregar a la lista de favoritos
  async addFavoriteUserMovies({ userMovie }) {
    const addedFavoriteId = await this.mongoDB.create(
      this.collection,
      userMovie
    );

    return addedFavoriteId;
  }

  async deleteFavoriteUserMovies({ userMovieId }) {
    const deletedFavoriteId = await this.mongoDB.delete(
      this.collection,
      userMovieId
    );

    return deletedFavoriteId;
  }
}

module.exports = UserMovieService;
