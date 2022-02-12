function TableDetail({ tables }) {
  const tableList = tables.map((table) => {
    let statusMessage = "Open";
    if (table.status === "free") {
      return (
        <div
          className="card text-white bg-success mb-3"
          style={{ maxWidth: "18rem" }}
          key={table.table_id}
        >
          <div className="card-header">{table.table_name}</div>
          <div className="card-body">
            <h5 className="card-title" data-table-id-status={table.table_id}>
              Status: {statusMessage}
            </h5>
            <p className="card-text">Capacity: {table.capacity}</p>
          </div>
        </div>
      );
    } else {
      statusMessage = "Occupied";
      return (
        <div
          className="card text-white bg-secondary mb-3"
          style={{ maxWidth: "18rem" }}
          key={table.table_id}
        >
          <div className="card-header">{table.table_name}</div>
          <div className="card-body">
            <h5 className="card-title" data-table-id-status={table.table_id}>
              Status: {statusMessage}
            </h5>
            <p className="card-text">Capacity: {table.capacity}</p>
          </div>
        </div>
      );
    }
  });
  return <>{tableList}</>;
}

export default TableDetail;
