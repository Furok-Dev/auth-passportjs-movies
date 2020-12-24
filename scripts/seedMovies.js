/**
 * ? Script for  add data to our database in mongodb
 * * Execute with: DEBUG=app:* node scripts/seedMovies.js
 */

const chalk = require('chalk');
const debug = require('debug')('app:scripts:movies');
const MongoLib = require('../lib/mongo-db');
const { moviesMock } = require('../utils/mocks/movies-mocks');

async function seedMovies() {
  try {
    const mongoDB = new MongoLib();

    const promises = moviesMock.map(async (movie) => {
      await mongoDB.create('movies', movie);
    });

    await Promise.all(promises);
    debug(
      chalk.green(`${promises.length} movies have been created succesfuly`)
    );
    return process.exit(0);
  } catch (err) {
    debug(chalk.red(err));
    process.exit(1);
  }
}

seedMovies();
