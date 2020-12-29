/**
 * Servicio que a partir de un API KEY TOKEN podamos obtener los scopes
 * a la hora de hacer signin de acuerdo a los tokens que enviemos
 */

const MongoLib = require('../lib/mongo-db');

class ApiKeyService {
  constructor() {
    this.collection = 'api-key';
    this.mongoDB = new MongoLib();
  }

  async getApiKey({ token }) {
    const [apiKey] = await this.mongoDB.getAll(this.collection, { token });

    return apiKey;
  }
}

module.exports = ApiKeyService;
