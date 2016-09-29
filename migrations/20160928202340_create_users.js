
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', t => {
    t.increments().primary().index(),
    t.string('username'),
    t.string('email'),
    t.text('password'),
    t.text('about_me'),
    t.text('profile_url'),
    t.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
