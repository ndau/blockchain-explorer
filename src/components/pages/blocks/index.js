import React, { Component } from 'react'
import { Text, DataTable, Anchor, CheckBox, Box } from 'grommet'
import Main from '../../templates/main'
import ColumnHeader from '../../molecules/columnHeader'
import {  BLOCK_RANGE } from '../../../constants.js'
import {
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
      filteredBlocks: [],
      hideEmpty: false,
      latestBlockHeight: null,
    }

    this.getData();
  }

  render() {
    const { blocks, filteredBlocks, hideEmpty } = this.state;
    const columns = this.getColumns(hideEmpty);

    return (
      <Main
        browserHistory={this.props.history}
        selectNode
      >
        <Box justify="between">
          <Text as="h2" header>Blocks</Text>
          <Box align="end">
            <CheckBox 
              checked={hideEmpty}
              label="hide empty blocks"
              onChange={this.toggleHideEmpty}
              reverse
            />
          </Box>
        </Box>

        <DataTable
          data={hideEmpty ? filteredBlocks : blocks}
          columns={columns} 
          onMore={this.loadMoreBlocks} 
        />
      </Main>
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      this.getData();
    }
  }

  getData = () => {
    getNodeStatus()
      .then(status => {
        if (!status) {
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
    if (blockRangeEnd <= 1) {
      return
    }
    
    getBlocks(null, blockRangeEnd, BLOCK_RANGE, true, null)
      .then(previousBlocks => {
        if (previousBlocks.length < 1) {
          return
        }

        console.log(`loading #${getBlockRangeStart(blockRangeEnd)} - #${blockRangeEnd}`)

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
      search: true,
      primary: true,
      render: ({height}) => (
        <Anchor href={`/block/${height}/${window.location.search}`} label={height} />
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
        />
      ),
      render: ({numberOfTransactions, height}) =>  {
        return (
          numberOfTransactions ?
          <Anchor 
            label={`${numberOfTransactions} `} 
            href={`/transactions/${window.location.search}`} 
          />
          :
          '0'
        )
      }
    }
  ]); 

  toggleHideEmpty = () => {
    this.setState(({hideEmpty, blocks}) => {
      const newHideEmpty = !hideEmpty;
      let filteredBlocks = [];

      if (newHideEmpty) {
        filteredBlocks = blocks.filter(block => block.numberOfTransactions)
      }
      
      return { 
        hideEmpty: newHideEmpty,
        filteredBlocks
      }
    })
  }
}

export default Blocks;