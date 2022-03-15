import React, { useState } from "react";

function ReservationSearch() {
  const [guestList, setGuestList] = useState([]);
  const [formData, setFormData] = useState("");
  console.log("formData: ", formData);
  console.log("guestList: ", guestList);

  return (
    <div>
      <br />
      <div className="card">
        <form className="card-header">
          <label htmlFor="mobile_number">Enter Guest's Phone Number</label>
          <div className="form-row align-items-center">
            <div className="col">
              <input
                name="mobile_number"
                type="tel"
                className="form-control"
                id="mobile_number"
                placeholder="Enter a customer's phone number"
                maxLength="12"
                onChange={(e) => {
                  if (
                    (e.key !== "Backspace" && e.target.value.length === 3) ||
                    e.target.value.length === 7
                  ) {
                    e.target.value += "-";
                  }
                  setFormData(e.target.value);
                }}
                value={formData}
              />
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-primary mb-2">
                Find
              </button>
            </div>
          </div>
        </form>
        <div className="card-body">
          <h5 className="card-title">Results</h5>
        </div>
      </div>
    </div>
  );
}

export default ReservationSearch;
