'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/shortener-controller');

  app.route('/create')
    .put(todoList.createAlias);
  
  app.route('/top-urls')
    .get(todoList.topURLs);

  app.route('/:alias')
    .get(todoList.acessAlias);
};