import { TabPanel, TabPanels, VStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FriendContext } from "./Home";
import {v4 as uuid} from "uuid"

function Chat() {
  const { friendList } = useContext(FriendContext);
  return (
    <VStack>
        {friendList.length > 0 ? (
        <TabPanels>
          {
            friendList.map(friend=><TabPanel key={uuid}>{friend.username}</TabPanel>)
          }
        </TabPanels>
      ) : (
        <TabPanels justify="center" pt="5rem" textAlign="center" fontSize="lg">
          <Text>No Friends to show :)</Text>
        </TabPanels>
      )}
    </VStack>
  );
}

export default Chat;
