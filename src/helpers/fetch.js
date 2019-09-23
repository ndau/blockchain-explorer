import axios from 'axios'
import qs from 'query-string'
import { HTTP_REQUEST_HEADER, DEFUALT_NODE_NAME, NODES_ENDPOINT } from '../constants.js';
import {
  formatBlock,
  formatBlocks,
  formatTransaction,
  formatAccount,
  formatPriceInfo
} from './format'


/////////////////////////////////////////
// BLOCK
/////////////////////////////////////////

export const getBlock = async (blockHeight) => {
  const blockEndpoint = `${await getNodeEndpoint()}/block/height/${blockHeight}`
  
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

export const getBlocks = async ({before, after, filter, limit}) => {
  const query = `?after=${after?after:'1'}&filter=${filter?'noempty':''}&limit=${limit?limit:''}`
  const blocksEndpoint = `${await getNodeEndpoint()}/block/before/${before}${query}`

  return axios.get(blocksEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const { last_height, block_metas } = response.data
    
      return {
        blocks: formatBlocks(block_metas),
        lastFetchedHeight: last_height,
        latestFetchedHeight: block_metas[0] && block_metas[0].header.height
      };
    })
    .catch(error => console.log(error))
}

export const pollForBlocks = ({after, filter, success}) => {
  let pollAfter = after
  const fetchNewBlocks = () => {
    getNodeStatus()
      .then(status => {
        if (!status) {
          return;
        }

        const currentBlockHeight = status.latest_block_height;
        const limit = currentBlockHeight - pollAfter

        if(limit > 0) {
          getBlocks({
            before: currentBlockHeight, 
            after: pollAfter, 
            filter, 
            limit
          })
            .then(({blocks}) => {
              getCurrentOrder()
                .then((order) => {
                  if(success) {
                    success(blocks, currentBlockHeight, order);
                    pollAfter = currentBlockHeight
                  } 
                })
            })
        }
      })
  }

  return fetchNewBlocks
}


/////////////////////////////////////////
// TRANSACTION
/////////////////////////////////////////

export const getTransaction = async (hash) => {
  const transactionHash = window.decodeURIComponent(hash);
  const transactionEndpoint = `${await getNodeEndpoint()}/transaction/detail/${window.encodeURIComponent(transactionHash)}`;

  return axios.get(transactionEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      return response.data && formatTransaction(response.data)
    })
}

export const getTransactions = (transactionHashes=[]) => { 
  const transactionRequests = transactionHashes.map(hash => {
    return getTransaction(hash);
  })
    
  return axios.all(transactionRequests);
}

export const getTransactionHashes = async (blockHeight) => {
  const transactionsEndpoint = `${await getNodeEndpoint()}/block/transactions/${blockHeight}`
  
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

export const getAllTransactions = () => {
  
}

/////////////////////////////////////////
// ACCOUNT
/////////////////////////////////////////

export const getAccount = async (address) => {
  const accountStateEndpoint = `${await getNodeEndpoint()}/account/account/${address}`

  return axios.get(accountStateEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const account =  {
        address,
        ...response.data[address]
      }

      return response.data[address] && formatAccount(account)
    })
    .catch(error => {
      return
    })
}

export const getAccountHistory = async (address) => {
  const accountHistoryEndpoint = `${await getNodeEndpoint()}/account/history/${address}`

  return axios.get(accountHistoryEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      let history = response.data && response.data.Items 
      return history
    })
}



/////////////////////////////////////////
// NODE
/////////////////////////////////////////

export const getNodeStatus = async (endpoint) => {
  const nodeEndpoint =  endpoint || await getNodeEndpoint();
  const statusEndpoint = `${nodeEndpoint}/node/status`;
  
  return axios.get(statusEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const status = response.data.sync_info;
      return status;
    })
    .catch(error => console.log(error))
}

export const getNodeEndpoint = async (node) => {
  const { location, history } = window
  let query = qs.parse(location.search)
  let nodeName = node || query.node

  if (validURL(window.decodeURI(nodeName))) {
    return window.decodeURI(nodeName)
  }
  else {
    let nodeEndpoint
    if(!query || !query.node) {
      nodeName = DEFUALT_NODE_NAME
      query = {node: nodeName}
      const newSearch = `?${qs.stringify(query)}`
      const validURL = `${location.origin}${location.pathname}${newSearch}`
      history.replaceState({}, "", validURL)
    }
    
    await axios.get(NODES_ENDPOINT, HTTP_REQUEST_HEADER)
      .then(response => {
        const { networks } = response.data
        const nodeKey = networks[nodeName] ? nodeName : DEFUALT_NODE_NAME
        const nodes = networks[nodeKey] && networks[nodeKey]["nodes"]
        const randomNodeIndex = nodes && Math.floor(Math.random() * Object.keys(nodes).length)
        const randomNode = Object.values(nodes)[randomNodeIndex]
        nodeEndpoint = randomNode && randomNode.api
      })

    return "https://" + nodeEndpoint
  }
}

/////////////////////////////////////////
// ORDER
/////////////////////////////////////////

export const getCurrentOrder = async () => {
  const priceEndpoint = `${await getNodeEndpoint()}/price/current`

  return axios.get(priceEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      return formatPriceInfo(response.data);
    })
    .catch(error => console.log(error))
}

//
export const validURL = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}