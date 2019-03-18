import React, { Component } from 'react'
import { Text, DataTable, Anchor, CheckBox, Box,  } from 'grommet'
import Main from '../../templates/main'
import TableHeader from '../../molecules/tableHeader'
import TableData from '../../molecules/tableData'
import Age from '../../atoms/age'
import { BLOCK_RANGE } from '../../../constants.js'
import {
  getNodeStatus,
  getBlockRangeStart,
  getBlocks,
  pollForBlocks,
  makeURLQuery
} from '../../../helpers'

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
          <h3
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            Blocks
            <Text
              size="xsmall"
              color="#aaa"
              weight="normal"
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
          </h3>
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

  getColumns = (hideEmpty) => ([
    {
      property: "height",
      header: <TableHeader>Height</TableHeader>,
      align: "center",
      // search: true,
      primary: true,
      render: ({height}) => (
        <TableData>
          <Anchor
            label={height}
            href={`/block/${height}/${makeURLQuery()}`}
          />
        </TableData>

      ),
    },
    {
      property: "age",
      header: <TableHeader>Age</TableHeader>,
      align: "center",
      render: ({timestamp}) => (
        <TableData>
          <Age timestamp={timestamp} />
        </TableData>
      )
    },
    {
      property: "time",
      align: "center",
      header:  <TableHeader>Timestamp</TableHeader>,
      render: ({time}) => <TableData>{time}</TableData>
    },
    {
      property: "txns",
      align: "center",
      header: <TableHeader>Txns</TableHeader>,
      render: ({numberOfTransactions, height}) =>  {
        return (
          <TableData>
            {
              numberOfTransactions ?
              <Anchor
                label={`${numberOfTransactions} `}
                href={`/block/${height}/${makeURLQuery()}`}
              />
              :
              '0'
            }
          </TableData>

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
