import {
  VStack,
  ButtonGroup,
  FormControl,
  FormLabel,
  Button,
  Input,
  FormErrorMessage,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      initialpass: "",
      confirmpass:"",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("User Name required")
        .min(6, " short username")
        .max(28, "too long username"),
      email: Yup.string().email().required("Email is not valid"),
      initialpass: Yup.string()
        .required("Password required")
        .min(6, " short Password")
        .max(28, "too long Password"),
      confirmpass:Yup.string().oneOf([Yup.ref("initialpass"),null],"Password must match"),
    }),
    onSubmit: (values, action) => {
      const vals = { ...values };
      vals.password= values.initialpass;
      action.resetForm();
      fetch("http://localhost:4040/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vals),
      })
        .catch((err) => {
          return;
        })
        .then((res) => {
          if (!res || !res.ok || res.status >= 400) {
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          if (data.status) {
            setError(data.status);
          } else if (data.loggedIn) {
            setUser({ ...data });
            navigate("/home");
          }
        });
    },
  });
  const { setUser } = useContext(AccountContext);
  return (
    <VStack
      as="form"
      w={{ base: "90%", md: "500px" }}
      m="auto"
      justify="center"
      h="100vh"
      spacing="1rem"
      onSubmit={formik.handleSubmit}>
      <Heading>Signup</Heading>
      <Text as="p" color="red.500">
        {error}
      </Text>
      <FormControl
        isInvalid={formik.errors.username && formik.touched.username}>
        <FormLabel fontSize="lg">Username</FormLabel>
        <Input
          name="username"
          type="text"
          placeholder="Enter UserName"
          autoComplete="off"
          size="lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={formik.errors.email && formik.touched.email}>
        <FormLabel fontSize="lg">Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="Enter Email"
          autoComplete="off"
          size="lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={formik.errors.initialpass && formik.touched.initialpass}>
        <FormLabel fontSize="lg">Enter Password</FormLabel>
        <Input
          name="initialpass"
          type="password"
          placeholder="Enter Password"
          autoComplete="off"
          size="lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.initialpass}
        />
        <FormErrorMessage>{formik.errors.initialpass}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={formik.errors.confirmpass && formik.touched.confirmpass}>
        <FormLabel fontSize="lg">Confirm Password</FormLabel>
        <Input
          name="confirmpass"
          type="password"
          placeholder="Confirm Password"
          autoComplete="off"
          size="lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmpass}
        />
        <FormErrorMessage>{formik.errors.confirmpass}</FormErrorMessage>
      </FormControl>
      <ButtonGroup pt="1rem">
        <Button
          onClick={() => {
            navigate("/");
          }}>
          Back
        </Button>
        <Button colorScheme="teal" type="submit">
          Create Account
        </Button>
      </ButtonGroup>
    </VStack>
  );
}

export default Login;
