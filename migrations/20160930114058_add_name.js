
exports.up = function(knex, Promise) {
  return knex.schema.table('users', t => {
    t.string('full_name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', t => {
    t.dropColumn('full_name');
  })
};
