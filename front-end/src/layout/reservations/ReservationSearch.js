import React, { useState } from "react";
import { searchReservations } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import ReservationDetail from "./ReservationDetail";

function ReservationSearch() {
  const [guestList, setGuestList] = useState([]);
  const [searchedNumber, setSearchedNumber] = useState({ mobile_number: "" });
  const [errors, setErrors] = useState(null);

  const handleChange = (event) => {
    event.preventDefault();
    setSearchedNumber({
      ...searchedNumber,
      mobile_number: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const response = await searchReservations(
        searchedNumber.mobile_number,
        abortController.signal
      );

      setGuestList(response);
    } catch (error) {
      if (error.name !== "AbortError") {
        setErrors(error);
      }
      console.log("Aborted");
    }
    return () => abortController.abort();
  };

  const showReservationList = () => {
    if (guestList.length) {
      return <ReservationDetail reservations={guestList} />;
    } else {
      return <p className="text-danger">No reservations found</p>;
    }
  };

  return (
    <div>
      <br />
      <ErrorAlert error={errors} />
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
                value={searchedNumber.mobile_number}
                onChange={(event) => {
                  if (
                    (event.key !== "Backspace" &&
                      event.target.value.length === 3) ||
                    event.target.value.length === 7
                  ) {
                    event.target.value += "-";
                  }
                  handleChange(event);
                }}
              />
            </div>
            <div className="col-auto">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary mb-2"
              >
                Find
              </button>
            </div>
          </div>
        </form>
        <div className="card-body">
          <h5 className="card-title">Results</h5>
          {showReservationList()}
        </div>
      </div>
    </div>
  );
}

export default ReservationSearch;
