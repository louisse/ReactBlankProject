import { useState } from "react";
import { Inputs } from "../constants/input";
import ErrorBox from "../components/error.jsx";

const Account = ({ user, onLogout }) => {
  const [formState, setFormState] = useState(
    Inputs.reduce(
      (acc, input) => ({
        ...acc,
        [input.value]: {
          value: input.value === "username" ? user : "",
          error: "",
        },
      }),
      {}
    )
  );
  const handleUpdateDetails = (e) => {
    e.preventDefault();
    //todo
  };

  const handleChange = (value, inputValue) => {
    setFormState((prevState) => ({
      ...prevState,
      [value]: {
        ...prevState[value],
        value: inputValue,
      },
    }));
  };

  return (
    <>
      <p>Hi {user},</p>
      <form onSubmit={handleUpdateDetails}>
        {Inputs.map((input) => (
          <div className="form" key={input.value}>
            <label>{input.label}</label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              onChange={(e) => handleChange(input.value, e.target.value)}
              defaultValue={
                input.value === "username" ? formState[input.value].value : ""
              }
            />
            <ErrorBox message={formState[input.value].error} />
          </div>
        ))}
        <button type="submit">Update Details</button>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </form>
    </>
  );
};

export default Account;
