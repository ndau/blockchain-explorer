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
  Collapsible,
  Sidebar,
  Nav,
  Button,
} from "grommet";
import Container from "../../atoms/container";

import LogoImg from "../../../img/ndau_orange_logo.png";
import BlockchainSearch from "../../molecules/blockchainSearch";
import BookmarkMenu from "../../molecules/bookmarkMenu";
import { AppsRounded } from "grommet-icons";

import { NAVBAR_COLOR } from "../../../constants";
import React, { useState } from "react";

import "./style.css";

const NavbarLink = (props) => {
  return (
    <ResponsiveContext.Consumer>
      {(screenSize) =>
        screenSize !== "small" && (
          <Anchor
            size="small"
            margin={{ vertical: "medium", horizontal: "medium" }}
          >
            {props.children}
          </Anchor>
        )
      }
    </ResponsiveContext.Consumer>
  );
};

const NavbarMenuButton = (props) => {
  let toggleDrawerStateFunc = props.toggleDrawerStateFunc;
  let currentDrawerState = props.currentDrawerState;

  return (
    <Button
      margin={{ right: "xlarge" }}
      onClick={() => {
        toggleDrawerStateFunc(!currentDrawerState);
      }}
      icon={<AppsRounded />}
    ></Button>
  );
};

const SideBar = (props) => {
  return (
    <Sidebar className="sidebar">
      <Nav direction="column" background="black" pad="medium" align="center">
        <Box pad="small" width={"100%"} align="center">
          <img src={LogoImg} style={{ width: "60%" }} alt="ndau-logo" />
        </Box>

        <Anchor margin="small">Home</Anchor>
        <Anchor margin="small">About</Anchor>
        <Anchor margin="small">Blockchain</Anchor>
        <Anchor margin="small">Sign In</Anchor>
      </Nav>
    </Sidebar>
  );
};

const Navbar = (props) => {
  const [navbarDrawerState, setNavbarDrawerState] = useState(false);

  const background = props.background || NAVBAR_COLOR;

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
            <NavbarLink>Home</NavbarLink>
            <NavbarLink>About</NavbarLink>

            <Box
              style={{ marginRight: screenSize === "small" ? "100px" : "0px" }}
              pad="small"
              height={"100%"}
            >
              <img src={LogoImg} style={{ height: "90%" }} alt="ndau-logo" />
            </Box>

            {screenSize === "small" && (
              <NavbarMenuButton
                currentDrawerState={navbarDrawerState}
                toggleDrawerStateFunc={setNavbarDrawerState}
              />
            )}

            <NavbarLink>Blockchain</NavbarLink>
            <NavbarLink>Sign in</NavbarLink>
          </Box>

          <Collapsible open={navbarDrawerState}>
            <SideBar />
          </Collapsible>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default Navbar;
