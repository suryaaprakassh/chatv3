import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, HStack, Input } from "@chakra-ui/react";
import socket from "../../Socket";
import { useContext } from "react";
import { MessageContext } from "./Home";
const ChatBox = ({ userId }) => {
	const { setMessages } = useContext(MessageContext);
	return (
		<Formik
			initialValues={{ message: "" }}
			onSubmit={(values, action) => {
				const message = {
					from: null,
					to: userId?.userId,
					content: values.message,
				};
				socket.emit("dm", message);
				setMessages((prevMsgs) => [message, ...prevMsgs]);
				action.resetForm();
			}}
			validationSchema={Yup.object({
				message: Yup.string().min(1).max(255),
			})}>
			<HStack as={Form} w="100%" p="1.4rem">
				<Input
					as={Field}
					name="message"
					placeholder="Type message here..."
					size="lg"
					autoComplete="off"
				/>
				<Button type="submit" size="lg" colorScheme="teal">
					Send
				</Button>
			</HStack>
		</Formik>
	);
};
export default ChatBox;
