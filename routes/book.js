var express = require("express");
var router = express.Router();
const BookModel = require("../schema/book");
const mongoose = require("mongoose");
/**
 * router路由不支持 url:/book/:id 模式
 * app.get("/hello/:who?", function(req, res) {
 *    res.end("Hello, " + req.params.who + ".");
 * });
 */
//查找所有书籍信息的接口
router.get("/book", async (req, res, next) => {
  let queryArr = [{}];
  if (req.query.value) {
    queryArr = [
      { bookname: req.query.value },
      { author: req.query.value },
      { publisher: req.query.value },
    ];
  }
  BookModel.find({
    $or: queryArr,
  })
    .then((data) => {
      res.json({ code: 200, message: "获取图书成功", data });
    })
    .catch((err) => {
      res.send(err);
    });
});

//根据id查找书籍信息的接口
// router.get("/findBook", async (req, res) => {
//   BookModel.findOne(req.query.id)
//     .then((data) => {
//       if (data) {
//         console.log(data);
//         res.json({ code: 200, message: "查找图书成功", data });
//       } else {
//         res.json({ code: 300, message: "未查找到图书" });
//       }
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

//新增书籍信息的接口
router.post("/addBook", async (req, res) => {
  BookModel.create(req.body.book, (err, book) => {
    if (err) {
      res.json({
        status: 201,
        message: err.message,
      });
    } else {
      res.json({
        book,
        code: 200,
        message: "添加成功",
      });
    }
  });
});

//根据id更新书籍信息的接口
router.put("/updateBook", (req, res) => {
  let book = JSON.parse(req.query.book);
  BookModel.findOneAndUpdate(
    {
      _id: book._id,
    },
    {
      $set: book,
    }
  )
    .then((data) =>
      res.json({
        data,
        code: 200,
        message: "更新图书信息成功",
      })
    )
    .catch((err) => res.json(err.message));
});

//根据id删除书籍信息的接口
router.delete("/deleteBook", (req, res) => {
  BookModel.findOneAndDelete({ _id: req.body.id })
    .then((data) => res.json({ code: 200, message: "删除图书成功", data }))
    .catch((err) => res.json(err.message));
});

module.exports = router;
