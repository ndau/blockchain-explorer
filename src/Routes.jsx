/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NdauDashboard from './components/pages/ndauDashboard';
import Blocks from './components/pages/blocks';
import Block, { loader as blockLoader } from './components/pages/block';
import Transaction, { loader as transactionLoader } from './components/pages/transaction';
import Transactions from './components/pages/transactions';
import Account, { loader as accountLoader}from './components/pages/account';
import FilteredTransactions from './components/organisms/FilteredTransactions/FilteredTransactions';
import RegistrationPage from './components/pages/Registration/RegistrationPage';
import LoginPage from './components/pages/Login/LoginPage';
import Profile from './components/pages/Profile/Profile';
import Richlist from './components/pages/Richlist/Richlist';
import ForgotPasswordPage from './components/pages/Login/ForgotPassword/ForgotPassword';
import ForgotPasswordSuccessful from './components/pages/Login/ForgotPassword/ForgotPasswordSuccessful/ForgotPasswordSuccessful';
import ChangePassword from './components/pages/Login/ForgotPassword/ChangePassword/ChangePassword';
import VerifyUser from './components/pages/Registration/VerifyUser/VerifyUser';
import Ndaunodes from './components/pages/ndaunodes/ndaunodes';
import UserBookmarks from './components/pages/userBookmarks/userBookmarks';
import NoMatch from './components/pages/NoMatch/NoMatch';

const Root = () => {
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NoMatch />,
    //loader: RootLoader,
    children: [
      {
        path: '/',
        element: <NdauDashboard />,
      },
      {
        path: '/blocks',
        element: <Blocks />,
      },
      {
        path: '/block/:blockHeight',
        loader: blockLoader,
        element: <Block />,
      },
      {
        path: '/transaction/:transactionHash',
        loader: transactionLoader,
        element: <Transaction />,
      },
      {
        path: '/transactions',
        element: <Transactions />,
      },
      {
        path: '/account/:accountAddress',
        loader: accountLoader,
        element: <Account />,
      },
      {
        path: '/filteredTransactions',
        element: <FilteredTransactions />,
      },
      {
        path: '/register',
        element: <RegistrationPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/login/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/login/forgot-password-successful',
        element: <ForgotPasswordSuccessful />,
      },
      {
        path: '/ndaunodes',
        element: <Ndaunodes />,
      },
      {
        path: '/userBookmarks',
        element: <UserBookmarks />,
      },
      {
        path: '/change-password/:token',
        element: <ChangePassword />,
      },
      {
        path: '/verify-user/:token',
        element: <VerifyUser />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/richlist',
        element: <Richlist />,
      },
    ],
  },
]);

export default router;
