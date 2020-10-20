/**
 * Este sera un servidor que se levantara unicamente para las pruebas
 * que realizaremos
 */

const express = require("express");
const supertest = require("supertest");

function testServer(route) {
  const app = express();
  route(app);
  return supertest(app);
}

module.exports = testServer;
