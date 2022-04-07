import React from "react";
import { Link } from "react-router-dom";
import { show12HourTime } from "../../utils/date-time";

function ReservationDetail({ reservations, cancelHandler }) {
  const reservationList = reservations.map((res) => {
    let status = "";
    if (res.status === "booked") status = "Booked";
    if (res.status === "seated") status = "Seated";
    if (res.status === "finished") status = "Finished";

    const showSeatButton = () => {
      if (res.status === "booked") {
        return (
          <>
            <div class="container p-2 bd-highlight">
              <Link
                type="button"
                className="btn btn-info"
                to={`/reservations/${res.reservation_id}/seat`}
              >
                Seat
              </Link>
              <Link
                type="button"
                className="btn btn-warning"
                to={`/reservations/${res.reservation_id}/edit`}
              >
                Edit
              </Link>
              <button
                data-reservation-id-cancel={res.reservation_id}
                type="button"
                className="btn btn-danger"
                onClick={(e) => cancelHandler(res)}
              >
                Cancel
              </button>
            </div>
          </>
        );
      } else return null;
    };

    if (res.status === "booked" || res.status === "seated") {
      return (
        <div
          key={res.reservation_id}
          className="card text-white bg-dark mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">{`Reservation ID: ${res.reservation_id}`}</div>
          <div className="card-body">
            <h5 data-reservation-id-status={res.reservation_id}>
              Status: {status}
            </h5>
            <h6 className="card-title">
              Guest Name: {`${res.first_name} ${res.last_name}`}
            </h6>
            <p className="card-text">Mobile Number: {`${res.mobile_number}`}</p>
            <p className="card-text">Date: {`${res.reservation_date}`}</p>
            <p className="card-text">
              Time: {`${show12HourTime(res.reservation_time)}`}
            </p>
            <p className="card-text">Party of {`${res.people}`}</p>
          </div>

          <div class="d-flex flex-row bd-highlight mb-3 justify-content-center">
            {showSeatButton()}
          </div>
        </div>
      );
    } else {
      return null;
    }
  });

  return (
    <>
      <div className="list">{reservationList}</div>
    </>
  );
}

export default ReservationDetail;
