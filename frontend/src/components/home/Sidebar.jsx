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
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { FriendContext } from "./Home";

function Sidebar() {
  const { friendList, setFriendList } = useContext(FriendContext);
  return (
    <VStack py="1.4rem">
      <HStack justify="space-around" w="100%">
        <Heading size="md">Add Friend</Heading>
        <Button>
          <ChatIcon />
        </Button>
      </HStack>
      <Divider />
      {/* <VStack as={TabList}>
        <HStack as={Tab}>
          <Circle bg="red.500" w="15px" h="15px" />
          <Text>Naveen Simp</Text>
        </HStack>
        <HStack as={Tab}>
          <Circle bg="green.500" w="15px" h="15px" />
          <Text>Naveen Simp</Text>
        </HStack>
      </VStack> */}
      {friendList.map((friend) => (
        <HStack as={Tab}>
          <Circle
            bg={friend.connected ? "green.500" : "red.500"}
            w="15px"
            h="15px"
          />
          <Text>{friend.username}</Text>
        </HStack>
      ))}
    </VStack>
  );
}

export default Sidebar;
