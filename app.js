// --------------------------------------------------------------------
// req.タブ名.名前 サーバーに渡すの 例:req.body.year
// connection.query() Node.jsとmysqlをつなぐ関数 SQLを書ける
//
// JavaScriptの変数をSQL文に入れる方法 ?,?,?...,[変数1,変数2,変数3...]
// 値を入れたい所を?にする、後ろに配列[]をかく（配列はSQLじゃないので、""の外に書く）
//
// connection.query('SQL',(error,result)=>{};); SQLの結果はresultに入る
//
// console.table(results); ログにテーブル表示
//
// (error) SQLの実行が失敗したときに、エラーメッセージが入る 真ならerrorオブジェクト、偽ならnull
//
//---------------------------------------------------------------------

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
app.get("/index", (req, res) => {
  // ここではDBから取らずにテスト用の配列を用意
  connection.query("SELECT * FROM contacts", (error, results) => {
    res.render("index.ejs", { contacts: results });
  });
});

// ここで送信設定
app.post("/create", (req, res) => {
  console.log(req.body);

  const year = req.body.year;
  let month = req.body.month;
  let day = req.body.day;

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  console.log(month, day);

  req.body.birth = year + "-" + month + "-" + day;
  console.log(req.body.birth);

  connection.query(
    "INSERT INTO contacts(prefecture,municipality,address,birth,name,email,comment) VALUES(?,?,?,?,?,?,?)",
    [
      req.body.prefecture,
      req.body.municipality,
      req.body.address,
      req.body.birth,
      req.body.name,
      req.body.email,
      req.body.comment,
    ],
    (error, results) => {
      connection.query("SELECT * FROM contacts", (error, results) => {
        console.table(results);
        res.redirect("/");
      });
    }
  );
});

//index.ejs---------------------------------------------------------------------
app.post("/delete/:id", (req, res) => {
  console.log(req, params.id);

  res.redirect("/index");
});

app.listen(3000);
