import axios from "axios";
import {
  Box,
  Spinner,
  Text,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";

import Page from "../../templates/page";
import nodeArray from "./ndaunode.json";
import React, { useContext } from "react";
import { UserContext } from "../../../context/context";
import api from "../../../api";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const UserBookmarks = () => {
  const history = useHistory();
  const [bookmarks, setBookmarks] = React.useState([]);
  const [accountsBookmarks, setAccountBookmarks] = React.useState([]);
  const [transectionBookmarks, settransectionBookmarks] = React.useState([]);

  const [loading, setLoading] = React.useState();
  const loggedInContext = useContext(UserContext);
  const isLoggedIn = loggedInContext.loggedIn;
  const jwtToken = localStorage.getItem("ndau_user_token");
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/user/bookmarks`, {
        headers: {
          Authorization: jwtToken,
        },
      })
      .then((val) => {
        setBookmarks(val.data.user_bookmarks.sort(bookmartsoring));
        settransectionBookmarks(
          val.data.user_bookmarks.filter(
            (val) => val.bookmark_type == "transaction"
          )
        );
        setAccountBookmarks(
          val.data.user_bookmarks.filter(
            (val) => val.bookmark_type == "account"
          )
        );
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);
  const bookmartsoring = (a, b) => {
    console.log(b.bookmark_type, a.bookmark_type);
    return a.bookmark_type.localeCompare(b.bookmark_type);
  };
  return (
    <>
    <Page>
      {loading ? (
        <Box align="center">
          <Spinner size="small" color="#F29A1D" />
        </Box>
      ) : bookmarks.length > 0 ? (
        <div style={{ width: "60%", margin: "auto" }}>
          {accountsBookmarks.length > 0 && (
            <Table border={"all"} size={'large'}>
              <TableHeader
                style={{
                  background:
                    "transparent linear-gradient(180deg, #093D60 0%, #132A47 100%) 0% 0% no-repeat padding-box",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: "10px 10px 0px 0px",
                  opacity: "1",
                }}
              >
                <TableRow>
                  <TableCell scope="col" border="bottom">
                    Bookmark Type
                  </TableCell>
                  <TableCell scope="col" border="bottom"        size='large'>
                    Bookmark Address
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountsBookmarks.map((val) => (
                  <>
                    <TableRow
                      style={{
                        color: "#F89D1C",
                        borderBottom: "1px solid #234065",
                        backgroundColor: "#132A47",
                      }}
                    >
                    
                        <TableCell style={{  width:"140px"}}>{val.bookmark_type}</TableCell>
                   
                      <TableCell
                             size='xlarge'
                        onClick={() =>
                          history.push(
                            val.bookmark_type == "account"
                              ? `/account/${val.bookmark_value}`
                              : `transaction/${val.bookmark_value}`
                          )
                        }
                      >
                        {val.bookmark_value}
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          )}
          {transectionBookmarks.length > 0 && (
            <Table border={"all"} style={{ marginTop: "20px" }} >
              <TableHeader
                style={{
                  background:
                    "transparent linear-gradient(180deg, #093D60 0%, #132A47 100%) 0% 0% no-repeat padding-box",
                  boxShadow: "0px 3px 6px #00000029",
                  borderRadius: "10px 10px 0px 0px",
                  opacity: "1",
                }}
              >
                <TableRow>
                  <TableCell scope="col" border="bottom" >
                    Bookmark Type
                  </TableCell>
                  <TableCell scope="col" border="bottom" size="small" >
                    Bookmark Address
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transectionBookmarks.map(
                  (val) =>
                    val.bookmark_type == "transaction" && (
                      <>
                        <TableRow
                          style={{
                          
                            color: "#F89D1C",
                            borderBottom: "1px solid #234065",
                            backgroundColor: "#132A47",
                          }}
                        >
                        
                            <TableCell style={{  width:"140px"}}>{val.bookmark_type}</TableCell>
                       
                          <TableCell
                        style={{width:"442px"}}
                            onClick={() =>
                              history.push(
                                val.bookmark_type == "account"
                                  ? `/account/${val.bookmark_value}`
                                  : `transaction/${val.bookmark_value}`
                              )
                            }
                          >
                            {val.bookmark_value}
                          </TableCell>
                        </TableRow>
                      </>
                    )
                )}
              </TableBody>
            </Table>
          )}
        </div>
      ) : (
        <Text alignSelf="center">No Bookmark added</Text>
      )}


    </Page>
    {/* /////////// */}
     </>
  );
};

export default UserBookmarks;
