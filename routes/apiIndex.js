const middleware = require("../middleware/middleware");
const adminroutes = require("./adminroutes");
const userroutes = require("./userroutes");
const authroutes = require("./authroutes");
module.exports = (app, io) => {
  app.use(
    "/admin",
    middleware.requireVerifiedAdminAuthentication,
    adminroutes(io)
  );
  app.use(
    "/user",
    middleware.requireVerifiedUserAuthentication,
    userroutes(io)
  );
  app.use("/auth", authroutes(io));
};
