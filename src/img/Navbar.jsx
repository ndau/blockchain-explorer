/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import {
  Box,
  Anchor,
  ResponsiveContext,
  Nav,
  Button,
  Layer,
  Menu,
  Text,
} from "grommet";

import LogoImg from "../../../img/ndau_orange_logo.png";
import twitterImg from "../../../img/"
import { AppsRounded } from "grommet-icons";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../context/context";
import styled from "styled-components";
import React, { useContext, useState } from "react";

const NavbarLink = (props) => {
  return (
    <Box align="center" justify="center">
      {!props.small && (
        <Anchor as={Link} to={props.to} size="small">
          {props.children}
        </Anchor>
      )}
    </Box>
  );
};

const NavbarMenuButton = (props) => {
  let toggleDrawerStateFunc = props.toggleDrawerStateFunc;
  let currentDrawerState = props.currentDrawerState;

  return (
    <Button
      onClick={() => {
        toggleDrawerStateFunc(!currentDrawerState);
      }}
      icon={<AppsRounded />}
    ></Button>
  );
};

const SideBar = (props) => {
  const loggedInContext = useContext(UserContext);
  const isLoggedIn = loggedInContext.loggedIn;

  return (
    <Nav
      direction="column"
      background="black"
      pad="medium"
      align="center"
      width={"60vw"}
      height={"100vh"}
    >
      <Box pad="small" align="center" justify="center">
        <img src={LogoImg} style={{ width: "30%" }} alt="ndau-logo" />
      </Box>

      <NavbarLink margin="small" to="/">
        Home
      </NavbarLink>

      <Anchor
        href="https://ndau.io"
        size="small"
        target={"_blank"}
        rel="_noopener"
      >
        About
      </Anchor>

      <NavbarLink margin="small" to="/blockchain">
        Blockchain
      </NavbarLink>
      <NavbarLink margin="small" to="/ndaunodes">
        Ndau Nodes
      </NavbarLink>
      <NavbarLink margin="small" to="/richlist">
        Rich List
      </NavbarLink>
      {isLoggedIn ? (
        <>
          <NavbarLink margin="small" to="/profile">
            Profile
          </NavbarLink>
          <NavbarLink margin="small" to="/userBookmarks">
            Bookmarks
          </NavbarLink>
          <Text
            size="14px"
            style={{ cursor: "pointer" }}
            color={"#D32"}
            weight="600"
          >
            Sign Out
          </Text>
        </>
      ) : (
        <NavbarLink to="/login">Login</NavbarLink>
      )}
    </Nav>
  );
};

const StyledProfileMenu = styled(Menu)`
  color: #f99d1c;
  font-weight: 600;
  line-height: 20px;
`;

const Navbar = (props) => {
  const loggedInContext = useContext(UserContext);
  const isLoggedIn = loggedInContext.loggedIn;
  const updateLoggedIn = loggedInContext.updateLoggedIn;

  const history = useHistory();

  const [navbarDrawerState, setNavbarDrawerState] = useState(false);

  return (
    <ResponsiveContext.Consumer>
      {(screenSize) => (
        <Box
          className="Navbar"
          align={screenSize === "small" ? "center" : ""}
          justify="between"
          direction={screenSize === "small" ? "column" : "row"}
        >
          <Box
            basis={"1/2"}
            direction={screenSize === "small" ? "column" : "row"}
            justify="around"
            align="center"
          >
            <Box style={{ height: "100%" }} pad="medium">
              {screenSize !== "small" && (
                <img src={LogoImg} style={{ height: "100%" }} alt="ndau-logo" />
              )}
            </Box>

            <NavbarLink to="/" small={screenSize === "small"}>
              Home
            </NavbarLink>

            {screenSize !== "small" && (
              <Box align="center" justify="center">
                <Anchor
                  href="https://ndau.io"
                  size="small"
                  target={"_blank"}
                  rel="_noopener"
                >
                  About
                </Anchor>
              </Box>
            )}

            {screenSize !== "small" ? (
              <StyledProfileMenu
                dropAlign={{ top: "bottom", left: "left" }}
                dropBackground={{ color: "#259", opacity: "weak" }}
                margin={{ bottom: "14px" }}
                icon={true}
                label={<Text size="14px"> Blockchain</Text>}
                items={[
                  {
                    label: (
                      <Text weight={1000} size="xsmall" color={"#F6931D"}>
                        Blockchain
                      </Text>
                    ),
                    onClick: () => {
                      history.push("/blocks");
                    },
                  },
                  {
                    label: (
                      <Text weight={1000} size="xsmall" color={"#F6931D"}>
                        Ndau Nodes
                      </Text>
                    ),
                    onClick: () => {
                      history.push("/ndaunodes");
                    },
                  },
                  {
                    label: (
                      <Text weight={1000} size="xsmall" color={"#F6931D"}>
                        Rich List
                      </Text>
                    ),
                    onClick: () => {
                      history.push("/richlist");
                    },
                  },
                ]}
              ></StyledProfileMenu>
            ) : (
              ""
            )}

            {screenSize !== "small" ? (
              isLoggedIn ? (
                <StyledProfileMenu
                  dropAlign={{ top: "bottom", left: "left" }}
                  dropBackground={{ color: "#259", opacity: "weak" }}
                  margin={{ bottom: "14px" }}
                  icon={true}
                  label={<Text size="14px">Profile</Text>}
                  items={[
                    {
                      label: (
                        <Text weight={1000} size="xsmall" color={"#F6931D"}>
                          Profile
                        </Text>
                      ),
                      onClick: () => {
                        history.push("/profile");
                      },
                    },
                    {
                      label: (
                        <Text weight={1000} size="xsmall" color={"#F6931D"}>
                          Bookmarks
                        </Text>
                      ),
                      onClick: () => {
                        history.push("/userBookmarks");
                      },
                    },
                    {
                      label: (
                        <Text weight={1000} size="xsmall" color={"#D32"}>
                          Sign Out
                        </Text>
                      ),
                      onClick: () => {
                        localStorage.clear();
                        updateLoggedIn(false);
                      },
                    },
                  ]}
                ></StyledProfileMenu>
              ) : (
                <NavbarLink to="/login">Login</NavbarLink>
              )
            ) : (
              ""
            )}
          </Box>

          {screenSize === "small" && (
            <NavbarMenuButton
              currentDrawerState={navbarDrawerState}
              toggleDrawerStateFunc={setNavbarDrawerState}
            />
          )}

          {navbarDrawerState && (
            <Box>
              <Layer
                animation={false}
                position="top-right"
                responsive={false}
                onEsc={() => setNavbarDrawerState(false)}
                onClickOutside={() => setNavbarDrawerState(false)}
                background={{
                  color: "black",
                  opacity: "medium",
                }}
              >
                <SideBar></SideBar>
              </Layer>
            </Box>
          )}

          {screenSize !== "small" ? (
            <Box
              basis={"small"}
              direction={screenSize === "small" ? "column" : "row"}
              justify="around"
              align="center"
            >
              <Anchor
                href="https://twitter.com/ndaucollective"
                target={"_blank"}
              >
                <img src="twitter_icon.svg" />
              </Anchor>

              <Anchor href="https://t.me/ndau_community" target={"_blank"}>
                <img src="telegram_icon.svg" />
              </Anchor>

              <Anchor href="https://github.com/ndau" target={"_blank"}>
                <img src="github_icon.svg" />
              </Anchor>
            </Box>
          ) : (
            ""
          )}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default Navbar;
