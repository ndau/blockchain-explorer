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
import Richlist from "./components/pages/Richlist/Richlist";
import ForgotPasswordPage from "./components/pages/Login/ForgotPassword/ForgotPassword";
import ForgotPasswordSuccessful from "./components/pages/Login/ForgotPassword/ForgotPasswordSuccessful/ForgotPasswordSuccessful";
import ChangePassword from "./components/pages/Login/ForgotPassword/ChangePassword/ChangePassword";
import { UserContext } from "./context/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    if (jwtToken) {
      axios
        .get("http://127.0.0.1:3001/api/user/user-profile-details", {
          headers: { authorization: jwtToken },
        })
        .then((res) => {
          updateLoggedIn(true);
        });
    }
    return () => {
      localStorage.removeItem("ndau_user_token");
    };
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
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
        <Route
          exact
          path="/login/forgot-password"
          component={ForgotPasswordPage}
        />
        <Route
          exact
          path="/login/forgot-password-successful"
          component={ForgotPasswordSuccessful}
        />
        <Route path="/change-password/:token" component={ChangePassword} />

        <Route exact path="/profile" component={Profile} />
        <Route exact path="/richlist" component={Richlist} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
