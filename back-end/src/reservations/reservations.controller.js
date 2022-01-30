const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// VALIDATIONS TO create
// hasValidProperties,
// hasRequiredProperties,
// hasValidDate,
// hasValidTIme,
// hasValidAmountofPeople,
// Booked?,

async function list(req, res) {
  const date = req.query.dateDisplay;
  console.log("req.query: ", req.query);
  const data = await service.listByDate(date);
  res.json({ data: data });
}

async function create(req, res) {
  const newReservation = req.body.data;
  const data = await service.create(newReservation);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)],
};
