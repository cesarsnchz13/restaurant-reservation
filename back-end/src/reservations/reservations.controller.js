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
  //IF status is only "booked"
  if (data.status === "seated" || data.status === "finished") {
    return next({
      status: 400,
      message: `status cannot be ${data.status}`,
    });
  }
  next();
}

async function hasValidDayAndTime(req, res, next) {
  const { data = {} } = req.body;
  const date = new Date(`${data.reservation_date} ${data.reservation_time}`);
  const dayOfWeek = date.getDay();
  const requestedTime = data.reservation_time;

  //IF BOOKING DATE IS ON TUESDAY
  if (dayOfWeek === 2) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesday",
    });
  }

  //IF BOOKING DATE IS IN THE PAST
  if (date < new Date()) {
    return next({
      status: 400,
      message: "Reservations must be booked for a future time or date",
    });
  }
  //IF BOOKING TIME IS DURING CLOSED HOURS
  if (requestedTime <= "10:30" || requestedTime >= "21:30") {
    return next({
      status: 400,
      message: "Cannot book reservations before 10:30AM or after 9:30PM",
    });
  }
  next();
}

async function validId(req, res, next) {
  const resId = req.params.reservation_Id;
  const data = await service.read(resId);
  res.locals.reservation = data;
  if (!data) {
    next({ status: 404, message: `Reservation ID:${resId} not found` });
  }
  next();
}

function validStatus(req, res, next) {
  const newStatus = req.body.data.status;
  const currentStatus = res.locals.reservation.status;
  if (
    newStatus !== "booked" &&
    newStatus !== "seated" &&
    newStatus !== "finished"
  ) {
    next({ status: 400, message: `Cannot update and unknown status` });
  }
  if (currentStatus === "finished") {
    next({ status: 400, message: "Cannot update a finished reservation" });
  }
  next();
}

async function list(req, res) {
  let date = req.query.date;
  if (!date) date = req.query.dateDisplay;
  const data = await service.listByDate(date);
  res.json({ data: data });
}

async function read(req, res) {
  const reservation_Id = req.params.reservation_Id;
  const data = await service.read(reservation_Id);
  res.json({ data });
}

async function create(req, res) {
  const newReservation = req.body.data;
  const data = await service.create(newReservation);
  res.status(201).json({ data });
}

async function updateStatus(req, res) {
  const newStatus = req.body.data.status;
  const updatedReservation = { ...res.locals.reservation, status: newStatus };
  const data = await service.update(updatedReservation);
  res.status(200).json({ data: data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(hasValidPropertyFields),
    asyncErrorBoundary(hasValidDayAndTime),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(read)],
  updateStatus: [
    asyncErrorBoundary(validId),
    validStatus,
    asyncErrorBoundary(updateStatus),
  ],
};
