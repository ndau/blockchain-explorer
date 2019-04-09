import React, { Component } from 'react'
import { Text } from 'grommet';
import Details from '../../templates/details'
import DetailsCard from '../../molecules/detailsCard'
import { getAccountData } from '../../../helpers'

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: {},
    }

    this.getData();
  }

  render() {
    const { account } = this.state;
    console.log(account)

    if (!account) {
      return (
        <Details>
          <Text>No account data was retrieved.</Text>
        </Details>
      );
    }

    return (
      <Details>
        <Text as="h3">
          Account{' '}
          <Text weight="bold" as="em" style={{wordWrap: "break-word"}}>
            {account && account.address}
          </Text>
        </Text>

        {/* ACCOUNT DETAILS */}
        <DetailsCard data={account} keywordMap={this.keywordMap} />
      </Details>
    )
  }

  getData = () => {
    const { address } = this.props.match.params;
    getAccountData(address)
      .then(account => {
        this.setState({ account })
      })
  }

  keywordMap = {
    address: "address",
    balance: "balance",
    currencySeatDate: "currencySeat",
    delegationNode: "delegationNode",
    incomingRewardsFrom: "rewards",
    lastEAIUpdate: "EAI",
    lastWAAUpdate: "WAA",
    lock: "lock",// {noticePeriod: "1m", unlocksOn: null, bonus: 0}
    rewardsTarget: "reward",
    sequence: "sequence",
    settlementSettings: "settlement", // {period: "2d", changesAt: null, next: null}
    settlements: "settlement",
    stake: "stake", // {Point: "2019-02-26T00:28:44Z", Address: "ndahnsxr8zh7r6u685ka865wz77wb78xcn45rgskpeyiwuza"}
    validationKeys: "validationKey", 
    validationScript: "validationScript",
    weightedAverageAge: "weightedAverageAge",
  }
}

export default Account