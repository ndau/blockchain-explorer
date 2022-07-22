/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import NdauDashboard from "./components/pages/ndauDashboard";
import Blocks from "./components/pages/blocks";
import Block from "./components/pages/block";
import Transaction from "./components/pages/transaction";
import Transactions from "./components/pages/transactions";
import Account from "./components/pages/account";
import FilteredTransactions from "./components/organisms/FilteredTransactions/FilteredTransactions";
import RegistrationPage from "./components/pages/Registration/RegistrationPage";
import LoginPage from "./components/pages/Login/LoginPage";
import Profile from "./components/pages/Profile/Profile";
import { UserContext } from "./context/context";
import { useEffect, useContext } from "react";
import axios from "axios";

const Routes = () => {
  const loggedInContext = useContext(UserContext);
  const updateLoggedIn = loggedInContext.updateLoggedIn;

  useEffect(() => {
    const rememberMeToken = localStorage.getItem("remember_user_token");
    if (rememberMeToken) {
      localStorage.setItem("ndau_user_token", rememberMeToken);
    }
    const jwtToken = localStorage.getItem("ndau_user_token");
    console.log(jwtToken, "jwtToken");
    axios
      .get("http://127.0.0.1:3001/api/user-profile-details", {
        headers: { authorization: jwtToken },
      })
      .then((res) => {
        console.log(res.data.email, "Routes");
        updateLoggedIn(true);
      });

    return () => {
      localStorage.removeItem("ndau_user_token");
    };
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={NdauDashboard} />
        <Route exact path="/blocks" component={Blocks} />
        <Route exact path="/block/:blockHeight" component={Block} />
        <Route
          exact
          path="/transaction/:transactionHash"
          component={Transaction}
        />
        <Route exact path="/transactions" component={Transactions} />
        <Route exact path="/account/:accountAddress" component={Account} />
        <Route
          exact
          path="/filteredTransactions"
          component={FilteredTransactions}
        />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/profile" component={Profile} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
