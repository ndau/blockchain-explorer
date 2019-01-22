import React, { Component } from 'react'
import { DataTable, Anchor } from "grommet";
import Main from '../../templates/main'
import ColumnHeader from '../../molecules/columnHeader'
import {
  POLL_INTERVAL, MAX_FETCH_ATTEMPT, BLOCK_RANGE
} from '../../../constants.js'
import {
  formatBlocks,
  getNodeStatus,
  getBlockRangeStart,
  getBlocks,
  pollForBlocks
} from '../../../helpers.js'

class Blocks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
      hideEmpty: false,
      latestBlockHeight: null,
    }
  }

  render() {
    const { blocks, hideEmpty } = this.state;
    const blockData = formatBlocks(blocks, hideEmpty);
    const columns = this.getColumns(hideEmpty);

    return (
      <Main>
        <h2>Blocks</h2>
        <DataTable data={blockData} columns={columns} onMore={this.loadMoreBlocks} />
      </Main>
    )
  }

  componentDidMount() {
    this.getData();
  }

  getData = (attemps) => {
    let counter = attemps || 0;

    if(counter >= MAX_FETCH_ATTEMPT) {
      console.log(`checked node status ${counter} times, quitting...`)
      return null
    }

    getNodeStatus()
      .then(status => {
        if (!status) {
          console.log('API is probaby down, checking again..')
          setTimeout(() => this.getData(counter+1), POLL_INTERVAL);
          return null
        }

        const blockRangeEnd = status.latest_block_height;
        getBlocks(null, blockRangeEnd, BLOCK_RANGE)
          .then(blocks => {
            this.setState({
              blocks,
              nodeStatus: status,
              earliestBlockHeight: getBlockRangeStart(blockRangeEnd, BLOCK_RANGE)
            })

            pollForBlocks(blockRangeEnd, BLOCK_RANGE, this.resetData);
          })
      })
  }

  loadMoreBlocks = () => {
    const { earliestBlockHeight } = this.state
    if (!earliestBlockHeight || earliestBlockHeight < 1) {
      return
    }

    const blockRangeEnd = earliestBlockHeight - 1 || 1;
    getBlocks(null, blockRangeEnd, BLOCK_RANGE)
      .then(previousBlocks => {
        if (previousBlocks.length < 1) {
          return
        }

        const earliestBlock = previousBlocks[previousBlocks.length - 1];
        this.setState(({ blocks }) => {
          return {
            blocks: [...blocks, ...previousBlocks],
            earliestBlockHeight:  earliestBlock && earliestBlock.height,
          }
        })
      })
  }
  
  resetData = (newBlocks=[], newStatus, latestBlockHeight) => {  
    this.setState(({blocks=[]}) => {
      console.log(`FOUND ${newBlocks.length} new block(s)!`)
      return {
        blocks: [...newBlocks, ...blocks],
        nodeStatus: newStatus,
        latestBlockHeight,
      }
    })
  }

  getColumns = (hideEmpty) => ([
    {
      property: "height",
      header: "Height",
      // search: true,
      primary: true,
      render: ({height}) => (
        <Anchor href={`/block/${height}`} label={height} />
      ),
    },
    {
      property: "time",
      header: "Timestamp",
    },
    {
      property: "age",
      header: "Age"
    },
    {
      property: "txns",
      header: (
        <ColumnHeader
          header="Transactions"
          checkboxProps={{
            checked: hideEmpty,
            onChange: this.toggleHideEmpty,
            label: "hide empty",
          }}
        />
      ),
      render: ({transactions, height}) =>  {
        return (
          transactions ?
          <Anchor href={`/transactions/?block=${height}`} label={`${transactions} `} />
          :
          'None'
        )
      }
    }
  ]); 

  toggleHideEmpty = () => {
    this.setState(({hideEmpty}) => ({ hideEmpty: !hideEmpty }))
  }
}

export default Blocks;