import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { accessToken, logout } from "./spotify";

const Home = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <>
      {!token && <a href="http://localhost:3000/login">login</a>}
      {token && <a href="http://localhost:5173">home</a>}
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Home;
