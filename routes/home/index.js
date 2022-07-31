"use strict"
var express = require('express');
var router = express.Router();
const authUtil = require('./auth.js').checkToken;

const ctrl = require('./home.ctrl')

router.get('/', ctrl.output.home);      // output 을 view 또는 show 변경 해도 됨
// router.get('/login', authUtil, ctrl.output.login);  
router.get('/login', ctrl.output.login);  
router.post('/login', ctrl.process.login);  //처리한다는 의미의 process 오브젝트

module.exports = router;
