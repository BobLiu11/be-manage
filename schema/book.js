// 获取 Mongoose
const mongoose = require("mongoose");
// 定义一个模式
var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    bookname: String,
    author: String,
    publisher: String,
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "bookCollection" }
);

// 使用模式“编译”模型
module.exports = mongoose.model("BookModel", bookSchema);
