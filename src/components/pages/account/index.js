import React, { Component } from 'react'
import { Box, Text, Collapsible, CheckBox } from 'grommet';
import Details from '../../templates/details'
import DetailsCard from '../../molecules/detailsCard'
import AccountTimeline from '../../organisms/accountTimeline'
import { getAccount, getAccountHistory } from '../../../helpers/fetch'

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: {},
      history: null,
      hideDetails: false
    }

    this.getData();

    // window.setTimeout(this.toggleShowDetails, 500)
  }

  render() {
    const { account, history, hideDetails } = this.state
    const showDetails = !hideDetails

    if (!account) {
      return (
        <Details browserHistory={this.props.history}>
          <Text>No account data was retrieved.</Text>
        </Details>
      );
    }

    return (
      <Details browserHistory={this.props.history}>
        <Box margin={{bottom: "20px"}}>
          <Text size="large">
            {/* hide empty toggle is not fully functional */}
            <Text
              size="xsmall"
              color="#aaa"
              weight="normal"
              style={{float: "right"}}
            >
              <CheckBox
                toggle
                checked={hideDetails}
                label="hide details"
                onChange={this.toggleShowDetails}
                reverse
                name="small"

              />
            </Text>
            <Text>
              Account{' '}
              <Text weight="bold" as="em" style={{wordWrap: "break-word"}}>
                {account && account.address}
              </Text>
            </Text>
          </Text>
        </Box>

        <Collapsible open={showDetails}>
          <Box 
            animation={
              showDetails ? 'fadeIn' : {
                "type": "fadeOut",
                "delay": 0,
                "duration": 100,
              }
            }
          >
            {/* ACCOUNT DETAILS */}
            <DetailsCard data={account} keywordMap={this.keywordMap} />
          </Box>
        </Collapsible>

        
        <Box>
          <Text>
            <b>History{showDetails && ':'}</b>
          </Text>
        </Box>
        <Box 
          style={showDetails ? {
            margin: "10px 0px 0px 15px",
            paddingLeft: "11px",
            borderLeft: "1px solid rgba(255,255, 255, 0.3)",
          }:{}}  
        >
          <AccountTimeline 
            events={history && [...history].reverse()} 
            fill={hideDetails} 
          />
        </Box>
      </Details>
    )
  }

  getData = () => {
    const { address } = this.props.match.params;
    getAccount(address)
      .then(account => {
        this.setState({ account })

        return account.address
      })
      .then(address => {
        getAccountHistory(address)
          .then(history => {
            this.setState({ history });
          })
      })   
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      this.setState(this.getData)
    }
  }

  toggleShowDetails = () => {
    this.setState(({hideDetails}) => {
      return { hideDetails: !hideDetails }
    })
  }

  keywordMap = {
    address: "address",
    balance: "balance",
    currencySeatDate: "currencySeat",
    delegationNode: "node",
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
    weightedAverageAge: "WAA",
  }
}

export default Account