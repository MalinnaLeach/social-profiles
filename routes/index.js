var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var app = require('../SocialProfiles');

router.get('/', function(req, res, next) {
  res.render('homepage');
});

router.get('/data', function(req, res, next) {
  url = req.query.candidate_url;
    request(url, function(error, response, html) {
      if(!error) {
        res.render('../views/data.ejs', app.findLinks(html));
      };
    });
});

router.get('/fulldata', function(req, res, next) {
  url = req.query.candidate_url;
  findAllLinks(url, function(data){console.log(data)})

  // request(url, function(error, response, html) {
  //   if(!error) {
  //     res.render('../views/fulldata.ejs', findAllLinks(url));
  //   };
  // });
})

module.exports = router;
