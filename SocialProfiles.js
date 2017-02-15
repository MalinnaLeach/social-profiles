var cheerio = require('cheerio');
var exports = module.exports = {};

exports.listLinks =  function(html) {
  var $ = cheerio.load(html);
  return $('body').find('a');
}

exports.checkLinks = function(links, json={}) {
  for (var i = 0; i < links.length; i++){
    link = links[i]["attribs"]["href"]
    if (/^http(s|):\/\/(github.com|git.io)\//.test(link)) {
      json.github = link
    } else if (/^http(s|):\/\/twitter.com\//.test(link)) {
      json.twitter = link
    }
  }
  return json;
}

exports.findLinks =  function(html) {
  return exports.checkLinks(exports.listLinks(html));
}

exports.findAllLinks = function(url, callback, results={}, visited=[], depth=0) {
  request(url, function(error, response, html) {
    if(!error) {
      if (!visited.includes(url)) {
        visited.push(url)
        links = exports.listLinks(html);
        results = checkLinks(links, results);
        for (var i = 0; i < links.length; i++){
          if (depth<3 && links[i].host===window.location.host) {
            depth += 1;
            return exports.findAllLinks(links[i], callback, results, visited, depth);
          }
        }
      } else {return results}
    } else {return results}
  })
}
