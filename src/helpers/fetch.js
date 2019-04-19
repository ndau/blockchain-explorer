import axios from 'axios'
import qs from 'query-string'
import { HTTP_REQUEST_HEADER,  POLL_INTERVAL, DEFUALT_NODE_ENDPOINT } from '../constants.js';
import {
  formatBlock,
  formatBlocks,
  formatTransaction,
  formatAccount,
} from './format'


/////////////////////////////////////////
// BLOCK
/////////////////////////////////////////

export const getBlock = (blockHeight) => {
  const blockEndpoint = `${getNodeEndpoint()}/block/height/${blockHeight}/?noempty=`
  
  return axios.get(blockEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const block = response.data.block;
      return formatBlock(block);
    })
    .catch(error => {
      console.log(error)
      return;
    })
}

export const getBlocks = (blockRangeStart, blockRangeEnd, maximum) => {
  const interval = maximum > 1 ? maximum - 1 : 1;
  const _blockRangeStart = blockRangeStart || getBlockRangeStart(blockRangeEnd, interval);
  const blocksEndpoint = `${getNodeEndpoint()}/block/range/${_blockRangeStart}/${blockRangeEnd}`;

  return axios.get(blocksEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const blocks = response.data.block_metas || [];
      return formatBlocks(blocks);
    })
    .catch(error => console.log(error))
}

export const pollForBlocks = (lastBlockHeight, maximum, success, noEmpty) => {
  let lastHeight = lastBlockHeight;
  const fetchNewBlocks = () => {
    getNodeStatus()
      .then(status => {
        if (!status) {
          return;
        }

        const newHeight = status.latest_block_height;
        if(newHeight > lastHeight) {
          const blockRangeEnd = newHeight;

          getBlocks(null, blockRangeEnd, maximum)
            .then(newBlocks => {
              lastHeight = status.latest_block_height
              getCurrentOrder()
                .then((order={}) => {
                  if(success) {
                    success(newBlocks, blockRangeEnd);
                  } 
                })
              
            })
        }
      })
  }

  window.setInterval(fetchNewBlocks, POLL_INTERVAL);
}

export const getBlockRangeStart = (blockRangeEnd, interval=100) => {
  let blockRangeStart = parseInt(blockRangeEnd) - interval;
  return blockRangeStart > 0 ? blockRangeStart : 1;
}


/////////////////////////////////////////
// TRANSACTION
/////////////////////////////////////////

export const getTransaction = (hash) => {
  const transactionHash = window.decodeURIComponent(hash);
  const transactionEndpoint = `${getNodeEndpoint()}/transaction/${window.encodeURIComponent(transactionHash)}`;

  return axios.get(transactionEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      return response.data && formatTransaction(response.data.Tx, { hash: transactionHash });
    })
}

export const getTransactions = (transactionHashes=[]) => { 
  const transactionRequests = transactionHashes.map(hash => {
    return getTransaction(hash);
  })
    
  return axios.all(transactionRequests);
}

export const getTransactionHashes = (blockHeight) => {
  const transactionsEndpoint = `${getNodeEndpoint()}/block/transactions/${blockHeight}`
  
  return axios.get(transactionsEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const hashes = response.data;
      return hashes;
    })
    .catch(error => {
      console.log(error)
      return;
    })
}

export const getBlockTransactions = (blockHeight) => { 
  return getTransactionHashes(blockHeight)
    .then(hashes => {
      return getTransactions(hashes)
    })
}


/////////////////////////////////////////
// ACCOUNT
/////////////////////////////////////////

export const getAccount = (address) => {
  const accountStateEndpoint = `${getNodeEndpoint()}/account/account/${address}`

  return axios.get(accountStateEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const account =  {
        address,
        ...response.data[address]
      }

      return formatAccount(account)
    })
}


/////////////////////////////////////////
// NODE
/////////////////////////////////////////

export const getNodeStatus = (endpoint) => {
  const baseEndpoint = endpoint || getNodeEndpoint();
  const statusEndpoint = `${baseEndpoint}/node/status`;
  
  return axios.get(statusEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const status = response.data.sync_info;
      return status;
    })
    .catch(error => console.log(error))
}

export const getNodeEndpoint = () => {
  const query = qs.parse(window.location.search);
  const nodeEndpoint = query.node;
  if (nodeEndpoint) {
    return nodeEndpoint
  }
  // set node endpoint to default node if not present
  else {
    query.node = DEFUALT_NODE_ENDPOINT;
    window.location.search = `?${qs.stringify(query)}`
  }
}


/////////////////////////////////////////
// ORDER
/////////////////////////////////////////

export const getCurrentOrder = () => {
  const statusEndpoint = `${getNodeEndpoint()}/order/current`;
  return axios.get(statusEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error))
}