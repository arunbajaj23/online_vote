const middleware = require("../middleware/middleware");
var express = require("express");
var app = express.Router();
const adminController = require("../controller/admin.controller");

module.exports = (io) => {
  app.get("/stat", adminController.getStat);
  return app;
};
