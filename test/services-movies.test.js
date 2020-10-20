/**
 * Aqui vamos a hacer el test para los servicios
 */
const assert = require("assert");
const express = require("express");
const proxyquire = require("proxyquire");
const { toUnicode } = require("punycode");
const { getAllStub, MongoLibMock } = require("../utils/mocks/mongoLib-mocks");
const { moviesMock } = require("../utils/mocks/movies-mocks");

describe("services - movies", function () {
  const MoviesServices = proxyquire("../services/movies-services", {
    "../lib/mongo-db": MongoLibMock,
  });

  const moviesService = new MoviesServices();
  describe("when getMovies method is called", async function () {
    it("should call the getall MongoLib method", async function () {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it("should return an array of movies", async function () {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepStrictEqual(result, expected);
    });
  });
});
