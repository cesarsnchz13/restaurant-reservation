import React, { useEffect, useState } from "react";
import { listReservations, listTables, cancelReservation } from "../utils/api";
import ReservationDetail from "../layout/reservations/ReservationDetail";
import TableDetail from "../layout/tables/TableDetail";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import { finishTable } from "../utils/api";

function Dashboard({ thisDay }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(thisDay);
  const [tables, setTables] = useState([]);

  let query = useQuery();
  let queryDate = query.get("date");

  useEffect(loadDashboard, [date]);
  useEffect(changeDates, [thisDay, date]);
  useEffect(loadTables, []);
  useEffect(() => {
    if (queryDate) {
      setDate(queryDate);
    }
  }, [queryDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date }, abortController.signal)
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
    if (!date) {
      setDate(thisDay);
    } else if (date && date !== "") {
      setDate(date);
    }
    return () => abortController.abort();
  }

  const previousClickHandler = (e) => {
    e.preventDefault();
    setDate(previous);
  };

  const todayClickHandler = (e) => {
    e.preventDefault();
    setDate(today);
  };

  const nextClickHandler = (e) => {
    e.preventDefault();
    setDate(next);
  };

  const finishHandler = async (table) => {
    const abortController = new AbortController();
    try {
      if (window.confirm("Is this table ready to seat new guests?")) {
        await finishTable(table, abortController.signal);
        loadTables();
        loadDashboard();
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setReservationsError(err);
      }
    }
    loadTables();
    return () => abortController.abort();
  };

  const cancelHandler = async (reservation) => {
    const abortController = new AbortController();
    const status = { status: "cancelled" };

    try {
      const confirm = window.confirm(
        `Do you want to cancel this reservation? This cannot be undone.`
      );
      if (confirm) {
        await cancelReservation(
          reservation.reservation_id,
          status,
          abortController.signal
        );
        await loadDashboard();
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setReservationsError(error);
      }
      return () => abortController.abort();
    }
  };

  return (
    <main>
      <h2>Dashboard</h2>
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
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationDetail
        reservations={reservations}
        tables={tables}
        cancelHandler={cancelHandler}
      />
      <h4 className="mb-0">Available Tables</h4>
      <TableDetail tables={tables} finishHandler={finishHandler} />
    </main>
  );
}

export default Dashboard;
