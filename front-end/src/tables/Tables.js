function Tables() {
  return (
    <>
      <div>
        <h2>Add a New Table</h2>
        <form>
          <div className="form-group">
            <label htmlFor="table_name">Table Name</label>
            <input
              type="text"
              className="form-control"
              id="table_name"
              name="table_name"
              placeholder="Table Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <select
              multiple
              className="form-control"
              id="capacity"
              name="capacity"
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
            // onClick={submitHandler}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            // onClick={cancelHandler}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default Tables;
