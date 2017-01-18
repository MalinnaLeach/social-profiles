var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

router.get('/', function(req, res, next) {
  res.render('homepage');
});

router.get('/data', function(req, res, next) {
  url = req.query.candidate_url;
    request(url, function(error, response, html) {
      if(!error) {
        var $ = cheerio.load(html);
        var twitter, github
        var links = $('body').find('a');
        for (var i = 1; i < links.length; i++){
          link = links[i]["attribs"]["href"]
          if (/^http(s|):\/\/(github.com|git.io)\//.test(link)) {
            github = link
          } else if (/^http(s|):\/\/twitter.com\//.test(link)) {
            twitter = link
          }
        }
        res.render('../views/data.ejs', {
          github: github,
          twitter: twitter
        });
      };
    });
});

module.exports = router;
