import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import { createTable } from "../../utils/api";
import TableForm from "./TableForm";

function NewTable() {
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    const abortController = new AbortController();
    e.preventDefault();
    setError(null);

    try {
      await createTable(formData);
      history.push(`/dashboard`);
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
      <h2>Add a New Table</h2>
      <TableForm
        formData={formData}
        setFormData={setFormData}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
}

export default NewTable;
