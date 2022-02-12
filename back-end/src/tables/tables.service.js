const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name", "asc");
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

async function update(updatedTable) {
  return await knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    .then((updatedRecord) => updatedRecord[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).first();
}

module.exports = {
  list,
  create,
  update,
  read,
};
