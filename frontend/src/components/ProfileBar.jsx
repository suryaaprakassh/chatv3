import { useColorMode } from "@chakra-ui/color-mode";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  Box,
  HStack,
  Menu,
  Stack,
  Text,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
const ProfileBar = ({ username, online }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate =useNavigate();
  return (
    <>
      <HStack
        w="100%"
        h="62px"
        padding="20px"
        justify="space-between"
        alignSelf="flex-start">
        <HStack w="30%" justify="space-around">
          <Box w="50px" h="50px" borderRadius="50%" bg="navy"></Box>
          <Stack spacing={1}>
            <Text fontSize="xl">{username}</Text>
            <Text fontSize="sm">
              {online === "true" ? "Online" : "Offline"}
            </Text>
          </Stack>
        </HStack>
        <Menu>
          <MenuButton as={Button}>{<BsThreeDotsVertical />}</MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                toggleColorMode();
              }}>
              Toggle Dark Mode
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/login")
                fetch("http://localhost:4040/auth/logout/", {
                  method: "GET",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
              }}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Divider />
    </>
  );
};

export default ProfileBar;
