import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";

function NewReservation() {
  const history = useHistory();

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
      <ReservationForm
        formData={formData}
        setFormData={setFormData}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
}

export default NewReservation;
