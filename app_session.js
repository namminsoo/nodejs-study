//express 사용
var express = require('express');
var app = express();
var multer = require('multer');
//암호화
var md5 = require('md5');
//npm install express-session --save
var sha256 = require('sha256');

var salt='!#$!#';
var pwd1= md5('minsoo'+salt);//설계상 결함이 있음 쓰지마
var pwd2 =sha256('minoo'+salt);

var session = require('express-session');
//기본적으로 메모리에 데이터 저장.
//실제 서비스는 DB에 저장해야 됨.

//미들웨어, POST를 하기 위해
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

/*
세션을 파일, 디비에 저장하는건 안함.
session-file-store
*/


app.use(session({
    secret: '1q2w3e4r',
    resave: false,
    saveUninitialized: true
}))


app.get('/count', (req, res) => {
    if (req.session.count1) {
        req.session.count1++;
    } else {
        req.session.count1 = 1;
    }
    res.send('result : ' + req.session.count1);
})

app.get('/welcome', (req, res) => {

    if (req.session.displayName) {
        res.send(`
                <h1>Hello, ${req.session.displayName}</h1>
                <a href="/auth/logout">logout</a>`)
    } else {
        res.send(`
                <h1>Welcome</h1>
                <a href="/auth/login">Login</a>
      `)
    }
})

app.get('/auth/logout', (req, res) => {

    delete req.session.displayName;
    res.redirect('/welcome');
})



app.post('/auth/login', (req, res) => {
    var user = {
        username: 'namsoo',
        password: '123',
        displayName: 'namminsoo'
    };
    var uname = req.body.username;
    var pwd = req.body.password;
    if (uname == user.username && pwd == user.password) {
        req.session.displayName = user.displayName;
        res.redirect('/welcome');
    } else {
        res.send('Who are you? <a herf="/auth/login>Login</a>"')
    }



})

app.get('/auth/login', (req, res) => {
    var output = `
  <h1>Login</h1>
  <form actuon="/auth/login" method="post">
    <p>
    <input type="text" name="username" placeholder="username">
    </p>
    <p>
    <input type="password" name="password" placeholder="password">
    </p>
    <p>
    <input type="submit">
    </p>
  </form>
  `;

    res.send(output);
})








app.listen(5005, function() {
    console.log('Conneted 5005 port');
});
