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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddFriend({ isOpen, onClose }) {
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
    onSubmit: (values, action) => {
      console.log("submitted");
      alert(JSON.stringify(values, null, 2));
      action.resetForm();
    },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={formik.handleSubmit}>
        <ModalHeader>Add a Friend</ModalHeader>
        <ModalCloseButton />
        <FormControl
          isInvalid={formik.errors.friendName && formik.touched.friendName}
        >
          <ModalBody>
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
