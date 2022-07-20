import {
  Button,
  Form,
  FormField,
  Heading,
  Text,
  Box,
  ResponsiveContext,
  TextInput,
  Anchor,
} from "grommet";
import registerBgImg from "../../../img/registerBg.png";
import ndauLogo from "../../../img/ndau_orange_logo.png";
import styled from "styled-components";
import { User, Mail, Lock } from "grommet-icons";
import axios from "axios";
import { useContext } from "react";

const StyledFormField = styled(FormField)`
  border-bottom: none;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
`;

const StyledTextInput = styled(TextInput)`
  background-color: #172e4e;
  padding-left: 5%;
  padding-right: 10%;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: xx-small;
  border: none;
  border-radius: 6px;
`;

const StyledUserIcon = styled(User)`
  width: 12px;
  height: 12px;
`;

const StyledMailIcon = styled(Mail)`
  width: 12px;
  height: 12px;
`;

const StyledLockIcon = styled(Lock)`
  width: 12px;
  height: 12px;
`;

const StyledSignUpButton = styled(Button)`
  width: 70%;
  background-color: #f89d1c;
  border-color: #f89d1c;
  border-radius: 5px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 60%;
`;

function RegistrationPage() {
  const size = useContext(ResponsiveContext);
  return (
    <div style={{ backgroundColor: "#111", width: "100vw" }}>
      <div
        style={{
          backgroundColor: "#0B2140",
          position: "relative",
          width: size !== "small" ? "80%" : "90%",
          margin: "auto",
          display: "flex",
        }}
      >
        {size !== "small" && (
          <div
            style={{
              background: `url(${registerBgImg})`,
              backgroundSize: "contain",
              width: "50%",
              height: "100vh",
            }}
          ></div>
        )}

        <Box width={size !== "small" ? "50%" : "100%"} height="100vh">
          <img
            src={ndauLogo}
            style={{
              width: size !== "small" ? "20%" : "15%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "5%",
              marginBottom: size !== "small" ? "5%" : "5%",
            }}
          />
          <Heading margin="none" level={3} size="small" alignSelf="center">
            Welcome to ndau
          </Heading>

          <Box align="center" width="70%" alignSelf="center" margin="small">
            <Text size="10px" color={"#999"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </Text>
          </Box>

          <StyledForm
            onSubmit={({ value }) => {
              axios
                .post("http://127.0.0.1:3001/api/users/register", {
                  email: value.email,
                  password: value.password,
                  username: value.username,
                })
                .then((res) => {
                  console.log("getting reponse");
                  if (
                    res.data.message === "User Registered Successfully" &&
                    res.data.status === true
                  ) {
                    console.log("registered");
                  }
                })
                .catch((e) => {
                  console.log("failed to login");
                });
            }}
            onValidate={({ e }) => {
              if (e) console.log(e, "onValidate");
            }}
          >
            <StyledFormField
              validate={function (fieldValue) {
                if (!fieldValue) return "Username cannot be empty";
                if (fieldValue.length < 4)
                  return "Username must be at least 4 characters";
              }}
              contentProps={{ border: false }}
              name="username"
              htmlFor="StyledTextInput-id"
            >
              <StyledTextInput
                plain={true}
                name="username"
                id="StyledTextInput-id"
                placeholder="Username"
                icon={<StyledUserIcon />}
                reverse
              />
            </StyledFormField>

            <StyledFormField
              contentProps={{ border: false }}
              name="email"
              validate={{
                regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email Incorrectly entered",
                status: "error",
              }}
              htmlFor="StyledTextInput-id"
            >
              <StyledTextInput
                name="email"
                id="StyledTextInput-id"
                placeholder="email@domain.com"
                icon={<StyledMailIcon />}
                reverse
              />
            </StyledFormField>
            
            <StyledFormField
              contentProps={{ border: false }}
              name="password"
              htmlFor="StyledTextInput-id"
              validate={function (fieldValue, entireValue) {
                if (fieldValue?.length < 8)
                  return "Password must be at least 8 characters";
              }}
            >
              <StyledTextInput
                name="password"
                id="StyledTextInput-id"
                placeholder="Password"
                icon={<StyledLockIcon />}
                reverse
              />
            </StyledFormField>
            <StyledFormField
              contentProps={{ border: false }}
              name="repeatedPassword"
              htmlFor="StyledTextInput-id"
              validate={function (fieldValue, entireValue) {
                // console.log(fieldValue, "fieldValue");
                if (fieldValue !== entireValue.password)
                  return "Passwords do not match";
              }}
            >
              <StyledTextInput
                name="repeatedPassword"
                id="StyledTextInput-id"
                placeholder="Repeat Password"
                icon={<StyledLockIcon />}
                reverse
              />
            </StyledFormField>

            <Box align="center">
              <StyledSignUpButton type="submit" primary label="Sign Up" />
            </Box>
          </StyledForm>
          <Box align="center" direction="row" alignSelf="center">
            <Text size="xsmall" color={"#AAA"}>
              Already Registered?
              <Anchor align="center" margin={{ left: "5px" }}>
                {"Sign In"}
              </Anchor>
            </Text>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default RegistrationPage;
