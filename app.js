const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.static("public"));
//フォームの値を受け取る準備 progateにならってfalse
app.use(express.urlencoded({ extended: false }));

//mysqlの接続情報設定
const connection = mysql.createConnection({
  //データベース名、パスワード等を書く
  host: "localhost",
  user: "root",
  password: "test",
  database: "butaman",
});

// '/' ホームページを返す
app.get("/", (req, res) => {
  res.render("form.ejs");
  //ここにクエリを書く
});

//連なるページ作成時には以下のように記載
app.get("/top", (req, res) => {
  res.render("top.ejs");
});

// ここで送信設定
app.post("/create", (req, res) => {
  console.log(req.body);

  //connection.query();
});

app.listen(3000);
