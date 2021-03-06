const express = require('express');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql');
var jsdom = require('jsdom');
const fs = require('fs');
$ = require('jquery')(new jsdom.JSDOM().window);
//const jsdom = require('jsdom');
const puppeteer = require('puppeteer');
var bodyParser = require('body-parser');

const app = express();
var router = express.Router();
var exec = require('child_process').exec;
var userid;
//var mysqlDB = require('./mysql-db');

//const serve = require('express-static');

var connection = mysql.createConnection({
    host     : '192.168.137.118',    // 호스트 주소
    user     : 'root',           // mysql user
    password : '1234',       // mysql password
    insecureAuth : true,
    database : 'mysql',         // mysql 데이터베이스
    port: 3306
});

connection.connect();
connection.query('INSERT INTO flagpel(flag_pel) values("0")');

app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser());

$(function(){
    setInterval(function() { // 30초마다 house_State db 클리어
        var query = 'Delete from house_state';
        connection.query(query);
    }, 30000);
});

app.get('/', function(req, res) {
    console.log(req.user);
    res.sendFile(__dirname + '/public/html/loading.html');
});

app.get('/pet/info/9909', function(req, res){
    var Dupli_Query = 'SELECT * FROM info_dog WHERE userid="' + userid +'";';
        var D_query = connection.query(Dupli_Query, function(err, results, id){
            // json으로 펫정보 보내주기...
            res.json(results);
        });
})

app.get('/pet/settings/8596', function(req, res){
    var Dupli_Query = 'SELECT * FROM house_state ORDER BY pk DESC LIMIT 1';
        var D_query = connection.query(Dupli_Query, function(err, results, id){
            // json으로 펫정보 보내주기...
            res.json(results);
        });
})

app.get('/plag_pel/8809', function(req, res){
    var Dupli_Query = 'SELECT * FROM flagpel ORDER BY pk DESC LIMIT 1';
        var D_query = connection.query(Dupli_Query, function(err, results, id){
            console.log(results);
            // json으로 펫정보 보내주기...
            res.json(results);
        });
})

app.get('/sendMusic', function(req, res){
    res.send('<script type="text/javascript">alert("현재 지원하지 않는 기능입니다."); document.location.href="/home"</script>');
})
app.get('/bye', function(req, res){
    res.send('login failed');
})

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/public/html/login.html');
})

app.get('/join', function(req, res){
    res.sendFile(__dirname + '/public/html/join.html');
})

app.get('/pro', function(req, res){ 
    // db에서 로그인한 회원의 데이터 불러오고, html로 전송
    
    res.sendFile(__dirname + '/public/html/pro.html');
})

app.get('/set', function(req, res){
    res.sendFile(__dirname + '/public/html/set.html');
})

app.get('/home', function(req, res){
    res.sendFile(__dirname + '/public/html/home.html');
})

app.get('/login/sendTemp', function(req, res){
    var Dupli_Query = 'SELECT * FROM flagpel ORDER BY pk DESC LIMIT 1';
        var D_query = connection.query(Dupli_Query, function(err, results){
            if(results[0].flag_pel == 1){
                connection.query("INSERT INTO flagpel(flag_pel) VALUES('0')");
            }
            else if(results[0].flag_pel == 0){
                connection.query("INSERT INTO flagpel(flag_pel) VALUES('1')");
            }
        });
        res.send('<script type="text/javascript">alert("난방 정보를 변경하였습니다."); document.location.href="/home"</script>');
})


app.get('/sendTemp', function(req, res){
    var Dupli_Query = 'SELECT * FROM flagpel ORDER BY pk DESC LIMIT 1';
        var D_query = connection.query(Dupli_Query, function(err, results){
            if(results[0].flag_pel == 1){
                connection.query("INSERT INTO flagpel(flag_pel) VALUES('0')");
            }
            else if(results[0].flag_pel == 0){
                connection.query("INSERT INTO flagpel(flag_pel) VALUES('1')");
            }
        });
        res.send('<script type="text/javascript">alert("난방 정보를 변경하였습니다."); document.location.href="/home"</script>');
})

app.post('/login/home', function(req, res){ // 로그인 버튼 누르면
    //모든 칸에 정보를 다 입력했는지 확인
    response = {
        id:req.body._id,
        password:req.body.password
    };
    //console.log(response);
    if(response.id == '' || response.password == ''){ // 입력안했을때
        res.send('<script type="text/javascript">alert("모든 정보를 입력해주세요."); document.location.href="/login"</script>');
    }
    else{ // 다 입력했을때
        // DB와 비교하여 회원 데이터가 일치하는지 확인
        var Dupli_Query = 'SELECT * FROM info_dog;';
        var D_query = connection.query(Dupli_Query, function(err, results, id){
            //console.log(results);
            if(err){throw err;}
            else{
                var idflag = 0;
                for(var i=0; i<results.length; i++){
                    if(results[i].userid == response.id && results[i].pw == response.password){
                        userid = results[i].userid;
                        console.log(userid);
                        console.log(results[i]);
                        idflag = 1;
                    }
                }
                if(idflag == 1){ 
                    res.sendFile(__dirname + '/public/html/home.html');
                    //console.log('login success');
                }
                else{
                    res.send('<script type="text/javascript">alert("ID 또는 비밀번호가 일치하지 않습니다."); document.location.href="/login"</script>');
                }
                //console.log('sung gong des yo ~');
            }
        });
        //res.send('<script type="text/javascript"> document.location.href="/home"</script>'); // 다 입력하면 홈
    }
})

app.post('/join/home', function(req, res){ // 회원가입 버튼 누르면
    //모든 칸에 정보를 다 입력했는지 확인
    response = {
        newid:req.body.newid,
        pw:req.body.pw,
        name:req.body.name,
        dogname:req.body.dogname,
        birthday:req.body.birthday,
        gender:req.body.gender
    };
    console.log(response);
    if(response.newid == '' || response.pw == '' || response.name == '' || response.dogname == '' || response.birthday == '' || response.gender == ''){
        res.send('<script type="text/javascript">alert("모든 정보를 입력해주세요."); document.location.href="/join"</script>');
    }
    else{
        var samequery = 'SELECT * from info_dog where'
        var Query3 = 'INSERT INTO info_dog(dogname, dogbirth, sex, username, pw, userid) VALUES("' + response.dogname + '", "' + response.birthday + '", "' + response.gender + '", "' + response.name + '", "' + response.pw + '", "' + response.newid + '");';
        connection.query(Query3);

        res.send('<script type="text/javascript"> alert("회원가입이 성공적으로 완료되었습니다. 로그인해주세요."); document.location.href="/login"</script>'); // 다 입력하면 로그인창
    }
    //DB에 회원 데이터 저장

    res.sendFile(__dirname + '/public/html/home.html');
});

app.listen(3000, () => {
    console.log('start');
});

