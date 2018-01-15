var db = require('../index.js');

var Event = db.Model.extend({
    tableName: 'events'
  });

module.exports = Event;