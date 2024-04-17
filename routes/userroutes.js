const userController = require("../controller/user.controller");
var express = require("express");
var app = express.Router();
const joimodels = require("../joimodels/schemas");
const middleware = require("../middleware/middleware");

module.exports = (io) => {
  app.get("/nominees", userController.getNominees);
  app.get("/vote", userController.getVote);
  app.post(
    "/vote",
    middleware.requirePostMethodSchemaValidation(
      joimodels.userController.addVote
    ),
    (req, res) => userController.addVote(req, res, io)
  );
  return app;
};
