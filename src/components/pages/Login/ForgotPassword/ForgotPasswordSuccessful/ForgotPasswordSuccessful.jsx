import { Text, Box } from "grommet";
import { UserContext } from "../../../../../context/context";
import Page from "../../../../templates/page";

import { useContext } from "react";

function ForgotPasswordSuccessful() {
  const loggedInContext = useContext(UserContext);
  const isLoggedIn = loggedInContext.loggedIn;

  return (
    <>
      {isLoggedIn ? (
        ""
      ) : (
        <Page>
          <Box width={"medium"} alignSelf="center">
            <Text>A password reset link has been sent to your mail</Text>
          </Box>
        </Page>
      )}
    </>
  );
}

export default ForgotPasswordSuccessful;
