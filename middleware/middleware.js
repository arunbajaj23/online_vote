const config = require("../config/common.config");
const jwt = require("jsonwebtoken");

const middleware = {
  requireVerifiedUserAuthentication: function (req, res, next) {
    let token = req.headers.authorization;
    if (token) {
      jwt.verify(token, config.SECRET, async function (err, decoded) {
        if (err) {
          console.log(err);
          return res.status(401).json({
            response: 0,
            sys_message: "Failed to authenticate token.",
          });
        } else {
          console.log(decoded);
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(400).json({ response: 0, sys_message: "Bad Request" });
    }
  },
  requireVerifiedAdminAuthentication: function (req, res, next) {
    let token = req.headers.authorization;
    if (token) {
      jwt.verify(token, config.SECRET, async function (err, decoded) {
        if (err) {
          return res.status(401).json({
            response: 0,
            sys_message: "Failed to authenticate token.",
          });
        } else {
          try {
            console.log(decoded);
            req.decoded = decoded;
            if (decoded.role == "ADMIN") {
              next();
            } else {
              return res.status(401).json({
                response: 0,
                sys_message: "Failed to authenticate token.",
              });
            }
          } catch (e) {
            return res.status(401).json({
              response: 0,
              sys_message: "Failed to authenticate token.",
            });
          }
        }
      });
    } else {
      return res.status(400).json({ response: 0, sys_message: "Bad Request" });
    }
  },
  requirePostMethodSchemaValidation: (schema) => {
    return function (req, res, next) {
      console.log(req.body);
      const { error } = schema.validate(req.body);
      const valid = error == null;
      if (valid) {
        next();
      } else {
        const { details } = error;
        console.log(details);
        const message = details.map((i) => i.message).join(",");
        console.log("error", message);
        res.status(200).json({ response: 0, sys_message: message });
      }
    };
  },
};
module.exports = middleware;
