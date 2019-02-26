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

    if (!account) {
      return (
        <Details>
          <Text>No account data was retrieved.</Text>
        </Details>
      );
    }

    return (
      <Details>
        <Text as="span" weight="bold" truncate>
          Account {account && account.address && `#${account.address}`}
        </Text>

        {/* ACCOUNT DETAILS */}
        <DetailsCard data={account} />
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
}

export default Account