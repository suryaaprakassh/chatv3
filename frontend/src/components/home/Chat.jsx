import { TabPanel, TabPanels, VStack, Text } from "@chakra-ui/react";
import { useContext, useRef, useEffect } from "react";
import { FriendContext } from "./Home";
import { MessageContext } from "./Home";
import { v4 as uuid } from "uuid";
import ChatBox from "./ChatBox";
import ProfileBar from "../ProfileBar";

function Chat({ userId }) {
  const { friendList } = useContext(FriendContext);
  const { messages } = useContext(MessageContext);
  const bottomDiv = useRef(null);
  useEffect(() => {
    if (bottomDiv.current) {
      bottomDiv.current.scrollIntoView();
    }
  });
  return friendList.length > 0 ? (
    <TabPanels height="100%">
      {friendList.map((friend) => (
        <TabPanel key={uuid()} h="100vh">
          <ProfileBar username={userId?.username} online={userId?.connected} />
          <VStack
            flexDir="column-reverse"
            as={TabPanel}
            w="100%"
            h="85%"
            overflowY="scroll">
            <div ref={bottomDiv} />
            {messages
              .filter(
                (msg) => msg.to === friend.userId || msg.from === friend.userId
              )
              .map((msg, index) => {
                return (
                  <Text
                    m={
                      msg.to === friend.userId
                        ? "1rem 0 0 auto !important"
                        : "1rem auto 0 0 !important"
                    }
                    key={`${friend.userId}:${index}`}
                    fontSize="lg"
                    bg={msg.to === friend.userId ? "blue.100" : "gray.100"}
                    color="gray.800"
                    maxWidth="50%"
                    borderRadius="10px"
                    p="0.5rem 1rem">
                    {msg.content}
                  </Text>
                );
              })}
          </VStack>
          <ChatBox userId={userId} />
        </TabPanel>
      ))}
    </TabPanels>
  ) : (
    <TabPanels
      justify="center"
      pt="5rem"
      textAlign="center"
      fontSize="lg">
      <Text>No Friends to show :)</Text>
    </TabPanels>
  );
}

export default Chat;
