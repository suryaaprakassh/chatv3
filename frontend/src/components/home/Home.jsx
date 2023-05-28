import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { createContext, useState } from "react";

export const FriendContext = createContext();

function Home() {
  const [friendList, setFriendList] = useState([
    {
      username: "Naveen Simp",
      connected: false,
    },
    {
      username: "Phedo Suresh",
      connected: true,
    },
  ]);
  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <Grid templateColumns="repeat(10,1fr)" h="100vh" as={Tabs}>
        <GridItem colSpan="3" borderRight="1px solid gray">
          <Sidebar />
        </GridItem>
        <GridItem colSpan="7">
          <Chat />
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  );
}

export default Home;
