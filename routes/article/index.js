"use strict"
var express = require('express');
var router = express.Router();

const ctrl = require('./article.ctrl')

router.get(['/list','/list/:id'], ctrl.output.list)
router.get('/edit', ctrl.output.edit)
router.get('/regist', ctrl.output.regist)
router.post('/regist', ctrl.process.regist)

module.exports = router;