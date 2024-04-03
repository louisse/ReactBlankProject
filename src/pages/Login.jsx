import { errorMessages } from "../constants/errormessages";
import { findUser, findUsername } from "../utils/validator.js";
import Fields from "../components/Fields.jsx";
import Button from "../components/Button.jsx";

const Login = ({ formState, setFormState, onLogin, accounts }) => {
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
          error: errorMessages.invalidCredentials,
        },
      }));
      return;
    }
    setFormState((prevState) => ({
      ...prevState,
      username: {
        ...prevState.username,
        value: username,
        error: "",
      },
      password: {
        ...prevState.password,
        value: "",
        error: "",
      },
    }));
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
          <Button type="submit">Login</Button>
        </div>
      </form>
    </>
  );
};
export default Login;
