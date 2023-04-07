// 获取 Mongoose
const mongoose = require("mongoose");
// 定义一个模式
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
    gender: {
      type: String,
      enum: ["男", "女"],
      default: "男",
    },
    address: String,
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
  },
  { collection: "userCollection" }
);

module.exports = mongoose.model("userModel", userSchema);
