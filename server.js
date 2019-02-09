require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
//const socketio = require("socket.io");
var db = require("./models");
const http = require("http");
var app = express();
var PORT = process.env.PORT || 3000;
const server = http.Server(app);
const io = require("socket.io").listen(server);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  console.log("sequelize sync function loaded");
  server.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );

    io.sockets.on("connection", sock => {
      console.log("a user has connected to the server via Socket.io");
      sock.emit("message", "Hi You are connected");

    });
  });
});

// module.exports = app;
