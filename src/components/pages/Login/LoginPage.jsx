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
import { Mail, Lock, FormView } from "grommet-icons";
import { UserContext } from "../../../context/context";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import api from "../../../api";

const StyledFormField = styled(FormField)`
  position: relative;
  border-bottom: none;
  width: 70%;
  margin-left: auto;
  margin-right: auto;

  input {
    color-scheme: dark;
  }
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

const StyledPasswordShowButton = styled(Button)`
  position: absolute;
  background-color: transparent;
  border-color: #f89d1c;
  border-radius: 5px;
  right: -2%;
  z-index: 2;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 40%;
`;

function LoginPage() {
  const navigate = useNavigate();
  const loggedInContext = useContext(UserContext);

  const updateLoggedIn = loggedInContext.updateLoggedIn;

  const [rememberMeCheckedState, setRememberMeCheckedState] = useState(false);
  const [emailErrorState, setEmailErrorState] = useState("");
  const [showPasswordState, setShowPasswordState] = useState(false);
  const size = useContext(ResponsiveContext);

  return (
    <Page>
      <div
        style={{
          backgroundColor: "#0B2140",
          position: "relative",
          width: size === "small" ? "90%" : "80%",
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

        <Box width={size === "small" ? "100%" : "50%"} height="100vh">
          <img
            src={ndauLogo}
            style={{
              width: size !== "small" ? "20%" : "15%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "5%",
              marginBottom: "5%",
            }}
          />
          <Heading margin="none" level={3} size="small" alignSelf="center">
            Welcome to ndau
          </Heading>

          <Box
            align="center"
            width="70%"
            alignSelf="center"
            margin={{ bottom: "2vh", top: "2vh" }}
          >
            <Text size="10px" color={"#999"}>
              Welcome to the ndau blockchain explorer.
              <br />
              <br />
              The ndau blockchain explorer is your window on the ndau
              blockchain. This website uses ndau's publicly accessible APIs to
              allow anyone to search and view all ndau transactions and accounts
              since ndau's mainnet went live in May of 2019.
              <br />
              <br />
              And by creating an account on this ndau blockchain explorer
              website, you have the ability to save bookmarks to any accounts or
              transactions you wish to remember. For more information about
              ndau, please see ndau.io.
            </Text>
          </Box>

          <StyledForm
            onSubmit={({ value }) => {
              axios
                .post(`${api}/user/login`, {
                  email: value.email,
                  password: value.password,
                  rememberMe: rememberMeCheckedState,
                })
                .then((res) => {
                  if (res.data.verify === true) {
                    localStorage.setItem(
                      "ndau_user_token",
                      "bearer " + res.data.user_token
                    );

                    updateLoggedIn(true);
                    // history.push("/");
                    toast.success("Logged In");
                    navigate("/")
                  } else {
                    toast.error("Please verify your Email");
                  }
                })
                .catch((e) => {
                  setEmailErrorState("Email or Password Incorrect");
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
              onFocus={() => setEmailErrorState("")}
              error={emailErrorState}
              htmlFor="StyledTextInput-id"
            >
              <StyledTextInput
                name="email"
                id="StyledTextInput-id"
                placeholder="John@ed.com"
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
              <StyledPasswordShowButton
                icon={<FormView />}
                onClick={() => setShowPasswordState((prev) => !prev)}
              ></StyledPasswordShowButton>
              <StyledTextInput
                name="password"
                type={showPasswordState ? "text" : "password"}
                id="StyledTextInput-id"
                placeholder="Password"
                reverse
              ></StyledTextInput>
            </StyledFormField>

            <Box direction="row" justify="evenly" margin={{ bottom: "small" }}>
              <CheckBox
                checked={rememberMeCheckedState}
                label="Remember Me"
                onChange={(event) =>
                  setRememberMeCheckedState(event.target.checked)
                }
              />
              <Anchor
                as={Link}
                to="forgot-password"
                align="center"
                margin={{ left: "5px" }}
              >
                Forgot Password
              </Anchor>
            </Box>

            <Box align="center">
              <StyledSignUpButton type="submit" primary label="Login" />
            </Box>
          </StyledForm>
          <Box align="center" direction="row" alignSelf="center">
            <Text size="xsmall" color={"#AAA"}>
              Don't have an account?
              <Anchor
                as={Link}
                to="/register"
                align="center"
                margin={{ left: "5px" }}
              >
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
