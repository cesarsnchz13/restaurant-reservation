import React, { useState } from "react";
import { today, asTimeString } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

function NewReservation() {
  const history = useHistory();
  const date = today();
  const now = asTimeString();
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);

  //NEED TO CHANGE THIS TO CALL THE API
  //DO NOT ALLOW TO SUBMIT WITHOUT ALL FORMS BEING FILLED
  const submitHandler = (e) => {
    e.preventDefault();
    setError(null);
    createReservation(formData);
    history.push(`/dashboard/?date=${formData.reservation_date}`);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <>
      <div>
        <ErrorAlert error={error} />
      </div>
      <h2>Add New Reservation</h2>
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
                    reservation_date: formData.reservation_date,
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
                    reservation_date: formData.reservation_date,
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
                  reservation_date: formData.reservation_date,
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
              value={formData.reservation_date}
              min={date}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              type="time"
              className="form-control"
              id="reservation_time"
              name="reservation_time"
              onChange={(e) =>
                setFormData({
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  mobile_number: formData.mobile_number,
                  reservation_date: formData.reservation_date,
                  reservation_time: e.target.value,
                  people: formData.people,
                })
              }
              min={now}
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
                  reservation_date: formData.reservation_date,
                  reservation_time: formData.reservation_time,
                  people: e.target.value,
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

export default NewReservation;
