import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
//import { previous, next, today } from "../utils/date-time";
// import useQuery from "../utils/useQuery";
// import { Link, useRouteMatch } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  console.log(reservations);

  const reservationList = reservations.map((res) => {
    console.log(res);
    return (
      <div
        key={res.reservation_id}
        className="card text-white bg-dark mb-3"
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-header">{`Reservation ID: ${res.reservation_id}`}</div>
        <div className="card-body">
          <h5 className="card-title">{`${res.first_name} ${res.last_name}`}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    );
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservationList}
    </main>
  );
}

export default Dashboard;
