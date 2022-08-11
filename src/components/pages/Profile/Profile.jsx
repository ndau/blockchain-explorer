import { UserContext } from "../../../context/context";
import Page from "../../templates/page";
import axios from "axios";
import { Text, Heading, Box } from "grommet";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api";

export default function Profile({}) {
  const history = useHistory();
  const [userEmailState, setUserEmailState] = useState(null);
  const [userBookmarksState, setUserBookmarksState] = useState(null);

  const loggedInContext = useContext(UserContext);
  const isLoggedIn = loggedInContext.loggedIn;

  useEffect(() => {
    if (isLoggedIn) {
      const jwtToken = localStorage.getItem("ndau_user_token");

      axios
        .get(`${api}/api/user/user-profile-details`, {
          headers: { authorization: jwtToken },
        })
        .then((res) => {
          setUserEmailState(res.data.email);
        });

      axios
        .get(`${api}/api/user/bookmarks`, {
          headers: { authorization: jwtToken },
        })
        .then((res) => {
          setUserBookmarksState(res.data.email);
        })
        .catch((e) => console.log(e, "printing bookmarks error"));
    } else {
      history.push("/");
    }
  }, [isLoggedIn]);

  return (
    <Page>
      <Box align="center">
        <Heading>User Profile</Heading>
        {userEmailState ? <Text>Email:{userEmailState}</Text> : "Loading..."}

        {userBookmarksState
          ? userBookmarksState.map((bookmark) => (
              <div>
                <h6>{bookmark.bookmark_type}</h6>
                <p> {bookmark.bookmark_value}</p>
              </div>
            ))
          : "Loading Bookmarks..."}
      </Box>
    </Page>
  );
}
