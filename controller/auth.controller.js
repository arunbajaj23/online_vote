var express = require("express");
const db = require("../models");
const config = require("../config/common.config");
const jwt = require("jsonwebtoken");
module.exports = {
  login: async (req, res) => {
    try {
      const result = await db.users.findOne({
        where: {
          username: req.body.username,
          password: req.body.password,
        },
        raw: true,
      });
      if (result) {
        const token = jwt.sign(result, config.SECRET, {
          expiresIn: config.TOKEN_EXPIRES_IN,
        });
        res.send({
          response: 1,
          data: { token, role: result.role, username: result.username },
          sys_message: "Welcome",
        });
      } else {
        res.send({
          response: 0,
          sys_message: "Invalid Username or Password",
        });
      }
    } catch (e) {
      console.log(e);
      res.send({ response: 0, sys_message: "something went wrong" });
    }
  },
  singup: async (req, res) => {
    try {
      const result = await db.users.create({
        username: req.body.username,
        password: req.body.password,
      });
      console.log(result);
      const token = jwt.sign(result.get({ plain: true }), config.SECRET, {
        expiresIn: config.TOKEN_EXPIRES_IN,
      });
      res.send({
        response: 1,
        data: { token, role: result.role, username: result.username },
        sys_message: "Welcome",
      });
    } catch (e) {
      console.log(e);
      res.send({
        response: 0,
        sys_message: (e.errno = 1062
          ? "Username already taken"
          : "something went wrong"),
      });
    }
  },
};
