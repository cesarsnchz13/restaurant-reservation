const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data: data });
}

async function create(req, res) {
  const newTable = req.body.data;
  console.log(newTable);
  const data = await service.create(newTable);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedTable = {
    table_id: req.params.table_id,
    reservation_id: req.body.data.reservation_id,
    status: "occupied",
  };
  const data = await service.update(updatedTable);
  res.json({ data: data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(update)],
};
