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
          <select
            multiple
            className="form-control"
            id="capacity"
            name="capacity"
            onChange={(e) => {
              setFormData({
                table_name: formData.table_name,
                capacity: Number(e.target.value),
              });
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
          </select>
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
