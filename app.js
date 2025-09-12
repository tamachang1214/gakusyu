const express = require('express');
const app = express();

app.use(express.static('public'));

// '/' ホームページを返す
app.get('/', (req, res) => {
  res.render('form.ejs');
});

//連なるページ作成時には以下のように記載
app.get('/top',(req,res)=>{
  res.render('top.ejs');
});


app.listen(3000);