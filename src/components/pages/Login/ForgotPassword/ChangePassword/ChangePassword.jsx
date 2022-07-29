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
import Page from "../../../../templates/page";
import styled from "styled-components";
import { User, Mail, Lock } from "grommet-icons";
import { toast } from "react-toastify";
import { UserContext } from "../../../../../context/context";
import { useHistory, Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";

const StyledFormField = styled(FormField)`
  border-bottom: none;
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

const StyledLockIcon = styled(Lock)`
  width: 12px;
  height: 12px;
`;

const StyledSetNewPasswordButton = styled(Button)`
  background-color: #f89d1c;
  border-color: #f89d1c;
  border-radius: 5px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 40%;
  width: 100%;
`;

function ChangePassword() {
  const loggedInContext = useContext(UserContext);
 

  const isLoggedIn = loggedInContext.loggedIn;

  const history = useHistory();
  const { token } = useParams();

 

  return (
    <Page>
      <Box width={"medium"} alignSelf="center">
        <StyledForm
          onSubmit={({ value }) => {
           
            axios
              .put(
                "http://127.0.0.1:3001/api/user/reset-password",
                {
                  new_password: value.password,
                },
                {
                  headers: {
                    Authorization: token,
                  },
                }
              )
              .then((res) => {
               
                history.push("/login/");
                toast.success("Password Changed. Please Log In");
              })
              .catch((e) => {
                toast.error("Failed to reset password");
              });
          }}
        >
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
              type={"password"}
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
              if (fieldValue !== entireValue.password)
                return "Passwords do not match";
            }}
          >
            <StyledTextInput
              type={"password"}
              name="repeatedPassword"
              id="StyledTextInput-id"
              placeholder="Repeat Password"
              icon={<StyledLockIcon />}
              reverse
            />
          </StyledFormField>

          <Box alignSelf="end">
            <StyledSetNewPasswordButton
              type="submit"
              primary
              label="Set New Password"
            />
          </Box>
        </StyledForm>
      </Box>
    </Page>
  );
}

export default ChangePassword;
