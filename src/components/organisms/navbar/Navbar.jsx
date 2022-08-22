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
  Sidebar,
  Nav,
  Button,
  Layer,
  Menu,
  Text,
} from "grommet";

import LogoImg from "../../../img/ndau_orange_logo.png";
import { AppsRounded } from "grommet-icons";
import "./style.css";
import { NAVBAR_COLOR } from "../../../constants";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../context/context";
import styled from "styled-components";
import React, { useContext, useRef, useState } from "react";

const NavbarLink = (props) => {
  return (
    <>
      {!props.small && (
        <Anchor
          as={Link}
          to={props.to}
          size="small"
          margin={{ vertical: "medium", horizontal: "medium" }}
        >
          {props.children}
        </Anchor>
      )}
    </>
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
  const updateLoggedIn = loggedInContext.updateLoggedIn;
  const history = useHistory();

  return (
    <Nav
      direction="column"
      background="black"
      pad="medium"
      align="center"
      width={"60vw"}
      height={"100vh"}
    >
      <Box pad="small" align="center">
        <img src={LogoImg} style={{ width: "40%" }} alt="ndau-logo" />
      </Box>

      <NavbarLink margin="small" to="/">
        Home
      </NavbarLink>

      <NavbarLink margin="small" to="/about">
        About
      </NavbarLink>
      <NavbarLink margin="small" to="/blockchain">
        Blockchain
      </NavbarLink>
      <NavbarLink margin="small" to="/ndaunodes">
        Ndau Nodes
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
            style={{cursor:"pointer" }}
            margin={{ vertical: "medium", horizontal: "medium" }}
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
        <Box fill={true}>
          <Box
            className="Navbar"
            justify={screenSize === "small" ? "" : "center"}
            align={screenSize === "small" ? "center" : ""}
            direction={screenSize === "small" ? "column" : "row"}
          >
            <NavbarLink to="/" small={screenSize === "small"}>
              Home
            </NavbarLink>
            <NavbarLink to="/about" small={screenSize === "small"}>
              About
            </NavbarLink>
            <Box
              style={{ marginRight: screenSize === "small" ? "100px" : "0px" }}
              pad="small"
              height={"100%"}
            >
              {screenSize !== "small" && (
                <img src={LogoImg} style={{ height: "90%" }} alt="ndau-logo" />
              )}
            </Box>
            {screenSize === "small" && (
              <NavbarMenuButton
                currentDrawerState={navbarDrawerState}
                toggleDrawerStateFunc={setNavbarDrawerState}
              />
            )}
            {/* <NavbarLink to="/blocks" small={screenSize === "small"}>
              Blockchain
            </NavbarLink> */}
            {screenSize !== "small" ? (
            <StyledProfileMenu
                  dropAlign={{ top: "bottom", left: "left" }}
                  dropBackground={{ color: "#259", opacity: "weak" }}
                  margin={{ bottom: "14px" }}
                  icon={true}
                  label={<Text size="14px">     Blockchain</Text>}
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
                  ]}
                ></StyledProfileMenu>
                ): (
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
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default Navbar;
