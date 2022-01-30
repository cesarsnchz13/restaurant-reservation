import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
//import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
// import { Link, useRouteMatch } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

//NEED TO CHANGE THE CONTROLLER SO THAT LISTS ONLY THE DATES SELECTED
//NEED A PREVIOUS TODAY AND NEXT BUTTON
//MAKE IT SO THAT IT DEFAULTS TO TODAYS RESERVATIONS. SHOW HOW MANY RESERVATIONS ARE LISTED. EX --> THERE ARE NO RESERVATIONS FOR TODAY.

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [dateDisplay, setDateDisplay] = useState(date);
  const query = useQuery();
  const queryDate = query.get("dateDisplay");

  //logs
  console.log("query: ", queryDate);
  console.log("date: ", dateDisplay);

  useEffect(loadDashboard, [dateDisplay]);
  useEffect(() => {
    const abortController = new AbortController();
    if (!queryDate) {
      setDateDisplay(date);
    } else if (queryDate && queryDate !== "") {
      setDateDisplay(queryDate);
    }
    return () => abortController.abort();
  }, [date, queryDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ dateDisplay }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  console.log(reservations);

  const reservationList = reservations.map((res) => {
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
        <h4 className="mb-0">Reservations for {dateDisplay}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservationList}
    </main>
  );
}

export default Dashboard;
