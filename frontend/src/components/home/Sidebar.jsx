import {
  Button,
  Divider,
  HStack,
  Heading,
  TabList,
  VStack,
  Tab,
  Text,
  Circle,
  useDisclosure,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { FriendContext } from "./Home";
import AddFriend from "../login/AddFriend";
import { v4 as uuid } from "uuid";

function Sidebar() {
  const { friendList } = useContext(FriendContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack py="1.4rem">
        <HStack justify="space-around" w="100%" px="1rem">
          <Heading size="md">Add Friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        {friendList &&
          friendList.map((friend) => (
            <HStack as={Tab} key={uuid()}>
              <Circle
                bg={friend.connected === "true" ? "green.500" : "red.500"}
                w="15px"
                h="15px"
              />
              <Text>{friend.username}</Text>
            </HStack>
          ))}
      </VStack>
      <AddFriend isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Sidebar;
