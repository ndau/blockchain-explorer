import React from 'react'
import { Route, Switch } from "react-router-dom"
import NdauDashboard from './components/pages/ndauDashboard'
import Blocks from './components/pages/blocks'
import BlockDetails from './components/pages/blockDetails'
import Transactions from './components/pages/transactions'
import TransactionDetails from './components/pages/transactionDetails'

export default (
  <Switch>
    <Route exact path="/" component={NdauDashboard} />
    <Route path="/blocks" component={Blocks} />
    <Route path="/block/:blockHeight" component={BlockDetails} />
    <Route path="/block/:blockHeight/transactions" component={Transactions} />
    <Route path="/block/:blockHeight/transactions/:transactionHash" component={TransactionDetails} />
    {/* <Route component={NotFound} /> */}
  </Switch>
)