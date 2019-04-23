import React, { Component } from 'react'
import { 
  Box, DataTable, ResponsiveContext, Text, CheckBox
} from 'grommet'
import Anchor from '../../atoms/anchor'
import Main from '../../templates/main'
import ColumnHeader from '../../molecules/columnHeader'
import TableData from '../../molecules/tableData'
import Age from '../../atoms/age'
import { BLOCK_RANGE } from '../../../constants.js'
import {
  getNodeStatus,
  getBlockRangeStart,
  getBlocks,
  pollForBlocks,
} from '../../../helpers/fetch'
import './style.css'

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

    return (
      <Main
        browserHistory={this.props.history}
        selectNode
      >
        <Box margin={{bottom: "20px"}}>
          <Text size="large" weight="bold">
            Blocks{' '}
            {/* hide empty toggle is not fully functional */}
            <Text
              size="xsmall"
              color="#aaa"
              weight="normal"
              style={{float: "right"}}
            >
              <CheckBox
                toggle
                checked={hideEmpty}
                label="hide empty blocks"
                onChange={this.toggleHideEmpty}
                reverse
                name="small"

              />
            </Text>
          </Text>
        </Box>
        <ResponsiveContext.Consumer>
          {
            screenSize => {
              return (
                <DataTable
                  data={hideEmpty ? filteredBlocks : blocks}
                  columns={this.screenColumns(screenSize)}
                  onMore={this.loadMoreBlocks}
                  size="medium"
                  className="dataTable"
                />
              )
            }
          }
        </ResponsiveContext.Consumer>
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

    this.setState({ loading: true })

    getBlocks(null, blockRangeEnd, BLOCK_RANGE, true, null)
      .then(previousBlocks => {
        if (previousBlocks.length < 1) {
          return
        }

        const earliestBlock = previousBlocks[previousBlocks.length - 1];
        this.setState(({ blocks }) => {
          return {
            blocks: [...blocks, ...previousBlocks],
            earliestBlockHeight:  earliestBlock && earliestBlock.height,
            loading: false
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
  
  screenColumns = (screenSize) => {
    const { height, age, time, txns } = this.columns
    if (screenSize === "small") {
      return [height, age, txns];
    }

    return [ height, age, time, txns ];
  }

  columns = {
    "height": {
      property: "height",
      header: <ColumnHeader>Height</ColumnHeader>,
      align: "center",
      // search: true,
      primary: true,
      render: ({height}) => (
        <TableData>
          <Anchor
            label={height}
            href={`/block/${height}`}
          />
        </TableData>

      ),
    },
    "age": {
      property: "age",
      header: <ColumnHeader>Age</ColumnHeader>,
      align: "center",
      render: ({timestamp}) => (
        <TableData>
          <Age timestamp={timestamp} />
        </TableData>
      )
    },
    "time": {
      property: "time",
      align: "center",
      header:  <ColumnHeader>Timestamp</ColumnHeader>,
      render: ({time}) => <TableData>{time}</TableData>
    },
    "txns": {
      property: "txns",
      align: "center",
      header: <ColumnHeader>Txns</ColumnHeader>,
      render: ({numberOfTransactions, height}) =>  {
        return (
          <TableData>
            {
              numberOfTransactions ?
              <Anchor
                label={`${numberOfTransactions} `}
                href={`/block/${height}`}
              />
              :
              '0'
            }
          </TableData>

        )
      }
    }
  };

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
