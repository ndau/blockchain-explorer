import { Button, Form, FormField, Heading, Text, Box, ResponsiveContext, TextInput, Anchor } from 'grommet';
import registerBgImg from '../../../img/registerBg.png';
import ndauLogo from '../../../img/ndau_orange_logo.png';
import styled from 'styled-components';
import { User, Mail, Lock } from 'grommet-icons';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Page from '../../templates/page';
import api from '../../../api';

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
  height: 50%;
`;

function RegistrationPage() {
  // const history = useHistory();
  const navigate = useNavigate();
  const size = useContext(ResponsiveContext);

  const [emailErrorState, setEmailErrorState] = useState('');

  return (
    <Page>
      <div
        style={{
          backgroundColor: '#0B2140',
          position: 'relative',
          width: size !== 'small' ? '90%' : '100%',
          margin: 'auto',
          display: 'flex',
        }}
      >
        {size !== 'small' && (
          <div
            style={{
              background: `url(${registerBgImg})`,
              backgroundSize: 'contain',
              width: '50%',
              height: '100vh',
            }}
          ></div>
        )}

        <Box width={size !== 'small' ? '50%' : '100%'} height="100vh">
          <img
            src={ndauLogo}
            style={{
              width: size !== 'small' ? '20%' : '15%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
              marginBottom: size !== 'small' ? '5%' : '5%',
            }}
            alt="ndau logo"
          />
          <Heading margin="none" level={3} size="small" alignSelf="center">
            Welcome to ndau
          </Heading>

          <Box align="center" width="70%" alignSelf="center" margin="small">
            <Text size="10px" color={'#999'}>
              The ndau blockchain explorer is your window on the ndau blockchain. This website uses ndau's publicly
              accessible APIs to allow anyone to search and view all ndau transactions and accounts since ndau's mainnet
              went live in May of 2019.
              <br />
              <br />
              And by creating an account on this ndau blockchain explorer website, you have the ability to save
              bookmarks to any accounts or transactions you wish to remember. For more information about ndau, please
              see ndau.io.
            </Text>
          </Box>

          <StyledForm
            onSubmit={({ value }) => {
              axios
                .post(`${api}/user/register`, {
                  email: value.email,
                  password: value.password,
                  username: value.username,
                })
                .then((res) => {
                  if (res.data.message === 'User registered successfully' && res.data.status === true) {
                    toast.success('Signed Up Successfully. Please Login');
                    // history.push("/login");
                    navigate('/login');
                  } else {
                    console.log('test register');
                  }
                })
                .catch((e) => {
                  console.log(e, 'registration error');
                  if (e.response.data.message === 'Email already exists') {
                    setEmailErrorState('Email Already Exists');
                  }
                });
            }}
            onValidate={({ e }) => {
              if (e) console.log(e);
            }}
          >
            <StyledFormField
              validate={function (fieldValue) {
                if (!fieldValue) return 'Username cannot be empty';
                if (fieldValue.length < 4) return 'Username must be at least 4 characters';
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
              onFocus={() => setEmailErrorState('')}
              error={emailErrorState}
              validate={{
                regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Email Incorrectly entered',
                status: 'error',
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
                if (!fieldValue || fieldValue.length < 8) return 'Password must be at least 8 characters';
              }}
            >
              <StyledTextInput
                name="password"
                type={'password'}
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
                //
                if (fieldValue !== entireValue.password) return 'Passwords do not match';
              }}
            >
              <StyledTextInput
                type={'password'}
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
            <Text size="xsmall" color={'#AAA'}>
              Already Registered?
              <Anchor as={Link} to="/login" align="center" margin={{ left: '5px' }}>
                {'Sign In'}
              </Anchor>
            </Text>
          </Box>
        </Box>
      </div>
    </Page>
  );
}

export default RegistrationPage;
