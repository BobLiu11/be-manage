var express = require("express");
var router = express.Router();
const BookModel = require("../schema/book");
/**
 * router路由不支持 url:/book/:id 模式
 * app.get("/hello/:who?", function(req, res) {
      res.end("Hello, " + req.params.who + ".");
   });
 */
//查找所有书籍信息的接口
router.get("/book", function (req, res, next) {
  BookModel.find({})
    .then((data) => {
      res.json({ code: 200, message: "获取图书成功", data });
    })
    .catch((err) => {
      res.send(err);
    });
});

//根据id查找书籍信息的接口
router.get("/findBook", async (req, res) => {
  BookModel.findOne(req.params.id)
    .then((data) => {
      res.json({ code: 200, message: "查找图书成功", data });
    })
    .catch((err) => {
      res.send(err);
    });
});

//新增书籍信息的接口
router.post("/addBook", async (req, res) => {
  BookModel.create(req.body, (err, book) => {
    if (err) {
      res.json({
        status: "201",
        message: err.message,
      });
    } else {
      res.json({
        book,
        code: "200",
        message: "添加成功",
      });
    }
  });
});

//根据id更新书籍信息的接口
router.put("/updateBook", async (req, res) => {
  BookModel.findOneAndUpdate(
    {
      id: req.body.id,
    },
    {
      $set: req.body,
    },
    {},
    (err, data) => {
      if (err) {
        res.json({
          status: "201",
          message: err.message,
        });
      } else {
        res.json({
          data,
          code: "200",
          message: "更新图书信息成功",
        });
      }
    }
  );
});

//根据id删除书籍信息的接口
router.delete("/deleteBook", (req, res) => {
  BookModel.findOneAndDelete({ id: req.body.id })
    .then((data) => res.json({ code: 200, message: "删除图书成功", data }))
    .catch((err) => res.json(err.message));
});

module.exports = router;
