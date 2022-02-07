const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const requiredProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

const dateFormat = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
const timeFormat = /[0-9]{2}:[0-9]{2}/;

async function hasValidPropertyFields(req, res, next) {
  const { data = {} } = req.body;

  //IF DATA IS MISSING
  if (!data) {
    return next({ status: 400, message: "Requires request data" });
  }

  requiredProperties.forEach((property) => {
    //IF PROPERTY IS MISSING
    if (!data[property]) {
      return next({
        status: 400,
        message: `Requires the ${property} property.`,
      });
    }
  });
  //IF people PROPERTY IS NOT A NUMBER
  if (!Number.isInteger(data.people)) {
    return next({
      status: 400,
      message: `people must be a number`,
    });
  }
  //IF reservation_date FORMAT IS INCORRECT
  if (!dateFormat.test(data.reservation_date)) {
    return next({
      status: 400,
      message: `reservation_date is not formatted correctly`,
    });
  }
  //IF reservation_time FORMAT IS INCORRECT
  if (!timeFormat.test(data.reservation_time)) {
    return next({
      status: 400,
      message: `reservation_time is not formatted correctly`,
    });
  }
  next();
}

async function hasValidDay(req, res, next) {
  const { data = {} } = req.body;
  const date = new Date(data.reservation_date);
  const dayOfWeek = date.getDay();
  console.log("day of week is: ", dayOfWeek);

  //IF BOOKING DATE IS ON TUESDAY
  if (dayOfWeek === 1) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesday",
    });
  }

  //IF BOOKING DATE IS IN THE PAST
  if (date < new Date()) {
    return next({
      status: 400,
      message: "Reservations must be booked for today or future dates",
    });
  }
  next();
}

async function list(req, res) {
  const date = req.query.date;
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
  create: [
    asyncErrorBoundary(hasValidPropertyFields),
    asyncErrorBoundary(hasValidDay),
    asyncErrorBoundary(create),
  ],
};
