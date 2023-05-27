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

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("User Name required")
        .min(6, " short username")
        .max(28, "too long username"),
      password: Yup.string()
        .required("Password required")
        .min(6, " short Password")
        .max(28, "too long Password"),
    }),
    onSubmit: (values, action) => {
      const vals = { ...values };
      action.resetForm();
      fetch("http://localhost:4000/auth/login/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vals),
      })
        .catch((err) => {
          console.log(err);
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
      onSubmit={formik.handleSubmit}
    >
      <Heading>Login</Heading>
      <Text as="p" color="red.400">
        {error}
      </Text>
      <FormControl
        isInvalid={formik.errors.username && formik.touched.username}
      >
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
        isInvalid={formik.errors.password && formik.touched.password}
      >
        <FormLabel fontSize="lg">Password</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="Enter Password"
          autoComplete="off"
          size="lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>
      <ButtonGroup pt="1rem">
        <Button colorScheme="teal" type="submit">
          Login
        </Button>
        <Button
          onClick={() => {
            navigate("/register");
          }}
        >
          Create Account
        </Button>
      </ButtonGroup>
    </VStack>
  );
}

export default Login;
