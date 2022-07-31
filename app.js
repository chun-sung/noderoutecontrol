"use strict"
var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts')
const { sequelize } = require('./models');  // require('./models/index.js')와 같음 - index.js는 require 시 이름 생략 가능 


// 라우트 0  /routes 폴더 안에 home 폴더 & views 폴더 안에 home 폴더 생성 및 파일 이동
var home = require('./routes/home');               // 라우트 1
var article = require('./routes/article');         // 라우트 1
var api = require('./routes/api')


sequelize.sync({force: false})              // 서버 실행 시 MySQL과 연동되도록 함, force: true면 서버 실행 시 마다 테이블을 재생성, 테이블을 잘못 만든 경우에 true로 설정
  .then((r) => {
    console.log('데이터베이스 연결 성공');
    console.log(r)
  })
  .catch((err) => {
    console.error(err);
  });
 
    
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.set('layout extractScripts', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use('/', home);                      
app.use('/login', home);
app.use('/articles', article);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
