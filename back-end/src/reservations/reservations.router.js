const router = require("express").Router();
const controller = require("./reservations.controller");

//ADD METHOD NOT ALLOWED

router.route("/").get(controller.list).post(controller.create);
router
  .route("/:reservation_Id")
  .get(controller.read)
  .put(controller.editReservation);
router.route("/:reservation_Id/status").put(controller.updateStatus);

module.exports = router;
