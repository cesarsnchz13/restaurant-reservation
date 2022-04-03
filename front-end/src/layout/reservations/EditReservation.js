import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import ReservationForm from "./ReservationForm";
import { readReservation, editReservation } from "../../utils/api";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
    status: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);

  useEffect(() => {
    function loadReservation() {
      const abortController = new AbortController();
      setError(null);

      readReservation(reservation_id, abortController.signal)
        .then(setFormData)
        .catch(setError);
      return () => abortController.abort();
    }
    loadReservation();
  }, [reservation_id]);

  const submitHandler = async (e) => {
    const abortController = new AbortController();
    e.preventDefault();
    setError(null);

    try {
      await editReservation(reservation_id, formData); // use try and catch so that if there is an error, it will display the error message
      history.push(`/dashboard/?date=${formData.reservation_date}`);
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
