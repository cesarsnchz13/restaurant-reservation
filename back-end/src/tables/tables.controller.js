const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const validProperties = ["table_name", "capacity"];

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  return next({ status: 400, message: "Requires request data" });
}

async function hasValidPropertyFields(req, res, next) {
  const { data = {} } = req.body;
  //IF DATA IS MISSING
  if (!data) {
    return next({ status: 400, message: "Requires request data" });
  }
  validProperties.forEach((property) => {
    //IF PROPERTY IS MISSING
    if (!data[property]) {
      return next({
        status: 400,
        message: `Requires the ${property} property.`,
      });
    }
  });
  //IF table_name property is missing
  if (!data.table_name) {
    return next({ status: 400, message: `table_name is missing` });
  }
  // IF table_name is less than 2 characters long
  if (data.table_name.length < 2) {
    return next({
      status: 400,
      message: `table_name must be longer than 1 character`,
    });
  }
  //IF capacity PROPERTY IS NOT A NUMBER
  if (!Number.isInteger(data.capacity)) {
    return next({
      status: 400,
      message: `capacity must be a number`,
    });
  }
  //IF capacity PROPERTY IS 0
  if (data.capacity < 1) {
    return next({
      status: 400,
      message: `capacity must be at least 1`,
    });
  }
  next();
}

async function tableExists(req, res, next) {
  const tableId = req.params.table_id;
  console.log("TABLE ID!!!", req.body.data, tableId);
  const table = await service.read(tableId);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `Table ${tableId} not found` });
}

async function reservationExists(req, res, next) {
  console.log("REQ BODY!!!!!!!!!!!!!", req.body.data);
  const resId = req.body.data.reservation_id;
  if (!req.body.data.reservation_id) {
    next({ status: 400, message: `Requires reservation_id` });
  }
  const reservation = await reservationService.read(resId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `Reservation ${resId} not found` });
}

async function hasValidTable(req, res, next) {
  const table = await service.read(req.params.table_id);
  const people = res.locals.reservation.people;
  const capacity = table.capacity;
  const status = table.status;
  if (people > capacity) {
    next({ status: 400, message: "Party size exceeds table capacity" });
  }
  if (status === "occupied") {
    next({ status: 400, message: "This table is occupied" });
  }
  next();
}

async function tableIsOccupied(req, res, next) {
  const table = res.locals.table;
  if (table.reservation_id) {
    next();
  } else {
    next({ status: 400, message: "This table is not occupied" });
  }
}

//CRUD OPERATIONS

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data: data });
}

async function read(req, res, next) {
  const table_id = req.params.table_id;
  const data = await service.read(table_id);
  res.status(201).json({ data });
}

async function create(req, res) {
  const newTable = req.body.data;
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

async function finishTable(req, res) {
  const updatedTable = {
    ...res.locals.table,
    reservation_id: null,
    status: "free",
  };
  const data = await service.update(updatedTable);
  res.status(200).json({ data: data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(hasValidPropertyFields),
    asyncErrorBoundary(create),
  ],
  update: [
    hasData,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(hasValidTable),
    asyncErrorBoundary(update),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  delete: [
    asyncErrorBoundary(tableExists),
    tableIsOccupied,
    asyncErrorBoundary(finishTable),
  ],
};
