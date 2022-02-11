import React from "react";
import { Link } from "react-router-dom";

function ReservationDetail({ reservations, tables }) {
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
    return (
      <div
        key={res.reservation_id}
        className="card text-white bg-dark mb-3"
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-header">{`Reservation ID: ${res.reservation_id}`}</div>
        <div className="card-body">
          <h5 className="card-title">
            Guest Name: {`${res.first_name} ${res.last_name}`}
          </h5>
          <p className="card-text">Mobile Number: {`${res.mobile_number}`}</p>
          <p className="card-text">Date: {`${res.reservation_date}`}</p>
          <p className="card-text">
            Time: {`${show12HourTime(res.reservation_time)}`}
          </p>
          <p className="card-text">Party of {`${res.people}`}</p>
        </div>
        <Link
          type="button"
          className="btn btn-info"
          to={`/reservations/${res.reservation_id}/seat`}
        >
          Seat
        </Link>
      </div>
    );
  });

  const tableList = tables.map((table) => {
    let statusMessage = "Open";
    if (table.status === "free") {
      return (
        <div
          class="card text-white bg-success mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div class="card-header">{table.table_name}</div>
          <div class="card-body">
            <h5 class="card-title">Status: {statusMessage}</h5>
            <p class="card-text">Capacity: {table.capacity}</p>
          </div>
        </div>
      );
    } else {
      statusMessage = "Occupied";
      return (
        <div
          class="card text-white bg-secondary mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div class="card-header">{table.table_name}</div>
          <div class="card-body">
            <h5 class="card-title">Status: {statusMessage}</h5>
            <p class="card-text">Capacity: {table.capacity}</p>
          </div>
        </div>
      );
    }
  });

  return (
    <>
      <div>{reservationList}</div>
      <div>{tableList}</div>
    </>
  );
}

export default ReservationDetail;
