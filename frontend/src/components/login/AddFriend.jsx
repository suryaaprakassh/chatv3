import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Heading,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import socket from "../../Socket";
import { useCallback, useContext, useState } from "react";
import { FriendContext } from "../home/Home";

function AddFriend({ isOpen, onClose }) {
  const [error, setError] = useState();
  const closeModal = useCallback(() => {
    setError("");
    onClose();
  }, [onClose]);
  const { setFriendList } = useContext(FriendContext);
  const formik = useFormik({
    initialValues: {
      friendName: "",
    },
    validationSchema: Yup.object({
      friendName: Yup.string()
        .required("UserName Required")
        .min(6, "short username")
        .max(28, "Long username"),
    }),
    onSubmit: (values) => {
      socket.emit("add_friend", values.friendName, ({ errorMsg, done }) => {
        if (done) {
          setFriendList((prev) => {
                  if(prev){
                    return [...prev,{username:values.friendName,connected:false}]
                  }else{
                    return [{username:values.friendName,connected:false}]
                  }
          });
          closeModal();
          return;
        }
        setError(errorMsg);
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={formik.handleSubmit}>
        <ModalHeader>Add a Friend</ModalHeader>
        <ModalCloseButton />
        <FormControl
          isInvalid={formik.errors.friendName && formik.touched.friendName}
        >
          <ModalBody>
            <Heading as="p" color="red.500" textAlign="center" fontSize="lg">
              {error}
            </Heading>
            <FormLabel>UserName</FormLabel>
            <Input
              placeholder="Enter Friends Name.."
              autoComplete="off"
              name="friendName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
            />
            <FormErrorMessage>{formik.errors.friendName}</FormErrorMessage>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </FormControl>
      </ModalContent>
    </Modal>
  );
}

export default AddFriend;
