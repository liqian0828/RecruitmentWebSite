var express = require('express');
var router = express.Router();
var getData = require('../db/getJobList');
var url = require('url');
var util = require('util');
var getRes;

/* GET users listing. */
router.get('/', function (req, res, next) {
    
    getData.getJobData(ResponseBody);
    getRes = res;
});

router.get('/ID', function (req, res, next) {
    var params = url.parse(req.url, true).query;
    getData.getJobDataByID(ResponseBody, params.ID);
    getRes = res;
});

router.get('/Name', function (req, res, next) {
    var params = url.parse(req.url, true).query;
    getData.getJobDataByName(ResponseBody, params.Name);
    getRes = res;
});

router.get('/myHuntingJob', function (req, res, next) {
    var params = url.parse(req.url, true).query;
    getData.getmyhuntingJob(ResponseBody, params.Name);
    getRes = res;
});

router.get('/myPubJob', function (req, res, next) {
    var params = url.parse(req.url, true).query;
    getData.getmyPubJob(ResponseBody, params.Name);
    getRes = res;
});

router.get('/huntingID', function (req, res, next) {
    var params = url.parse(req.url, true).query;
    getData.getmyhuntingName(ResponseBody, params.ID);
    getRes = res;
});

function ResponseBody(resBody){
    getRes.send(resBody);
}

module.exports = router;