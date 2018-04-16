var express = require('express');
var router = express.Router();
var getData = require('../db/user');
var url = require('url');
var util = require('util');
var getRes;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'My API' });
});

router.get('/ID', function (req, res, next) {
  var params = url.parse(req.url, true).query;
  getData.getUserData(ResponseBody, params.ID);
  getRes = res;
});

router.post('/reg', function (req, res, next) {
  var body = req.body;
  getData.regData(ResponseBody, body);
  getRes = res;
});

function ResponseBody(resBody) {
  getRes.send(resBody);
}

module.exports = router;
