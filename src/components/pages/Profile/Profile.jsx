import { UserContext } from "../../../context/context";
import Page from "../../templates/page";
import axios from "axios";
import { Text, Heading, Box } from "grommet";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

export default function Profile({}) {
  const history = useHistory();
  const [userEmailState, setUserEmailState] = useState(null);

  const loggedInContext = useContext(UserContext);
  const isLoggedIn = loggedInContext.loggedIn;

  useEffect(() => {
    if (isLoggedIn) {
      const jwtToken = localStorage.getItem("ndau_user_token");
     
      axios
        .get("http://127.0.0.1:3001/api/user/user-profile-details", {
          headers: { authorization: jwtToken },
        })
        .then((res) => {
         
          setUserEmailState(res.data.email);
        });
    } else {
      history.push("/");
    }
  }, [isLoggedIn]);

  return (
    <Page>
      <Box align="center">
        <Heading>User Profile</Heading>
        {userEmailState ? <Text>Email:{userEmailState}</Text> : "Loading..."}
      </Box>
    </Page>
  );
}
