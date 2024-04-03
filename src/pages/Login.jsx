import { Inputs } from "../constants/input";
import { errorMessages } from "../constants/errormessages";
import { useState } from "react";
import ErrorBox from "../components/error.jsx";

const Login = () => {
  const [formState, setFormState] = useState(
    Inputs.reduce(
      (acc, input) => ({ ...acc, [input.value]: { value: "", error: "" } }),
      {},
    ),
  );

  const handleLogin = (e) => {
    e.preventDefault();
    setFormState((prevState) => ({
      ...prevState,
      username: { ...prevState.username, error: errorMessages.accountExists },
      password: {
        ...prevState.password,
        error: errorMessages.invalidCredentials,
      },
    }));
  };

  const handleChange = (value, inputValue) => {
    setFormState((prevState) => ({
      ...prevState,
      [value]: inputValue,
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
