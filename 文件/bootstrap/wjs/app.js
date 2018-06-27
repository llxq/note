var express = require("express");
var app = express();
var path = require("path");

app.engine("html", require('express-art-template'));

app.use("/public", express.static(path.join(__dirname, "./public/")));

app.get("/", function(req, res) {
//   res.send("this is responseText");
res.render("index.html")
});

app.listen("3000", '0.0.0.0', function() {
  console.log("runinig......");
});
