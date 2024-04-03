import { useState } from "react";
import Container from "../layout/container.jsx";
import Login from "./Login.jsx";
import Account from "./Account.jsx";

const INITIAL_USER = null;

const Home = () => {
  const [user, setUser] = useState(INITIAL_USER);

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
          <Account user={user} onLogout={onLogout} />
        ) : (
          <Login onLogin={onLogin} />
        )}
      </Container>
    </>
  );
};

export default Home;
