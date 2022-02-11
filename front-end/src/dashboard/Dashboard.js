import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ReservationDetail from "./ReservationDetail";
import TableDetail from "./TableDetail";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [dateDisplay, setDateDisplay] = useState(date);
  const [tables, setTables] = useState([]);
  const query = useQuery();
  const queryDate = query.get("date");
  date = dateDisplay;

  useEffect(() => {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }, [date]);

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
      <ReservationDetail reservations={reservations} tables={tables} />
      <TableDetail tables={tables} />
    </main>
  );
}

export default Dashboard;
