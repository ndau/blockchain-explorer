import React from 'react'
import { Route, Switch } from "react-router-dom"
import NdauDashboard from './components/pages/ndauDashboard'
import Blocks from './components/pages/blocks'
import Block from './components/pages/block'
import Transactions from './components/pages/transactions'
import Transaction from './components/pages/transaction'

export default (
  <Switch>
    <Route exact path="/" component={NdauDashboard} />
    <Route exact path="/block/:blockHeight" component={Block} />
    <Route exact path="/blocks" component={Blocks} />
    <Route exact path="/transaction/:transactionHash" component={Transaction} />
    <Route exact path="/transactions" component={Transactions} />
    
    {/* <Route component={NotFound} /> */}
  </Switch>
)