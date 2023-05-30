import { useEffect, useContext } from "react";
import socket from "../../Socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriendList) => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect();

    socket.on("friends", (data) => {
      console.log(data);
      setFriendList([...data]);
    });
    socket.on("connected", (status, username) => {
      setFriendList((prev) =>
        [...prev].map((f) => {
          if (f.username == username) {
            f.connected = status;
          }
          return f;
        })
      );
    });
    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });

    return () => {
      socket.off("connect_error");
      socket.off("friends");
      socket.off("connected");
    };
  }, [setUser]);
};

export default useSocketSetup;
