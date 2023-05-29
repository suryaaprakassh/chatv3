import { useEffect, useContext } from "react";
import socket from "../../Socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriendList) => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect();

    socket.on("friends",(data)=>{
      setFriendList([...data])
    })
    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });
    return () => {
      socket.off("connect_error");
      socket.off("friends")
    };
  }, [setUser]);
};

export default useSocketSetup;
