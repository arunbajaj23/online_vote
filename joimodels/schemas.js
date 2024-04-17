const Joi = require("joi");

module.exports = {
  authController: {
    login: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  userController: {
    addVote: Joi.object().keys({
      nomineeId: Joi.number().required(),
    }),
  },
};
