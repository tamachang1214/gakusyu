const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.static("public"));

//mysqlの接続情報設定
const connection = mysql.createConnection({
  //データベース名、パスワード等を書く
  host: "localhost",
  user: "root",
  password: "nasubi16",
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

app.listen(3000);
