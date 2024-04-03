import { useState } from "react";
import Container from "../layout/container.jsx";
import Login from "./Login.jsx";
import Account from "./Account.jsx";
import { Inputs } from "../constants/input.jsx";

const INITIAL_USER = null;

const Home = () => {
  const [user, setUser] = useState(INITIAL_USER);
  const [formState, setFormState] = useState(
    Inputs.reduce(
      (acc, input) => ({ ...acc, [input.value]: { value: "", error: "" } }),
      {}
    )
  );
  const onLogin = (user) => {
    setUser(user);
  };
  const onLogout = (user) => {
    setUser(INITIAL_USER);
  };
  return (
    <>
      <Container>
        {!!user ? (
          <Account
            user={user}
            setUser={setUser}
            formState={formState}
            setFormState={setFormState}
            onLogout={onLogout}
          />
        ) : (
          <Login
            formState={formState}
            setFormState={setFormState}
            onLogin={onLogin}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
