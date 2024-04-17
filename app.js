const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

const db = require("./models");
const { exec } = require("child_process");
const config = require("./config/common.config");
const jwt = require("jsonwebtoken");
db.sequelize.sync().then(async () => {
  await new Promise((resolve, reject) => {
    const migrate = exec(
      "npx sequelize-cli db:seed:all",
      { env: process.env },
      (err) => (err ? reject(err) : resolve())
    );

    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });

  var port = process.env.PORT || 3000;

  const server = app.listen(port, function () {
    console.log("Server running at port" + port + "/");
    require("./routes/apiIndex")(app, io);
  });
  const io = require("socket.io")(server);
  io.use(async (socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      jwt.verify(socket.handshake.auth.token, config.SECRET, (err, decoded) => {
        if (err) {
          return next(new Error("Authentication error"));
        }
        socket.decoded = decoded;
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  });
  io.on("connection", (socket) => {
    console.log("A user connected");
  });
});
