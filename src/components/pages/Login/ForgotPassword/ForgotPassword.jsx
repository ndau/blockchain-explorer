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
import Page from "../../../templates/page";
import styled from "styled-components";
import { User, Mail, Lock } from "grommet-icons";
import { UserContext } from "../../../../context/context";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import api from "../../../../api";

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

const StyledMailIcon = styled(Mail)`
  width: 12px;
  height: 12px;
`;

const StyledForgotPassword = styled(Button)`
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

function ForgotPasswordPage() {
  const history = useHistory();
  return (
    <Page>
      <Box width={"medium"} alignSelf="center">
        <StyledForm
          onSubmit={async ({ value }) => {
            const response = await toast.promise(
              axios.post(`${api}/user/forgot-password`, {
                email: value.email,
              }),
              {
                pending: "Resetting Password",
                success: "Password Reset Link Sent to Email",
                error: "No such email found",
              }
            );
            if (response.status === 200) {
              history.push("/login/forgot-password-successful");
            }
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
              placeholder="John@ed.com"
              icon={<StyledMailIcon />}
              reverse
            />
          </StyledFormField>

          <Box alignSelf="end">
            <StyledForgotPassword
              type="submit"
              primary
              label="Reset Password"
            />
          </Box>
        </StyledForm>
      </Box>
    </Page>
  );
}

export default ForgotPasswordPage;
