import React from "react";
import { Link } from "react-router-dom";

function ReservationDetail({ reservations }) {
  function show12HourTime(time) {
    let newTime = time.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/);
    if (newTime.length > 1) {
      newTime = newTime.slice(1);
      newTime[5] = +newTime[0] < 12 ? "AM" : "PM";
      newTime[0] = +newTime[0] % 12 || 12;
    }
    newTime.splice(3, 1, " ");
    return newTime.join("");
  }

  const reservationList = reservations.map((res) => {
    let status = res.status === "booked" ? "Booked" : "Seated";
    if (res.status === "finished") status = "Finished";
    const showSeatButton = () => {
      if (res.status === "booked") {
        return (
          <>
            <Link
              type="button"
              className="btn btn-info"
              to={`/reservations/${res.reservation_id}/seat`}
            >
              Seat
            </Link>
          </>
        );
      } else return null;
    };
    return (
      <div
        key={res.reservation_id}
        className="card text-white bg-dark mb-3"
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-header">{`Reservation ID: ${res.reservation_id}`}</div>
        <div className="card-body">
          <h5 data-reservation-id-status={res.reservation_id}>
            Status: {status} {res.reservation_id}
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
        {showSeatButton()}
      </div>
    );
  });

  return (
    <>
      <div>{reservationList}</div>
    </>
  );
}

export default ReservationDetail;
