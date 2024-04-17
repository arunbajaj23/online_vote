var express = require("express");
const db = require("../models");
const config = require("../config/common.config");
const jwt = require("jsonwebtoken");
module.exports = {
  getNominees: async (req, res) => {
    try {
      console.log("getNominees");
      const nominees = await db.nominees.findAll();
      res.json({ response: 1, data: { nominees }, sys_message: "Welcome" });
    } catch (e) {
      console.log(e);
      res.json({ response: 0, sys_message: "something went wrong" });
    }
  },

  getVote: async (req, res) => {
    try {
      const vote = await db.votes.findOne({
        where: {
          userId: req.decoded.id,
        },
      });
      res.json({
        response: 1,
        data: { vote, voteAdded: !!vote },
        sys_message: "Welcome",
      });
    } catch (e) {
      console.log(e);
      res.json({ response: 0, sys_message: "something went wrong" });
    }
  },

  addVote: async (req, res, io) => {
    try {
      let nomineeId = req.body.nomineeId;
      await db.votes.create({
        userId: req.decoded.id,
        nomineeId,
      });

      const voteCount = await db.votes.count({
        where: {
          nomineeId,
        },
      });
      io.emit("voteCountUpdated", { nomineeId, voteCount });

      res.json({
        response: 1,
        data: { voteAdded: true },
        sys_message: "Welcome",
      });
    } catch (e) {
      console.log(e);
      res.json({ response: 0, sys_message: "something went wrong" });
    }
  },
};
