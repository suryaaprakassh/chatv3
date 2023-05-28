import { TabPanel, TabPanels, VStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FriendContext } from "./Home";

function Chat() {
  const { friendList } = useContext(FriendContext);
  return (
    <VStack>
      {friendList.length > 0 ? (
        <TabPanels>
          <TabPanel>Friend 1</TabPanel>
          <TabPanel>Friend 2</TabPanel>
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
