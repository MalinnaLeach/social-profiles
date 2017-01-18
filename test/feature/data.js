
process.env.NODE_ENV = 'test';
var app = require('../../app');
var Browser = require('zombie');
var http = require("http");
var assert = require('assert');

describe('standard data route', function() {

  before(function() {
    this.server = http.createServer(app).listen(4000);
    this.browser = new Browser({ site: 'http://localhost:4000' });
  });

  before(function(done) {
    this.browser.visit('/data?candidate_url=http://aakashjapi.com', done);
  });

  it('should not throw an error', function() {
     assert.ok(this.browser.success);
  });

  it('should return Github address', function() {
    assert.equal(this.browser.text('.git'), 'http://github.com/logicx24');
  });

  it('should return Twitter address', function() {
    assert.equal(this.browser.text('.twit'), 'https://twitter.com/logicx24');
  });

  after(function(done) {
    this.server.close(done);
  });

});

describe ('edge case - https', function() {

  before(function() {
    this.server = http.createServer(app).listen(4000);
    this.browser = new Browser({ site: 'http://localhost:4000' });
  });

  before(function(done) {
    this.browser.visit('/data?candidate_url=http://excode.me', done);
  });

  it('should cope with an https github address', function() {
    assert.equal(this.browser.text('.git'), 'https://github.com/ExC0d3');
  });

  after(function(done) {
    this.server.close(done);
  });

});

describe ('edge case - git.io', function() {

  before(function() {
    this.server = http.createServer(app).listen(4000);
    this.browser = new Browser({ site: 'http://localhost:4000' });
  });

  before(function(done) {
    this.browser.visit('/data?candidate_url=https://chrismatic.io/', done);
  });

  it('should cope with a git.io github address', function() {
    assert.equal(this.browser.text('.git'), 'http://git.io/chrismatic');
  });

  after(function(done) {
    this.server.close(done);
  });

});
