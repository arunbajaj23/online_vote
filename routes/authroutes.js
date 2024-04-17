const authController = require("../controller/auth.controller");
const middleware = require("../middleware/middleware");
const joimodels = require("../joimodels/schemas");
var express = require("express");
var app = express.Router();

module.exports = (io) => {
  app.post(
    "/login",
    middleware.requirePostMethodSchemaValidation(
      joimodels.authController.login
    ),
    authController.login
  );
  app.post(
    "/singup",
    middleware.requirePostMethodSchemaValidation(
      joimodels.authController.login
    ),
    authController.singup
  );

  return app;
};
