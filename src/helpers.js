import axios from 'axios';
import moment from 'moment';
import qs from 'query-string';
import { HTTP_REQUEST_HEADER,  POLL_INTERVAL } from './constants.js';

export const TRANSACTION_TYPES = {
  1: "Transfer",
	2: "ChangeValidation",
	3: "ReleaseFromEndowment",
	4: "ChangeSettlementPeriod",
	5: "Delegate",
	6: "CreditEAI",
	7: "Lock",
	8: "Notify",
	9: "SetRewardsDestination",
	10: "ClaimAccount",
	11: "Stake",
	12: "RegisterNode",
	13: "NominateNodeReward",
	14: "ClaimNodeReward",
	15: "TransferAndLock",
	16: "CommandValidatorChange",
	17: "SidechainTx",
	18: "UnregisterNode",
	19: "Unstake",
  20: "Issue",
};

export const getNodeEndpoint = () => {
  const query = qs.parse(window.location.search);
  return query.node
}

export const validateEndpoint = (nodeEndpoint) => {
  return getNodeStatus(nodeEndpoint)
    .then(status => {
      return !!status;
    })
}

export const formatBlock = (block) => {
  if(!block) {
    return;
  }

  const { header, block_id } = block;

  return {
    height: header && header.height,
    age: header && moment(header.time).fromNow(),
    numberOfTransactions: header && header.num_txs,
    time: header && moment(header.time).format('YYYY-MM-DD hh:mm'),
    hash: block_id && block_id.hash,
  };
}

export const formatBlocks = (blocks=[]) => {
  const formattedBlocks = [];

  for(const block of blocks) {
    formattedBlocks.push( formatBlock(block) );
  }

  return formattedBlocks;
}

export const formatTransaction = (transaction, additionalData={}) => {
  if(!transaction) {
    return;
  }
  
  let transactionData = transaction;
  console.log(transactionData);
  const { 
    TransactableID,
    Transactable: {
      bonus,
      dst: destination,
      dis: distributionScript,
      key: newKeys,
      nod: node,
      notice: noticePeriod,
      own: ownership,
      per: period,
      pow: power,
      tm_pk: publicKey,
      qty: quantity,
      rpc: RPCAddress,
      rnd: random,
      seq: sequence,
      sch: sidechainID,
      ssb: sidechainSignableBytes,
      ssg: sidechainSignatures,
      sig: signature, // signatures,
      src: source,
      tgt: target,
      unlock: unlocksOn,
      // key: validationKeys,
      val: validationScript,
    } 
  } = transactionData;

  let type = TRANSACTION_TYPES[TransactableID];
  
  return {
    type: type && type.replace(/([a-z])([A-Z])/g, '$1 $2'),
    bonus,
    destination,
    distributionScript,
    newKeys,
    node,
    noticePeriod,
    ownership,
    period,
    power,
    publicKey,
    quantity,
    RPCAddress,
    random,
    sequence,
    sidechainID,
    sidechainSignableBytes,
    sidechainSignatures,
    signature, // signatures,
    source,
    target,
    unlocksOn,
    //validationKeys,
    validationScript,
    ...additionalData
  }
}

export const formatTransactions = (transactions) => {
  if(!transactions) {
    return;
  }
  
  const formattedTransactions = [];
  for (const transaction of transactions) {
    formattedTransactions.push( formatTransaction(transaction) )
  }

  return formattedTransactions
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

export const getBlock = (blockHeight, success) => {
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

export const getBlockTransactions = (blockHeight) => { 
  return getTransactionHashes(blockHeight)
    .then(hashes => {
      return getTransactions(hashes)
    })
}

export const getTransactions = (transactionHashes=[]) => { 
  const transactionRequests = transactionHashes.map(hash => {
    return getTransaction(hash);
  })
    
  return axios.all(transactionRequests);
}

export const getTransaction = (hash) => {
    const transactionEndpoint = `${getNodeEndpoint()}/transaction/${window.encodeURIComponent(hash)}`;

    return axios.get(transactionEndpoint, HTTP_REQUEST_HEADER)
      .then(response => {
        return response.data && formatTransaction(response.data.Tx, { hash });
      })
}

export const getBlocks = (blockRangeStart, blockRangeEnd, maximum) => {
  const _blockRangeStart = blockRangeStart || getBlockRangeStart(blockRangeEnd, maximum);
  const query = qs.parse(window.location.search);
  const NDAU_ENDPOINT = query.node;
  const blocksEndpoint = `${NDAU_ENDPOINT}/block/range/${_blockRangeStart}/${blockRangeEnd}`;

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
          let blockRangeStart = lastHeight + 1

          if (blockRangeEnd - blockRangeStart > maximum) {
            blockRangeStart = getBlockRangeStart(blockRangeEnd, maximum);
          }

          getBlocks(blockRangeStart, blockRangeEnd, maximum, true, noEmpty)
            .then(newBlocks => {
              lastHeight = status.latest_block_height
              getCurrentOrder()
                .then((order={}) => {
                  if(success) {
                    success(newBlocks, {...status, ...order}, blockRangeEnd);
                  } 
                })
              
            })
        }
      })
  }

  window.setInterval(fetchNewBlocks, POLL_INTERVAL);
}

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

export const getCurrentOrder = () => {
  const statusEndpoint = `${getNodeEndpoint()}/order/current`;
  return axios.get(statusEndpoint, HTTP_REQUEST_HEADER)
    .then(response => {
      return response.data;
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

// export const b64MsgPackToObj = b64data => {
//   var raw = window.atob(b64data)
//   var rawLength = raw.length
//   var array = new Uint8Array(new ArrayBuffer(rawLength))

//   for (var i = 0; i < rawLength; i++) {
//     array[i] = raw.charCodeAt(i)
//   }

//   var obj = msgpack.decode(array)
//   return obj
// }
