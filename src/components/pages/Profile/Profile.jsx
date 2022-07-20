import { UserContext } from "../../../context/context";
import Page from "../../templates/page";
import axios from "axios";
import { useState, useEffect, useContext } from "react";

export default function Profile({}) {
  const loggedInContext = useContext(UserContext);
  const isLoggedIn = loggedInContext.loggedIn;

  useEffect(() => {
    if (isLoggedIn) {
      const jwtToken = localStorage.getItem("ndau_user_token");
      console.log(jwtToken, "jwtToken");
      axios
        .get("http://127.0.0.1:3001/api/users/user-profile-details", {
          headers: { authorization: jwtToken },
        })
        .then((res) => console.log(res));
    }

  }, [isLoggedIn]);

  return (
    <Page>
      <h2>Email:{}</h2>
    </Page>
  );
}
