var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1:27017/TestBook";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise; // 让 mongoose 使用全局 Promise 库
const db = mongoose.connection; // 取得默认连接
db.on("error", console.error.bind(console, "MongoDB 连接错误："));
db.on("open", function () {
  console.log("数据库连接成功");
});
db.once("open", function () {
  console.log("一次打开记录");
});
db.on("disconnected", function () {
  console.log("数据库连接断开");
});

const book = require("./routes/book");
app.use("/api", book);

const user = require("./routes/user");
app.use("/api", user);

app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});

app.listen(3000);
module.exports = app;
