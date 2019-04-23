import moment from 'moment'
import { TRANSACTION_TYPES } from '../constants.js'


/////////////////////////////////////////
// BLOCK
/////////////////////////////////////////

export const formatBlock = (block) => {
  if(!block || !block.header) {
    return;
  }

  const { header={} } = block;
  const {
    height, time, num_txs, last_block_id,
  } = header;

  return {
    height: height,
    timestamp: time,
    numberOfTransactions: num_txs,
    time: formatTime(time),
    hash: last_block_id && last_block_id.hash,
  };
}

export const formatBlocks = (blocks=[]) => {
  const formattedBlocks = [];

  for(const block of blocks) {
    formattedBlocks.push( formatBlock(block) );
  }

  return formattedBlocks;
}


/////////////////////////////////////////
// TRANSACTION
/////////////////////////////////////////

export const formatTransaction = (transaction, additionalData={}) => {
  if(!transaction) {
    return;
  }
  
  let transactionData = transaction;
  
  const { 
    TransactableID,
    Transactable: {
      bonus,
      dst: destination,
      dis: distributionScript,
      // key: newKeys,
      nod: node,
      notice: noticePeriod,
      own: ownershipKey,
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
      sig: signatures,
      src: source,
      tgt: target,
      unlock: unlocksOn,
      key: validationKeys,
      val: validationScript,
    } 
  } = transactionData;
  let type = TRANSACTION_TYPES[TransactableID];
  
  return {
    type: type && type.replace(/([a-z])([A-Z])/g, '$1 $2'),
    bonus,
    destination,
    distributionScript,
    validationKeys: validationKeys && [ validationKeys[0] && validationKeys[0][1] ],
    node,
    noticePeriod,
    ownershipKey: ownershipKey && ownershipKey[1],
    period,
    power,
    publicKey,
    quantity: convertNapuToNdau(quantity),
    RPCAddress,
    random,
    sequence,
    sidechainID,
    sidechainSignableBytes,
    sidechainSignatures,
    signatures: signatures && signatures[1],
    source,
    target: target && target[0],
    unlocksOn,
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


/////////////////////////////////////////
// ACCOUNT
/////////////////////////////////////////

export const formatAccount = (account, additionalData={}) => {
  if(!account) {
    return;
  }
  
  let accountData = Object.assign({}, account);

  // {
  //   address: "ndafp8wg4cnf9nnsr7im8gdscqzdvdcuhku6xy8p6qc7h7a4", 
  //   balance: 111472379963,
  //   currencySeatDate: "2018-04-05T00:00:00Z",
  //   delegationNode: "ndam75fnjn7cdues7ivi7ccfq8f534quieaccqibrvuzhqxa",
  //   incomingRewardsFrom: null,
  //   lastEAIUpdate: "2019-04-18T22:13:07Z",
  //   lastWAAUpdate: "2018-04-05T00:00:00Z",
  //   lock: {
  //     noticePeriod: "1y2m22d", 
  //     unlocksOn: "2019-06-26T00:00:00Z", 
  //     bonus: 30000000000,
  //   },
  //   rewardsTarget: null,
  //   sequence: 1,
  //   settlementSettings: {
  //     period: "1dt23h59m", 
  //     changesAt: null, 
  //     next: null,
  //   },
  //   settlements: null,
  //   stake: null,
  //   validationKeys: ["npuba4jaftckeeb674ytepd4pac4m3mgyyd3998h7ubtpykb6s…uxvc5pqz5cf6fyftz58irc237d8xyhj9gamxxkcrwycaq8mrz"],
  //   validationScript: null,
  //   weightedAverageAge: "1y14dt1h49m10s852313us",
  // }
  
  const {
    address, 
    balance,
    currencySeatDate,
    delegationNode,
    incomingRewardsFrom,
    lastEAIUpdate,
    lastWAAUpdate,
    lock,
    rewardsTarget,
    sequence,
    settlementSettings,
    settlements,
    stake,
    validationKeys,
    validationScript,
    weightedAverageAge,
  } = accountData;

  
  return  {
    address, 
    balance: convertNapuToNdau(balance),
    currencySeatDate: formatTime(currencySeatDate),
    delegationNode,
    incomingRewardsFrom,
    lastEAIUpdate: formatTime(lastEAIUpdate),
    lastWAAUpdate: formatTime(lastWAAUpdate),
    lock: {
      ...lock,
      bonus: convertNapuToNdau(lock.bonus),
      unlocksOn: formatTime(lock.unlocksOn),
      noticePeriod: formatPeriod(lock.noticePeriod)
    },
    rewardsTarget,
    sequence,
    settlementSettings: {
      ...settlementSettings,
      // period
    },
    settlements,
    stake,
    validationKeys,
    validationScript,
    weightedAverageAge,
  }
}


/////////////////////////////////////////
// GENERIC
/////////////////////////////////////////

export const convertNapuToNdau = (napuAmount, humanize=true) => {
  if(napuAmount) {
    const ndauAmount = napuAmount / 100000000
    return humanize ? humanizeNumber(ndauAmount, 3) : ndauAmount
  }
}

export const humanizeNumber = (number, decimals=0) => {
  if (number) {
    const numberString = parseFloat(number).toFixed(decimals)
    const numberArray = numberString.split("")
    const decimalPlace = numberArray.findIndex(item => item === ".")
    let currentLastPlace = decimalPlace !== -1 ? decimalPlace : numberString.length
    
    while (currentLastPlace > 3) {
      const commaPlace = currentLastPlace - 3
      numberArray.splice(commaPlace, 0, ',')

      currentLastPlace = commaPlace
    }

    return numberArray.join("")
  }
}

export const formatTime = (time) => {
  if (time) {
    return time && moment(time).format('DD MMM YYYY. HH:mm')
  }
} 

export const formatPeriod = (period) => {
  // TODO: format period string.

  return period;
}