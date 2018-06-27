var express = require("express");
var app = express();
var path = require('path');
app.engine('html', require('express-art-template'));
app.use('/lesss', express.static(path.join(__dirname, './lesss/')))
app.get("/", function(req, res) {
  res.render("1.html");
});

app.listen("3000", function() {
  console.log("runing");
});
