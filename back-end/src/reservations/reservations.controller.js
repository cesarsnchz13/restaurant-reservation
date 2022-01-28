const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//validate that the date is valid

async function list(req, res) {
  const date = req.query.date;
  const data = await service.listByDate(date);
  res.json({ data: data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
