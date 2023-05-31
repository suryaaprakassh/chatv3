import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:4040/auth/login", {
      credentials: "include",
    })
      .catch((err) => {
        console.log(err);
        setUser({ loggedIn: false });
      })
      .then((data) => {
        if (!data || !data.ok || data.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        return data.json();
      })
      .then((r) => {
        if (!r) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...r });
        navigate("/home");
      });
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
