import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Home from "../components/home/Home";
import PrivateRoutes from "./PrivateViews";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";
const Views = () => {
  const { user } = useContext(AccountContext);
  return (
    user.loggedIn !== null && (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    )
  );
};

export default Views;
