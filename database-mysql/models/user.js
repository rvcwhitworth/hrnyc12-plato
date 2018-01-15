var db = require('../index.js');

var User = db.Model.extend({
    tableName: 'users'
  });

module.exports = User;