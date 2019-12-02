import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom"
import NdauDashboard from './components/pages/ndauDashboard'
import Blocks from './components/pages/blocks'
import Block from './components/pages/block'
import Transaction from './components/pages/transaction'
import Transactions from './components/pages/transactions'
import Account from './components/pages/account'

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={NdauDashboard} />
      <Route exact path="/blocks" component={Blocks} />
      <Route exact path="/block/:blockHeight" component={Block} />
      <Route exact path="/transaction/:transactionHash" component={Transaction} />
      <Route exact path="/transactions" component={Transactions} /> 
      <Route exact path="/account/:accountAddress" component={Account} />

      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>
)