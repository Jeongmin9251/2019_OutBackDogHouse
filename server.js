const express = require('express');
const session = require('express-session');
const path = require('path');
//const jsdom = require('jsdom');
const puppeteer = require('puppeteer');
//$ = require('jquery')(new jsdom.JSDOM().window);
const app = express();
var router = express.Router();
var exec = require('child_process').exec;
//var mysqlDB = require('./mysql-db');

//const serve = require('express-static');

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', function(req, res) {
    console.log(req.user);
    res.sendFile(__dirname + '/public/html/loading.html');
});

app.get('/bye', function(req, res){
    res.send('login failed');
})

app.get('/main', function(req, res){
    res.sendFile(__dirname + '/public/html/sample.txt');
});

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/public/html/login.html');
})

app.get('/join', function(req, res){
    res.sendFile(__dirname + '/public/html/join.html');
})

app.get('/pro', function(req, res){
    res.sendFile(__dirname + '/public/html/pro.html');
})

app.get('/set', function(req, res){
    res.sendFile(__dirname + '/public/html/set.html');
})

app.get('/home', function(req, res){
    res.sendFile(__dirname + '/public/html/home.html');
})

app.get('/sendTemp', function(req, res){
    res.sendFile(__dirname + '/public/html/flag.html');
})

app.get('/phpcode', function(req, res){
    exec("php flag.php", function (error, stdout, stderr){
        res.send(stdout);
    });
});

app.get('/login/home', function(req, res){ // 로그인 버튼 누르면
    //모든 칸에 정보를 다 입력했는지 확인
    response = {
        id:req.query._id,
        password:req.query.password
    };
    console.log(response);
    if(response.id == '' || response.password == ''){
        res.send('<script type="text/javascript">alert("모든 정보를 입력해주세요."); document.location.href="/login"</script>');
    }
    else{
        res.send('<script type="text/javascript"> document.location.href="/home"</script>'); // 다 입력하면 홈
    }

    // DB와 비교하여 회원 데이터가 일치하는지 확인
})

app.get('/join/home', function(req, res){ // 회원가입 버튼 누르면
    //모든 칸에 정보를 다 입력했는지 확인
    response = {
        newid:req.query.newid,
        pw:req.query.pw,
        name:req.query.name,
        dogname:req.query.dogname,
        birthday:req.query.birthday,
        gender:req.query.gender
    };
    console.log(response);
    if(response.newid == '' || response.pw == '' || response.name == '' || response.dogname == '' || response.birthday == '' || response.gender == ''){
        res.send('<script type="text/javascript">alert("모든 정보를 입력해주세요."); document.location.href="/join"</script>');
    }
    else{
        res.send('<script type="text/javascript"> alert("회원가입이 성공적으로 완료되었습니다. 로그인해주세요."); document.location.href="/login"</script>'); // 다 입력하면 로그인창
    }
    //DB에 회원 데이터 저장

    res.sendFile(__dirname + '/public/html/home.html');
})

app.listen(3000, () => {
    console.log('start');
});

