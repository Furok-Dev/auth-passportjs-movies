/**
 * Rutas de prueba de la aplicacion
 */

const assert = require("assert");
const { request } = require("http");
const proxyquire = require("proxyquire");
const {
  moviesMock,
  MoviesServiceMock,
} = require("../utils/mocks/movies-mocks");
const testServer = require("../utils/testServer");

describe("routes - movies ", function () {
  const route = proxyquire("../routes/movies-routes", {
    "../services/movies-services": MoviesServiceMock,
  });

  const request = testServer(route);

  describe("GET /movies", function () {
    //Los it son las pruebas de rutas que realizamos con supertest
    it("should respond with status 200", function (done) {
      request.get("/api/movies").expect(200, done);
    });

    it("should respond with the list of movies", function (done) {
      request.get("/api/movies").end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          message: "movies listed",
        });
        done();
      });
    });
  });
});
