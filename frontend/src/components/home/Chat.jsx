import { TabPanel, TabPanels, VStack, Text } from "@chakra-ui/react";
import { useContext ,useRef,useEffect} from "react";
import { FriendContext } from "./Home";
import { MessageContext } from "./Home";
import { v4 as uuid } from "uuid";
import ChatBox from "./ChatBox";
function Chat({ userId }) {
	const { friendList } = useContext(FriendContext);
	const { messages } = useContext(MessageContext);
    const bottomDiv = useRef(null);
    useEffect(()=>{
        if(bottomDiv.current){
            bottomDiv.current.scrollIntoView();
        }
    })
	return (
		<VStack h="100%" justify="end" >
			{friendList.length > 0 ? (
				<TabPanels overflowY="scroll">
					{friendList.map((friend) => (
						<VStack
							flexDir="column-reverse"
							as={TabPanel}
							key={uuid()}
							w="100%">
                        <div ref={bottomDiv} style={{background:"red",height:"2rem" ,width:"2rem"}} id="test"/>
							{messages
								.filter(
									(msg) =>
										msg.to === friend.userId || msg.from === friend.userId
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
					))}
				</TabPanels>
			) : (
				<TabPanels justify="center" pt="5rem" textAlign="center" fontSize="lg">
					<Text>No Friends to show :)</Text>
				</TabPanels>
			)}
			<ChatBox userId={userId} />
		</VStack>
	);
}

export default Chat;
