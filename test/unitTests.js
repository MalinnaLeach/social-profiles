process.env.NODE_ENV = 'test';
var fs = require('fs');
var assert = require('assert');
var cheerio = require('cheerio');
var app = require('../SocialProfiles');

var html1 = fs.readFileSync('./test/fixtures/test1.html').toString();

describe('findLinks', function() {

  it('should return Github address', function() {
    assert.equal(app.findLinks(html1).github, 'http://github.com/logicx24');
  });

  it('should return Twitter address', function() {
    assert.equal(app.findLinks(html1).twitter, 'https://twitter.com/logicx24');
  });

});
