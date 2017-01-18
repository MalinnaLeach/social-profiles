
process.env.NODE_ENV = 'test';
var app = require('../../app');
var Browser = require('zombie');
var http = require("http");

describe('data route', function() {

  before(function() {
    this.server = http.createServer(app).listen(4000);
    this.browser = new Browser({ site: 'http://localhost:4000' });
  });

  before(function(done) {
    this.browser.visit('/data', done);
  });

  it('should not throw an error', function() {
     assert.ok(this.browser.success);
  });

  after(function(done) {
    this.server.close(done);
  });

});
