import { useState } from "react";
import { Inputs } from "../constants/input";
import ErrorBox from "../components/error.jsx";
import { checkPassword, findUsername } from "../utils/validator.js";

const ACCOUNTS_ENDPOINT = "/src/accounts.json";
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
    fetch(ACCOUNTS_ENDPOINT)
      .then((res) => res.json())
      .then((accounts) => {
        const username = formState.username.value;
        const password = formState.password.value;
        if (user === username) {
          return; // no change
        }
        const isUserExists = findUsername(username, accounts);

        if (isUserExists) {
          console.log("user existing");
        }

        const isPasswordOK = checkPassword(password);
        if (!isPasswordOK) {
          console.log("password failed");
        }
        // update accounts data
      });
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
      <p className="greet-message">Hi {user},</p>
      <form onSubmit={handleUpdateDetails}>
        {Inputs.map((input) => (
          <div className="form" key={input.value}>
            <label className="label">{input.label}</label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              onChange={(e) => handleChange(input.value, e.target.value)}
              defaultValue={
                input.value === "username" ? formState[input.value].value : ""
              }
              className={
                !!formState[input.value].error ? "input error-field" : "input"
              }
            />
            <ErrorBox message={formState[input.value].error} />
          </div>
        ))}
        <button type="submit" className="btn">
          Update Details
        </button>
        <button type="button" className="btn" onClick={onLogout}>
          Logout
        </button>
      </form>
    </>
  );
};

export default Account;
