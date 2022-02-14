import React from "react";

function TableDetail({ tables, finishHandler }) {
  const tableList = tables.map((table) => {
    const tableStatus = table.reservation_id ? "Occupied" : "Free";
    return (
      <div
        className="card text-white bg-secondary mb-3"
        style={{ maxWidth: "18rem" }}
        key={table.table_id}
      >
        <div className="card-header">{table.table_name}</div>
        <div className="card-body">
          <h5 className="card-title" data-table-id-status={table.table_id}>
            {tableStatus}
          </h5>
          <p className="card-text">Capacity: {table.capacity}</p>
        </div>
        <button
          type="button"
          className="btn btn-info"
          data-table-id-finish={table.table_id}
          onClick={() => finishHandler(table)}
        >
          Finish
        </button>
      </div>
    );
  });
  return <>{tableList}</>;
}

export default TableDetail;
