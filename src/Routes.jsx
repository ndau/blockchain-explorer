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
import api from "./api";
import VerifyUser from "./components/pages/Registration/VerifyUser/VerifyUser";
import Ndaunodes from "./components/pages/ndaunodes/ndaunodes";
import userBookmarks from "./components/pages/userBookmarks/userBookmarks";

const Routes = () => {
  const loggedInContext = useContext(UserContext);
  const updateLoggedIn = loggedInContext.updateLoggedIn;

  useEffect(() => {
    const jwtToken = localStorage.getItem("ndau_user_token");
    if (jwtToken) {
      axios
        .get(`${api}/user/user-profile-details`, {
          headers: { authorization: jwtToken },
        })
        .then((res) => {
          updateLoggedIn(true);
        })
        .catch((e) => {
          console.log(e, "loginError");
        });
    }
  }, [updateLoggedIn]);

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
        <Route exact path="/ndaunodes" component={Ndaunodes} />{" "}
        <Route exact path="/userBookmarks" component={userBookmarks} />
        <Route path="/change-password/:token" component={ChangePassword} />
        <Route exact path="/verify-user/:token" component={VerifyUser} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/richlist" component={Richlist} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
