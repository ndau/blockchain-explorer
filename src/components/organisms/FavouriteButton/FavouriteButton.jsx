import { UserContext } from "../../../context/context";
import { Button } from "grommet";
import { Favorite } from "grommet-icons";
import api from "../../../api";
import axios from "axios";
import { useContext } from "react";

function FavouriteButton({ bookmarkVal, bookmarkType }) {
  const loggedInContext = useContext(UserContext);
  const isLoggedIn = loggedInContext.loggedIn;

  function Bookmarkfunc() {
    const jwtToken = localStorage.getItem("ndau_user_token");

    if (jwtToken) {
      console.log(bookmarkVal, "bookmarkVal");
      console.log(bookmarkType, "bookmarkType");
      axios
        .post(
          `${api}/api/bookmark/bookmark`,
          { bookmark_value: bookmarkVal, bookmark_type: bookmarkType },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        )
        .then((res) => {
          console.log(res, "saved response");
        })
        .catch((e) => console.log(e, "error saving bookmark"));
    } else {
      console.log("not logged in");
    }
  }

  return (
    isLoggedIn && (
      <Button
        tip="Add to Watchlist"
        onClick={Bookmarkfunc}
        icon={<Favorite size="small" />}
        size="small"
      />
    )
  );
}

export default FavouriteButton;
