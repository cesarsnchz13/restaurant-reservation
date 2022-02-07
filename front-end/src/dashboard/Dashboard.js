import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ReservationDetail from "./ReservationDetail";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
// import { Link, useRouteMatch } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [dateDisplay, setDateDisplay] = useState(date);
  const query = useQuery();
  const queryDate = query.get("date");
  date = dateDisplay;
  useEffect(loadDashboard, [date]);
  useEffect(changeDates, [date, queryDate]);

  function changeDates() {
    const abortController = new AbortController();
    if (!queryDate) {
      setDateDisplay(date);
    } else if (queryDate && queryDate !== "") {
      setDateDisplay(queryDate);
    }
    return () => abortController.abort();
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const previousClickHandler = (e) => {
    e.preventDefault();
    setDateDisplay(previous);
  };

  const todayClickHandler = (e) => {
    e.preventDefault();
    setDateDisplay(today);
  };

  const nextClickHandler = (e) => {
    e.preventDefault();
    setDateDisplay(next);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={previousClickHandler}
        >
          Previous Day
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={todayClickHandler}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={nextClickHandler}
        >
          Next Day
        </button>
      </div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {dateDisplay}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationDetail reservations={reservations} />
    </main>
  );
}

export default Dashboard;
