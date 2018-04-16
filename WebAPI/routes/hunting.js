var express = require('express');
var router = express.Router();
var getData = require('../db/huntingJob');
var url = require('url');
var util = require('util');
var getRes;

router.post('/', function (req, res, next) {
    var body = req.body;
    getData.huntingJob(ResponseBody, body, '1', '2');
    getRes = res;
});

function ResponseBody(resBody) {
    getRes.send(resBody);
}

module.exports = router;