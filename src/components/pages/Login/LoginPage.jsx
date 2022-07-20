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
  CheckBox,
} from "grommet";
import Page from "../../templates/page";
import registerBgImg from "../../../img/registerBg.png";
import ndauLogo from "../../../img/ndau_orange_logo.png";
import styled from "styled-components";
import { User, Mail, Lock } from "grommet-icons";
import { UserContext } from "../../../context/context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";

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
  height: 40%;
`;

function LoginPage() {
  const loggedInContext = useContext(UserContext);
  console.log(loggedInContext, "loggedInContext");
  const isLoggedIn = loggedInContext.loggedIn;
  const updateLoggedIn = loggedInContext.updateLoggedIn;

  const [checkedState, setCheckedState] = useState(false);
  const size = useContext(ResponsiveContext);
  const history = useHistory();
  return (
    <Page>
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
                .post("http://127.0.0.1:3001/api/users/login", {
                  email: value.email,
                  password: value.password,
                })
                .then((res) => {
                  console.log(res, "getting reponse");
                  if (res.data.status === true) {
                    console.log("logged in");
                    localStorage.setItem(
                      "ndau_user_token",
                      res.data.user_token
                    );
                    updateLoggedIn(true);
                    console.log(isLoggedIn, "isLoggedIn");
                    history.push("/");
                  }
                })
                .catch((e) => {
                  console.log("failed to login");
                });
            }}
          >
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

            <Box direction="row" justify="evenly" margin={{ bottom: "small" }}>
              <CheckBox
                checked={checkedState}
                label="Remember Me"
                onChange={(event) => setCheckedState(event.target.checked)}
              />
              <Anchor>Forgot Password</Anchor>
            </Box>

            <Box align="center">
              <StyledSignUpButton type="submit" primary label="Login" />
            </Box>
          </StyledForm>
          <Box
            align="center"
            direction="row"
            alignSelf="center"
            margin={{ top: "35%" }}
          >
            <Text size="xsmall" color={"#AAA"}>
              Don't have an account?
              <Anchor align="center" margin={{ left: "5px" }}>
                {"Sign Up"}
              </Anchor>
            </Text>
          </Box>
        </Box>
      </div>
    </Page>
  );
}

export default LoginPage;
