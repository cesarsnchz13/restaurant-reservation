function TableForm({ formData, setFormData, submitHandler, cancelHandler }) {
  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="table_name">Table Name</label>
          <input
            type="text"
            className="form-control"
            id="table_name"
            name="table_name"
            placeholder="Table Name"
            onChange={(e) => {
              setFormData({
                table_name: e.target.value,
                capacity: formData.capacity,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            className="form-control"
            id="capacity"
            name="capacity"
            min="1"
            onChange={(e) => {
              setFormData({
                table_name: formData.table_name,
                capacity: Number(e.target.value),
              });
            }}
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitHandler}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default TableForm;
