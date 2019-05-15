import moment from 'moment'
import momentTimezone from 'moment-timezone'
// import { getMicrosecondsSinceNdauEpoch } from './date'
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
    added: formatTime(time),
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
    period: formatTime(period),
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
      bonus: lock.bonus && `${lock.bonus / 10000000000}%`,
      unlocksOn: formatTime(lock.unlocksOn),
      countdownPeriod: formatPeriod(lock.noticePeriod)
    },
    rewardsTarget,
    sequence,
    recourseSettings: settlementSettings && {
      ...settlementSettings,
      period: formatPeriod(settlementSettings.period),
      qty: convertNapuToNdau(settlementSettings.qty)
    },
    stake: stake && {
      ...stake,
      Point: formatTime(stake.Point)
    },
    validationKeys,
    validationScript,
    weightedAverageAge,  // formatPeriod(weightedAverageAge),
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
// PRICE
/////////////////////////////////////////

export const formatPriceInfo = (priceInfo) => {
  if (priceInfo) {
    const {
      marketPrice,
      targetPrice,
      totalIssued,
      totalNdau,
      totalSIB,
      sib,
    } = priceInfo

    return {
      marketPrice: convertNanocentsToUSD(marketPrice, 0),
      targetPrice: convertNanocentsToUSD(targetPrice, 0),
      totalIssued: convertNapuToNdau(totalIssued, 0),
      totalNdau: convertNapuToNdau(totalNdau, 0),
      totalSIB: convertNapuToNdau(totalSIB, 0),
      sib: sib && (sib / 100000000000 ),
      raw: {
        marketPrice,
        targetPrice,
        totalIssued,
        totalNdau,
        totalSIB,
        sib,
      } 
    }
  }
}

/////////////////////////////////////////
// GENERIC
/////////////////////////////////////////

export const convertNapuToNdau = (napuAmount, humanize=true, decimals=8) => {
  if(napuAmount === 0 || napuAmount) {
    const ndauAmount = napuAmount / 100000000
    return humanize ? humanizeNumber(ndauAmount, decimals) : ndauAmount
  }
}

export const convertNanocentsToUSD = (nanocents, humanize=true, decimals=8) => {
  if(nanocents === 0 || nanocents) {
    const dollarAmount = nanocents / 100000000000
    return humanize ? humanizeNumber(dollarAmount, decimals) : dollarAmount
  }
}

export const humanizeNumber = (number, decimals=2, minimumDecimals=0) => {
  if (number || number === 0) {
    const num = Math.abs(number)
    const scale = Math.pow(10, decimals)
    const numberFloat = Math.round(num * scale) / scale// parseFloat(num).toFixed(decimals)
    let numberString = numberFloat.toLocaleString('fullwide', {
      useGrouping: true, 
      minimumSignificantDigits: 1,
    })
    
    if (minimumDecimals && typeof minimumDecimals === "number") {
      let decimalPlace = numberString.indexOf(".")
      if (decimalPlace === -1) {
        numberString += "."
        decimalPlace = numberString.indexOf(".")
      }

      const decimalPlaces = numberString.slice(decimalPlace + 1).length
      let remainingDecimalPlaces = minimumDecimals - decimalPlaces
      while(remainingDecimalPlaces > 0) {
        numberString += "0"
        remainingDecimalPlaces -= 1
      }

    }
    return numberString
  }
}

export const formatTime = (time) => {
  if (time) {
    const timezone = window.Intl.DateTimeFormat().resolvedOptions().timeZone
    const momentTime = momentTimezone(time)
    const formattedTime = momentTime && momentTime.tz(timezone).format(`DD MMM YYYY. HH:mm zz`)

    return formattedTime
  }
}

export const formatPeriod = (period) => {
  if(period) {
    const decoratedPeriod = `P${period.toUpperCase()}`
    const momentPeriod = moment.duration(`${decoratedPeriod}`);

    return momentPeriod.invalid ? period : momentPeriod.humanize();
  }
}