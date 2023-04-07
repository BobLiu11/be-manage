// 获取 Mongoose
const mongoose = require("mongoose");
// 定义一个模式
const Schema = mongoose.Schema;

// "id": "auth_001",
// "userId": "user_001",
// "identityType": "系统用户",
// "identifier": "test",
// "credential": "123456",

const authSchema = new Schema({
  id: {
    type: String,
  },
  user_id: {
    type: String,
  },
  identity_type: {
    type: String,
  },
  identifier: {
    type: String,
    required: true,
  },
  credential: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("authModel", authSchema);
