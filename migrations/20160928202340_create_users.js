
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', t => {
    t.string('username'),
    t.text('password'),
    t.text('about_me'),
    t.text('profile_url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
