import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { createContext, useState } from "react";
import useSocketSetup from "./useSocketSetup";

export const FriendContext = createContext();
export const MessageContext = createContext();

function Home() {
	const [friendList, setFriendList] = useState([]);
	const [messages, setMessages] = useState([]);
	const [selected, setSelected] = useState(0);
	useSocketSetup(setFriendList, setMessages);
	return (
		<FriendContext.Provider value={{ friendList, setFriendList }}>
			<Grid
				templateColumns="repeat(10,1fr)"
				h="100vh"
				as={Tabs}
				onChange={(index) => {
					setSelected(()=>friendList[index].userId);
				}}>
				<GridItem colSpan="3" borderRight="1px solid gray">
					<Sidebar />
				</GridItem>
				<GridItem colSpan="7" maxH="100vh">
					<MessageContext.Provider value={{ messages, setMessages}}>
						<Chat userId={friendList[selected]}/>
					</MessageContext.Provider>
				</GridItem>
			</Grid>
		</FriendContext.Provider>
	);
}

export default Home;
