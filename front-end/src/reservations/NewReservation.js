import React, { useState, useEffect } from "react";

function NewReservation() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
  };

  return (
    <>
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
              />
            </div>
            <div className="col">
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-control"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              placeholder="XXX-XXX-XXXX"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              type="date"
              className="form-control"
              id="reservation_date"
              name="reservation_date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              type="time"
              className="form-control"
              id="reservation_time"
              name="reservation_time"
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">Party Size</label>
            <input
              type="number"
              className="form-control"
              id="people"
              name="people"
            />
          </div>
        </div>
        <button type="button" class="btn btn-primary">
          Primary
        </button>
        <button type="button" class="btn btn-danger">
          Danger
        </button>
      </form>
    </>
  );
}

export default NewReservation;
