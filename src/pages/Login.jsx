import { Inputs } from "../constants/input";
import { errorMessages } from "../constants/errormessages";
import { useState } from "react";
import ErrorBox from "../components/error.jsx";

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
        const isValid = accounts.some(
          (account) =>
            formState.username.value === account.username &&
            formState.password.value === account.password
        );
        if (isValid) {
          onLogin(formState.username.value);
        } else {
          const isUsernameValid = accounts.some(
            (account) => formState.username.value === account.username
          );
          setFormState((prevState) => ({
            ...prevState,
            username: {
              ...prevState.username,
              error: isUsernameValid ? errorMessages.accountExists : "",
            },
            password: {
              ...prevState.password,
              error: !isUsernameValid ? errorMessages.invalidCredentials : "",
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
            <label>{input.label}</label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              onChange={(e) => handleChange(input.value, e.target.value)}
            />
            <ErrorBox message={formState[input.value].error} />
          </div>
        ))}
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default Login;
