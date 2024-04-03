import { checkPassword, findUsername } from "../utils/validator.js";
import { errorMessages } from "../constants/errormessages.jsx";
import Fields from "../components/Fields.jsx";
import Button from "../components/Button.jsx";

const Account = ({
  user,
  setUser,
  formState,
  setFormState,
  onLogout,
  accounts,
  setAccounts,
}) => {
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
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) => {
          if (user === account.username) {
            return {
              ...account,
              username,
              password,
            };
          }
          return account;
        })
      );
      setUser(username);
    }
  };
  const handleLogout = () => {
    onLogout();
    setFormState((prevState) => ({
      ...prevState,
      username: {
        ...prevState.username,
        value: "",
        error: "",
      },
      password: {
        ...prevState.password,
        value: "",
        error: "",
      },
    }));
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
          <Button type="submit">Update Details</Button>
          <Button type="button" className="logout" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </form>
    </>
  );
};

export default Account;
