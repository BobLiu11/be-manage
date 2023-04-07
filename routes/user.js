var express = require("express");
var router = express.Router();
const userModel = require("../schema/user");

//查找用户信息的接口
router.get("/user", async (req, res) => {
  const { name, password } = req.query;
  userModel.findOne({ user_name: name }).then((result) => {
    if (!result) {
      res.json({ code: 200, message: "用户不存在", result });
    } else {
      if (result.password != password) {
        res.json({ code: 200, message: "密码错误", result });
      } else {
        res.json({ code: 200, message: "登录成功", result });
      }
    }
  });
});

module.exports = router;
