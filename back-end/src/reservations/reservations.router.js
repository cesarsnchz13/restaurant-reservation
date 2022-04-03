const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/MethodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);
router
  .route("/:reservation_Id")
  .get(controller.read)
  .put(controller.editReservation)
  .all(methodNotAllowed);
router
  .route("/:reservation_Id/status")
  .put(controller.updateStatus)
  .all(methodNotAllowed);

module.exports = router;
