/**
 * Scrip que añade usuarios a la base de datos
 * Ejecutar con: DEBUG = app:* node scripts/seedUsers.js
 */

const bcrypt = require('bcrypt');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const MongoLib = require('../lib/mongo-db');
const { config } = require('../config/index');

const users = [
  {
    email: 'root@udefined.sh',
    name: 'ROOT',
    password: config.defaultAdminPassword,
    isAdmin: true,
  },
  {
    email: 'jose@udefined.sh',
    name: 'Jose Maria',
    password: config.defaultUserPassword,
  },
  {
    email: 'maria@udefined.sh',
    name: 'Maria Jose',
    password: config.defaultUserPassword,
  },
];

async function createUser(mongoDB, user) {
  const { name, email, password, isAdmin } = user;

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin),
  });

  return userId;
}

async function seedUsers() {
  try {
    const mongoDB = new MongoLib();

    const promises = users.map(async (user) => {
      const userId = await createUser(mongoDB, user);
      debug(chalk.green(`User created with id: ${userId}`));
    });
    await Promise.all(promises);
    return process.exit(0);
  } catch (err) {
    debug(chalk.red(err));
    process.exit(1);
  }
}

// Ejecutamos el script
seedUsers();
