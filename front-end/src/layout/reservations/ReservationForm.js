function ReservationForm({
  formData,
  setFormData,
  submitHandler,
  cancelHandler,
}) {
  const formattedDate = formData.reservation_date.slice(0, 10);

  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="guest_name">Guest Name</label>
          <div className="row">
            <div className="col">
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="form-control"
                placeholder="First name"
                onChange={(e) =>
                  setFormData({
                    first_name: e.target.value,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formattedDate,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                  })
                }
                value={formData.first_name}
              />
            </div>
            <div className="col">
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-control"
                placeholder="Last name"
                onChange={(e) =>
                  setFormData({
                    first_name: formData.first_name,
                    last_name: e.target.value,
                    mobile_number: formData.mobile_number,
                    reservation_date: formattedDate,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                  })
                }
                value={formData.last_name}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              placeholder="000-000-0000"
              onChange={(e) => {
                if (
                  (e.key !== "Backspace" && e.target.value.length === 3) ||
                  e.target.value.length === 7
                ) {
                  e.target.value += "-";
                }
                setFormData({
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  mobile_number: e.target.value,
                  reservation_date: formattedDate,
                  reservation_time: formData.reservation_time,
                  people: formData.people,
                });
              }}
              maxLength="12"
              value={formData.mobile_number}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              type="date"
              className="form-control"
              id="reservation_date"
              name="reservation_date"
              required
              onChange={(e) =>
                setFormData({
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  mobile_number: formData.mobile_number,
                  reservation_date: e.target.value,
                  reservation_time: formData.reservation_time,
                  people: formData.people,
                })
              }
              value={formattedDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              type="time"
              className="form-control"
              id="reservation_time"
              name="reservation_time"
              min="10:30"
              max="21:30"
              onChange={(e) => {
                setFormData({
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  mobile_number: formData.mobile_number,
                  reservation_date: formattedDate,
                  reservation_time: e.target.value,
                  people: formData.people,
                });
              }}
              value={formData.reservation_time}
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">Party Size</label>
            <input
              type="number"
              className="form-control"
              id="people"
              name="people"
              onChange={(e) =>
                setFormData({
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  mobile_number: formData.mobile_number,
                  reservation_date: formattedDate,
                  reservation_time: formData.reservation_time,
                  people: parseInt(e.target.value),
                })
              }
              min="1"
              value={formData.people}
            />
          </div>
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

export default ReservationForm;
