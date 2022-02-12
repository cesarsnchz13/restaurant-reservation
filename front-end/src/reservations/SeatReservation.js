import React, { useEffect, useState } from "react";
import { listTables, seatReservation } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const history = useHistory();
  const params = useParams();
  const [alltables, setAllTables] = useState([]);
  const [tableId, setTableId] = useState(1);
  const [error, setError] = useState(null);

  useEffect(loadInformation, []);

  function loadInformation() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setAllTables);
    return () => abortController.abort();
  }

  const tableOptions = alltables.map((table) => {
    if (table.status === "free") {
      return (
        <option
          key={table.table_id}
          name={table.table_id}
          value={table.table_id}
        >
          {table.table_name} - {table.capacity}
        </option>
      );
    }
    return null;
  });

  const clickHandler = async (e) => {
    const abortController = new AbortController();
    try {
      await seatReservation(
        params.reservation_id,
        tableId,
        abortController.signal
      );
      history.push("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <h2>Select Table</h2>
      <ErrorAlert error={error} />
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Reservation Information</h5>
          <div className="input-group">
            <select
              className="custom-select"
              id="table_id"
              name="table_id"
              onChange={(e) => {
                setTableId(Number(e.target.value));
              }}
            >
              <option value="default">Choose Table</option>
              {tableOptions}
            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="submit"
                onClick={clickHandler}
              >
                Seat Guest
              </button>
            </div>
          </div>
        </div>
      </div>
      <Link type="button" className="btn btn-danger" to={"/"}>
        Cancel
      </Link>
    </>
  );
}

export default SeatReservation;
