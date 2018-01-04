var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'wayn.ccpnt53lucxn.us-east-2.rds.amazonaws.com',
    user     : 'Administrator',
    password : 'bananas18',
    database : 'WAYN_HRNYC12',
    charset  : 'utf8'
  },
  useNullAsDefault: true
});
 
var bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('firstName', 255);
      user.string('lastName', 255);
      user.integer('phoneNumber');
      user.string('image', 255);
      user.decimal('latitude');
      user.decimal('longitude');
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

bookshelf.knex.schema.hasTable('events').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('events', function(event) {
      event.increments('id').primary();
      event.decimal('eventLatitude');
      event.decimal('eventLongitude');
      event.string('eventName', 255);
      event.integer('eventTime');
    })
    .then(function(table) {
      console.log('Created events tables', table)
    })
  }
});
