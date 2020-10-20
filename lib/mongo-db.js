/**
 * Este sera el archivo donde realizaremos la conexion a mongoAtlas
 *
 */

const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config/index");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:/${DB_NAME}?retryWrites=true&w=majority`;

//Ahora construimos la libreria de mongo

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      userNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  connect() {
    //Usamos el patron singleton, si ya existe una conexion usamos esa
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          console.log("Connected succesfuly");
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  //Vamos a implementar las acciones en la base de datos de MongoDB

  getAll(collection, query) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).find(query).toArray();
      })
      .catch((err) => {
        console.log(new Error(`Algo salgio mal en getAll ${err}`));
      });
  }

  getOnly(collection, id) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .findOne({ _id: ObjectId(id) })
          .toArray();
      })
      .catch((err) => {
        console.log(new Error(`Algo salgio mal en getOnly ${err}`));
      });
  }

  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => {
        result.insertedId;
      });
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => {
        result.upsertedId || id;
      });
  }

  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => {
        id;
      });
  }
}

module.exports = MongoLib;
