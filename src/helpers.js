import msgpack from 'msgpack-lite';
import axios from 'axios';
import moment from 'moment';
import { NDAU_ENDPOINT, HTTP_REQUEST_HEADER,  POLL_INTERVAL } from './constants.js';

export const b64MsgPackToObj = b64data => {
  var raw = window.atob(b64data)
  var rawLength = raw.length
  var array = new Uint8Array(new ArrayBuffer(rawLength))

  for (var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i)
  }

  var obj = msgpack.decode(array)
  return obj
}

export const formatBlocks = (blocks, hideEmpty) => {
  if(!blocks) {
    return;
  }

  const formattedBlocks = [];
  for(const block of blocks) {
    if (hideEmpty && !block.header.num_txs) {
      return
    }

    const {
      header: { height, num_txs, time },
      block_id: { hash }
    } = block;

    const formattedBlock = {
      height,
      age: moment(time).fromNow(),
      transactions: num_txs,
      hash,
      time: moment(time).format('YYYY MM DD'),
    };

    formattedBlocks.push(formattedBlock);
  }

  return formattedBlocks;
}

export const formatTransactions = (transactions, blockHeight) => {
  if(!transactions) {
    return;
  }
  
  const formattedTransactions = [];

  for (const transaction of transactions) {
    let transactionData = b64MsgPackToObj(transaction)
    console.log(transactionData)
    const { 
      TransactableID,
      Transactable: { tgt: target, qty: quantity} 
    } = transactionData;
    
    const formattedTransaction = {
      index: TransactableID,
      target,
      quantity,
      blockHeight,
    }

    formattedTransactions.push(formattedTransaction)
  }

  return formattedTransactions
}

export const getTransactions = (blockHeight) => {
  const blockEndpoint = `${NDAU_ENDPOINT}/block/height/${blockHeight}`
  return axios.get(blockEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const blockTransactions = response.data.block.data.txs;
      return formatTransactions(blockTransactions);
    })
    .catch(error => {
      console.log(error)
      return;
    })
}

export const getBlocks = (blockRangeStart, blockRangeEnd, maximum, fetchAll) => {
  const _blockRangeStart = blockRangeStart || getBlockRangeStart(blockRangeEnd, maximum)
  const blocksEndpoint = `${NDAU_ENDPOINT}/block/range/${_blockRangeStart}/${blockRangeEnd}`
  
  return axios.get(blocksEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const blocks = response.data.block_metas || [];
      return blocks;
    })
    .catch(error => console.log(error))
}

export const pollForBlocks = (lastBlockHeight, maximum, success) => {
  let lastHeight = lastBlockHeight;
  const fetchNewBlocks = () => {
    getNodeStatus()
      .then(status => {
        if (!status) {
          return;
        }

        const newHeight = status.latest_block_height;
        if(newHeight > lastHeight) {
          console.log('polling for blocks')
          const blockRangeEnd = newHeight;
          let blockRangeStart = lastHeight + 1

          if (blockRangeEnd - blockRangeStart > maximum) {
            blockRangeStart = getBlockRangeStart(blockRangeEnd, maximum);
          }

          getBlocks(blockRangeStart, blockRangeEnd, maximum, true)
            .then(newBlocks => {
              lastHeight = status.latest_block_height
              success && success(newBlocks, status, blockRangeEnd);
            })
        }
      })
  }

  window.setInterval(fetchNewBlocks, POLL_INTERVAL);
}

export const getNodeStatus = () => {
  const statusEndpoint = `${NDAU_ENDPOINT}/node/status`;
  return axios.get(statusEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      const status = response.data.sync_info;
      return status;
    })
    .catch(error => console.log(error))
}

export const getCurrentOrder = () => {
  const statusEndpoint = `${NDAU_ENDPOINT}/order/current`;
  return axios.get(statusEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      return response.data ;
    })
    .catch(error => console.log(error))
}

export const getBlockRangeStart = (blockRangeEnd, maximum=100) => {
  let blockRangeStart = parseInt(blockRangeEnd) - maximum;
  if (blockRangeEnd - blockRangeStart > maximum) {
    blockRangeStart = blockRangeEnd - maximum;
  }
  return (blockRangeStart && blockRangeStart >= 1) ? blockRangeStart : 1;
}
