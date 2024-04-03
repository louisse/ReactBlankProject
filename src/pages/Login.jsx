import { Inputs } from "../constants/input";
import { errorMessages } from "../constants/errormessages";
import { useState } from "react";
import { findUser, findUsername } from "../utils/validator.js";
import accounts from "../accounts.json";
import Fields from "../components/Fields.jsx";

const Login = ({ onLogin }) => {
  const [formState, setFormState] = useState(
    Inputs.reduce(
      (acc, input) => ({ ...acc, [input.value]: { value: "", error: "" } }),
      {}
    )
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const username = formState.username.value;
    const password = formState.password.value;
    const isAccountValid = findUser(username, password, accounts);
    if (!isAccountValid) {
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
      return;
    }
    onLogin(username);
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
        <Fields formState={formState} setFormState={setFormState} />
        <div className="btn-wrapper">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
    </>
  );
};
export default Login;
