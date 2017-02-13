var cheerio = require('cheerio');
var exports = module.exports = {};

exports.listLinks =  function(html) {
  var $ = cheerio.load(html);
  return $('body').find('a');
}

exports.checkLinks = function(links) {
  var twitter, github
  for (var i = 0; i < links.length; i++){
    link = links[i]["attribs"]["href"]
    if (/^http(s|):\/\/(github.com|git.io)\//.test(link)) {
      github = link
    } else if (/^http(s|):\/\/twitter.com\//.test(link)) {
      twitter = link
    }
  }
  return {github: github, twitter: twitter};
}

exports.findLinks =  function(html) {
  return exports.checkLinks(exports.listLinks(html));
}
