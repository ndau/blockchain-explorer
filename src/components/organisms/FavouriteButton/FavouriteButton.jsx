import { UserContext } from "../../../context/context";
import { Button } from "grommet";
import { Favorite } from "grommet-icons";
import api from "../../../api";
import axios from "axios";
import { useContext } from "react";
import React from "react";

function FavouriteButton({ bookmarkVal, bookmarkType }) {
  const [saved, setSaved] = React.useState(false);

  const loggedInContext = useContext(UserContext);
  const isLoggedIn = loggedInContext.loggedIn;
  const jwtToken = localStorage.getItem("ndau_user_token");

  React.useEffect(() => {

    if (isLoggedIn)
      axios
        .put(
          `${api}/user/SpecificBookmarks`,
          { bookmark_value: bookmarkVal },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        )
        .then((val) => {
          console.log(val);
          setSaved(val.data.status);
        });
  }, [bookmarkVal]);

  function Bookmarkfunc() {
    const jwtToken = localStorage.getItem("ndau_user_token");
    setSaved(true);
    if (jwtToken) {
      console.log(bookmarkVal, "bookmarkVal");
      console.log(bookmarkType, "bookmarkType");
      axios
        .post(
          `${api}/user/bookmark`,
          { bookmark_value: bookmarkVal, bookmark_type: bookmarkType },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            setSaved(true);
          } else {
            setSaved(false);
          }
        })
        .catch((e) => console.log(e, "error saving bookmark"));
    } else {
      console.log("not logged in");
    }
  }

  return (
    isLoggedIn && (
      <Button
        tip={!saved ? "Add to Watchlist" : "Remove from Watchlist"}
        onClick={Bookmarkfunc}
        icon={<Favorite size="small" color={saved ? "#FF4040" : ""} />}
        size="small"
      />
    )
  );
}

export default FavouriteButton;
