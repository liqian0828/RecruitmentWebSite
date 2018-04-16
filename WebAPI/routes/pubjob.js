var express = require('express');
var router = express.Router();
var getData = require('../db/publishJob');
var url = require('url');
var util = require('util');
var getRes;

router.post('/', function (req, res, next) {
    var body = req.body;
    getData.pubJob(ResponseBody, body);
    getRes = res;
});

function ResponseBody(resBody) {
    getRes.send(resBody);
}

module.exports = router;