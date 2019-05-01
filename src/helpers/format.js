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
    destination: Array.isArray(destination) ? destination[0] : destination,
    distributionScript,
    validationKeys: validationKeys && [ validationKeys[0] && validationKeys[0][1] ],
    node: Array.isArray(node) ? node[0] : node,
    noticePeriod,
    ownershipKey: ownershipKey && ownershipKey[1],
    period,
    power,
    publicKey,
    quantity: convertNapuToNdau(quantity),
    RPCAddress: Array.isArray(RPCAddress) ? RPCAddress[0] : RPCAddress,
    random,
    sequence,
    sidechainID,
    sidechainSignableBytes,
    sidechainSignatures,
    signatures: signatures,
    source: Array.isArray(source) ? source[0] : source,
    target: Array.isArray(target) ? target[0] : target,
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
    lock: lock && {
      ...lock,
      bonus: convertNapuToNdau(lock.bonus),
      unlocksOn: formatTime(lock.unlocksOn),
      noticePeriod: formatPeriod(lock.noticePeriod)
    },
    rewardsTarget,
    sequence,
    settlementSettings: settlementSettings && {
      ...settlementSettings,
      period: formatPeriod(settlementSettings.period),
    },
    settlements,
    stake: stake && {
      ...stake,
      Point: formatTime(stake.Point)
    },
    validationKeys,
    validationScript,
    weightedAverageAge: formatPeriod(weightedAverageAge),
    ...additionalData
  }
}

export const formatAccountEvent = accountEvent => {
  if(accountEvent) {
    const {
      Balance, Timestamp, TxHash, Height
    } = accountEvent
  
    return {
      balance: convertNapuToNdau(Balance),
      timestamp: formatTime(Timestamp),
      transactionHash: TxHash,
      blockHeight: Height,
      raw: {
        balance: Balance,
        timestamp: Timestamp,
      }
    }
  }
}


/////////////////////////////////////////
// GENERIC
/////////////////////////////////////////

export const convertNapuToNdau = (napuAmount, humanize=true) => {
  if(napuAmount === 0 || napuAmount) {
    const ndauAmount = napuAmount / 100000000
    return humanize ? humanizeNumber(ndauAmount, 2) : ndauAmount
  }
}

export const humanizeNumber = (number, decimals=0) => {
  if (number === 0 || number) {
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
  if(period) {
    const decoratedPeriod = `P${period.toUpperCase()}`
    const momentPeriod = moment.duration(decoratedPeriod);

    return momentPeriod.invalid ? period : momentPeriod.humanize();
  }
}