import moment from 'moment'
import momentTimezone from 'moment-timezone'
// import { TRANSACTION_FEES } from '../constants.js'

/////////////////////////////////////////
// BLOCK
/////////////////////////////////////////

export const formatBlock = (block) => {
  if(!block || !block.header) {
    return;
  } 

  const { block_id={}, header={} } = block;
  const { height, time, num_txs } = header;
  

  return {
    height: height,
    timestamp: time,
    numberOfTransactions: num_txs,
    added: formatTime(time),
    hash: block_id.hash,
  
    raw: {
      added: time
    }
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
export const formatTransaction = (transaction) => {
  if(!transaction) {
    return;
  }
  
  const { 
    BlockHeight: blockHeight,
    Timestamp: timestamp,
    TxOffset: offset,
    Fee: fee,
    SIB: sib,
    TxType: type,
    TxHash: hash,
    TxData: metadata,
  } = transaction

  const {
    // source,
    // destination,
    qty,
    // period,
    unlocksOn,
    // validationKeys,
    // ownershipKey,
    // node,
    // RPCAddress,
    // target,
  } = metadata

  return {
    type: separaeteWords(type),
    amount: convertNapuToNdau(qty),
    timestamp: formatTime(timestamp),
    blockHeight,
    fee: convertNapuToNdau(fee),
    sib, 
    offset,
    hash,
    details: {
      ...metadata,
      
      // destination: Array.isArray(destination) ? destination[0] : destination,
      // validationKeys: validationKeys && [ validationKeys[0] && validationKeys[0][1] ],
      // node: Array.isArray(node) ? node[0] : node,
      // ownershipKey: ownershipKey && ownershipKey[1],
      // period: formatTime(period),
      // quantity: convertNapuToNdau(quantity),
      // RPCAddress: Array.isArray(RPCAddress) ? RPCAddress[0] : RPCAddress,
      // source: Array.isArray(source) ? source[0] : source,
      // target: Array.isArray(target) ? target[0] : target,
      // unlocksOn: formatTime(unlocksOn),
    },
    raw: {
      type,
      unlocksOn,
      timestamp,
    }
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
    recourseSettings,
    stake,
    validationKeys,
    validationScript,
    weightedAverageAge,
  } = accountData;

  return {
    address, 
    balance: convertNapuToNdau(balance),
    currencySeatDate: formatTime(currencySeatDate),
    delegationNode,
    incomingRewardsFrom,
    lastEAIUpdate: formatTime(lastEAIUpdate),
    lastWAAUpdate: formatTime(lastWAAUpdate),
    lock: lock && {
      bonus:  (lock.bonus === 0 || lock.bonus) && `${lock.bonus / 10000000000}%`,
      unlocksOn: formatTime(lock.unlocksOn),
      countdownPeriod: formatPeriod(lock.noticePeriod)
    },
    rewardsTarget,
    sequence,
    recourseSettings: recourseSettings && {
      ...recourseSettings,
      period: formatPeriod(recourseSettings.period),
      qty: convertNapuToNdau(recourseSettings.qty)
    },
    stake: stake && {
      ...stake,
      Point: formatTime(stake.Point)
    },
    validationKeys,
    validationScript,
    weightedAverageAge: formatPeriod(weightedAverageAge),
    ...additionalData, 
    raw: {
      lastEAIUpdate,
      lastWAAUpdate,
      weightedAverageAge,
    }
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
      sib: (sib === 0 || sib) && (sib / 100000000000 ),
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

export const separaeteWords = (string) => {
  if(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1 $2')
  }
}

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

export const formatTime = (time, format="DD MMM YYYY. HH:mm zz") => {
  if (time) {
    const timezone = window.Intl.DateTimeFormat().resolvedOptions().timeZone
    const momentTime = momentTimezone(time)
    const formattedTime = momentTime && momentTime.tz(timezone).format(format)

    return formattedTime
  }
}

export const formatPeriod = (period, format=true) => {
  if(period) {
    let truncatedPeriod = String(period)
    const indexOfS = truncatedPeriod.indexOf("s")
    if(indexOfS !== -1) {
      truncatedPeriod = truncatedPeriod.slice(0, indexOfS + 1)
    }

    const decoratedPeriod = `P${truncatedPeriod.toUpperCase()}`
    const momentPeriod = moment.duration(`${decoratedPeriod}`)

    if (momentPeriod.invalid || !format) {
      return period
    }
    // debugger
    return momentPeriod.humanize()
  }
}

export const expandPeriod = (period) => {
  if(period) {
    let truncatedPeriod = String(period)
    const indexOfS = truncatedPeriod.indexOf("s")
    if(indexOfS !== -1) {
      truncatedPeriod = truncatedPeriod.slice(0, indexOfS + 1)
    }

    const decoratedPeriod = `P${truncatedPeriod.toUpperCase()}`
    const momentPeriod = moment.duration(`${decoratedPeriod}`)

    if (momentPeriod.invalid) {
      return period
    } 
    
    const periodFields = momentPeriod._data
    const periodDetails = []

    periodFields && Object.keys(periodFields).forEach(field => {
      const value = periodFields[field]
      if(value) {
        periodDetails.push(`${value} ${field}`)
      }
    })

    return periodDetails.reverse().join(', ')
  }
}

export const expandTime = time => {
  return formatTime(time, "Do MMMM YYYY. HH:mm:ss:SS zz")
}