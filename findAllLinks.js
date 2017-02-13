var cheerio = require('cheerio');
var findLinks = require('../findLinks');
var request = require('request');

var findAllLinks = function(url, callback, results={}, visited=[], depth=0) {
  request(url, function(error, response, html) {
    if(!error) {
      var $ = cheerio.load(html);
      var links = $('body').find('a');
      for(var i=0, i < links.length; i++){
        link = links[i]["attribs"]["href"])
  }
}



module.exports = findAllLinks;
