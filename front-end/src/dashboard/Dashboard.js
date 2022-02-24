import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ReservationDetail from "./ReservationDetail";
import TableDetail from "./TableDetail";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import { finishTable } from "../utils/api";

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [dateDisplay, setDateDisplay] = useState(date);
  const [tables, setTables] = useState([]);

  let query = useQuery();
  let queryDate = query.get("date");

  useEffect(loadDashboard, [dateDisplay]);
  useEffect(changeDates, [date, dateDisplay]);
  useEffect(loadTables, []);
  useEffect(() => {
    if (queryDate) {
      setDateDisplay(queryDate);
    }
  }, [queryDate]);
  console.log("reservations: ", reservations[1]);
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ dateDisplay }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }
  function changeDates() {
    const abortController = new AbortController();
    if (!dateDisplay) {
      setDateDisplay(date);
    } else if (dateDisplay && dateDisplay !== "") {
      setDateDisplay(dateDisplay);
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

  const finishHandler = async (table) => {
    const abortController = new AbortController();
    try {
      if (window.confirm("Is this table ready to seat new guests?")) {
        await finishTable(table, abortController.signal);
        loadTables();
        //loadDashboard();
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setReservationsError(err);
      }
    }
    loadTables();
    return () => abortController.abort();
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
      <TableDetail tables={tables} finishHandler={finishHandler} />
    </main>
  );
}

export default Dashboard;
