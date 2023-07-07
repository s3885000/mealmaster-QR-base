const hooks = require('hooks');

hooks.beforeEach((transaction, done) => {
  transaction.expected.headers['Content-Type'] = 'application/json; charset=utf-8';
  done();
});
