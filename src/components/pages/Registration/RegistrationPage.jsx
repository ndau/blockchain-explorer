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
import { useContext } from "react";

const StyledFormField = styled(FormField)`
  border-bottom: none;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
`;

const StyledTextInput = styled(TextInput)`
  background-color: #172e4e;
  padding-left: 5%;
  padding-right: 10%;
  padding-top: 20px;
  padding-bottom: 20px;
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

          <StyledForm onSubmit={({ value }) => {}}>
            <StyledFormField
              contentProps={{ border: false }}
              name="Username"
              htmlFor="StyledTextInput-id"
            >
              <StyledTextInput
                plain={true}
                name="Username"
                id="StyledTextInput-id"
                placeholder="Username"
                icon={<StyledUserIcon />}
                reverse
              />
            </StyledFormField>

            <StyledFormField
              contentProps={{ border: false }}
              name="email"
              htmlFor="StyledTextInput-id"
            >
              <StyledTextInput
                name="email"
                id="StyledTextInput-id"
                placeholder="Email"
                icon={<StyledMailIcon />}
                reverse
              />
            </StyledFormField>
            <StyledFormField
              contentProps={{ border: false }}
              name="password"
              htmlFor="StyledTextInput-id"
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
              name="repeatedpassword"
              htmlFor="StyledTextInput-id"
            >
              <StyledTextInput
                name="repeatedpassword"
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
