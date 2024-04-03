import { useState } from "react";
import { Inputs } from "../constants/input";
import { checkPassword, findUsername } from "../utils/validator.js";
import { errorMessages } from "../constants/errormessages.jsx";
import accounts from "../accounts.json";
import Fields from "../components/Fields.jsx";

const Account = ({ user, setUser, onLogout }) => {
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
    const username = formState.username.value;
    const password = formState.password.value;
    const isUserExists = findUsername(username, accounts);
    const usernameError =
      user === username || !isUserExists ? "" : errorMessages.uniqueUsername;

    const isPasswordOK = checkPassword(password);
    const passwordError = !isPasswordOK
      ? errorMessages.passwordRequirements
      : "";

    setFormState((prevState) => ({
      ...prevState,
      username: {
        ...prevState.username,
        error: usernameError,
      },
      password: {
        ...prevState.password,
        error: passwordError,
      },
    }));
    if (!usernameError && !passwordError) {
      setUser(username);
    }
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
        <Fields formState={formState} setFormState={setFormState} />
        <div className="btn-wrapper">
          <button type="submit" className="btn">
            Update Details
          </button>
          <button type="button" className="btn logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </form>
    </>
  );
};

export default Account;
