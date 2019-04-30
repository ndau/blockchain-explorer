import axios from 'axios'
import qs from 'query-string'
import { HTTP_REQUEST_HEADER, DEFUALT_NODE_ENDPOINT } from '../constants.js';
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
  const blockEndpoint = `${getNodeEndpoint()}/block/height/${blockHeight}`
  
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

export const getBlocks = (latestBlockHeight, noEmpty, limit) => {
  const query = `?filter=${noEmpty ? 'noempty' : ''}&limit=${limit ? limit : ''}`
  const blocksEndpoint = `${getNodeEndpoint()}/block/before/${latestBlockHeight}${query}`

  return axios.get(blocksEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const { last_height, block_metas } = response.data
    
      return {
        blocks: formatBlocks(block_metas),
        lastFetchedHeight: last_height
      };
    })
    .catch(error => console.log(error))
}

export const pollForBlocks = (latestBlockHeight, noEmpty, maximum, success) => {
  let currentLatestBlockHeight = latestBlockHeight
  const fetchNewBlocks = () => {
    getNodeStatus()
      .then(status => {
        if (!status) {
          return;
        }

        const newLatestBlockHeight = status.latest_block_height;
        if(newLatestBlockHeight > currentLatestBlockHeight) {
          const limit = maximum ? maximum : newLatestBlockHeight - currentLatestBlockHeight;
          getBlocks(newLatestBlockHeight, noEmpty, limit)
            .then(({blocks}) => {
              
              getCurrentOrder()
                .then((order={}) => {
                  if(success) {
                    success(blocks, newLatestBlockHeight, order);
                  } 
                })
            })
        }

        currentLatestBlockHeight = newLatestBlockHeight
      })
  }

  return fetchNewBlocks

  // window.setInterval(fetchNewBlocks, POLL_INTERVAL);
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
      // TODO: FAIL SAFE
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

export const getAccountHistory = (address) => {
  const accountHistoryEndpoint = `${getNodeEndpoint()}/account/history/${address}`

  return axios.get(accountHistoryEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const history = response.data.Items;
      return history
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