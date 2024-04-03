import { Inputs } from "../constants/input";
import { errorMessages } from "../constants/errormessages";
import { useState } from "react";
import ErrorBox from "../components/error.jsx";
import { findUser, findUsername } from "../utils/validator.js";

const ACCOUNTS_ENDPOINT = "/src/accounts.json";

const Login = ({ onLogin }) => {
  const [formState, setFormState] = useState(
    Inputs.reduce(
      (acc, input) => ({ ...acc, [input.value]: { value: "", error: "" } }),
      {}
    )
  );

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(ACCOUNTS_ENDPOINT)
      .then((res) => res.json())
      .then((accounts) => {
        const username = formState.username.value;
        const password = formState.password.value;
        const isAccountValid = findUser(username, password, accounts);
        if (isAccountValid) {
          onLogin(formState.username.value);
        } else {
          const doesAccountExist = findUsername(username, accounts);
          setFormState((prevState) => ({
            ...prevState,
            username: {
              ...prevState.username,
              error: doesAccountExist ? errorMessages.accountExists : "",
            },
            password: {
              ...prevState.password,
              error: !doesAccountExist ? errorMessages.invalidCredentials : "",
            },
          }));
        }
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
      <form onSubmit={handleLogin}>
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
          Login
        </button>
      </form>
    </>
  );
};
export default Login;
