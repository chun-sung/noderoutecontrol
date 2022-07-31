"use strict"
var express = require('express');
var router = express.Router();

const ctrl = require('./api.ctrl')

router.get('/list', ctrl.output.list);       //처리한다는 의미의 process 오브젝트
router.get('/user', ctrl.output.user);       // output 을 view 또는 show 변경 해도 됨
router.get('/data', ctrl.output.data);       // output 을 view 또는 show 변경 해도 됨
router.post('/user', ctrl.process.user);     //처리한다는 의미의 process 오브젝트

module.exports = router;
