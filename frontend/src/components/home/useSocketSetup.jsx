import { useEffect, useContext } from "react";
import socket from "../../Socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriendList, setMessages) => {
	const { setUser } = useContext(AccountContext);
	useEffect(() => {
		socket.connect();

		socket.on("friends", (data) => {
			setFriendList([...data]);
		});
		socket.on("messages", (data) => {
			setMessages([...data]);
		});
		socket.on("dm", (data) => {
			setMessages((prev) => [data, ...prev]);
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
			socket.off("messages");
			socket.off("connected");
			socket.off("dm");
		};
	}, [setUser, setFriendList, setMessages]);
};

export default useSocketSetup;
