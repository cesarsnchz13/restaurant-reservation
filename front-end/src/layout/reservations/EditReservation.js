import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import ReservationForm from "./ReservationForm";
// import { editReservation } from "../../utils/api";

function EditReservation() {
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

  const submitHandler = async (e) => {
    const abortController = new AbortController();
    e.preventDefault();
    setError(null);

    try {
      //   await createReservation(formData); // use try and catch so that if there is an error, it will display the error message
      //   history.push(`/dashboard/?date=${formData.reservation_date}`);
      console.log("BUTTON PUSHED!");
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
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
      <h2>Edit Reservation</h2>
      <ReservationForm
        formData={formData}
        setFormData={setFormData}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
}

export default EditReservation;
