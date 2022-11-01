/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */


export const KNOWLEDGE_BASE_ENDPOINT = 'https://ndaucollective.org/knowledge-base'
export const KEYWORDS = {
  // Term: Address
  // https://ndau.io/knowledge-base/addresses/
  address: {
    endpoint: KNOWLEDGE_BASE_ENDPOINT + '/addresses/',
    explanation: `An ndau address is a string of 48 letters and numbers, and is 
    generated according to a specified algorithm from a securely-generated 
    public/private keypair known as its ownership key.`,
  },

  // Term: Node
  // https://ndau.io/knowledge-base/node/
  node: {
    endpoint: KNOWLEDGE_BASE_ENDPOINT + '/node/',
    explanation: `A computing device participating in the ndau network, running 
    the ndau blockchain software.  Also referred to as a “Network Node.”`,
  },

  // Term: Lock
  // https://ndau.io/knowledge-base/locking/
  lock: {
    endpoint: KNOWLEDGE_BASE_ENDPOINT + '/locking/',
    explanation: `To encourage long-term stability, ndau accounts may also accrue an 
    Ecosystem Alignment Incentive (EAI) incentive if they are locked by the holder 
    to prohibit withdrawals for a specified countdown period. A locked account earns 
    a lock incentive based on the countdown period specified.`
  },

  // Term: Last EAI Update:
  // https://ndau.io/knowledge-base/ecosystem-alignment-incentive-eai/
  EAI: {
    endpoint: KNOWLEDGE_BASE_ENDPOINT + '/ecosystem-alignment-incentive-eai/',
    explanation: `Ecosystem Alignment Incentive (EAI) is ndau you can earn by locking
    one of your existing ndau accounts for a specific period of
    time. You can’t withdraw your ndau while an account is locked,
    and longer lock periods will let you earn more EAI.`
  },

  // Term: Last WAA Update
  // https://ndau.io/knowledge-base/weighted-average-age-waa/
  WAA: {
    endpoint: KNOWLEDGE_BASE_ENDPOINT + '/weighted-average-age-waa/',
    explanation: `Weighted Average Age (WAA) is the average age of all the ndau in a 
    specific account. WAA is displayed in years/months/days, with 1 month always equal 
    to 30 days.`,
  },

  // Term: Settlement Settings (should be renamed "Recourse Period Settings")
  // https://ndau.io/knowledge-base/recourse-period/
  recourse: {
    endpoint: KNOWLEDGE_BASE_ENDPOINT + '/recourse-period/',
    explanation: `The period of time (default 2 days) that it takes for a transfer of 
    ndau to become available to the recipient to send to a different account. The ndau 
    is pending during the recourse period, and then is cleared once the recourse period 
    is over. This is similar to how it takes time for a bank check to clear when being 
    deposited. The recourse period exists to help make ndau more resistant to fraud.`
  },

  // Term: Settlement Settings (should be renamed "Recourse Period Settings")
  // https://ndau.io/knowledge-base/recourse-period/
  validation: {
    endpoint: KNOWLEDGE_BASE_ENDPOINT + '/validation-scripts-and-keys/',
    explanation: `ndau accounts are protected by security mechanisms more powerful and 
    more flexible than those offered by other digital currencies. Account transactions 
    may be required to meet multiple criteria before being accepted as valid, such as 
    having multiple signatures, minimum or maximum amounts, or a minimum time since 
    the last transaction. Each ndau account must have at least one validation key 
    associated with it, and it may also have a validation script assigned. Those keys 
    and validation script are used to validate any subsequent transactions submitted 
    for that account.`
  },

  SIB: {
    endpoint:
      'https://ndau.io/knowledge-base/stabilization-incentive-burn-sib/',
    explanation: `SIB is a feature of ndau for maintaining balance, providing protection against both inflation and downside volatility.`
  },
  ndauInCirculation: {
    endpoint:
      'https://ndau.io/knowledge-base/why-is-ndau-in-circulation-greater-than-ndau-issued/',
    explanation: `ndau in circulation is the amount of ndau held in all accounts on the ndau blockchain.`
  },
  currentMarketPrice: {
    endpoint:
      'https://ndau.io/knowledge-base/what-is-market-price-and-how-is-it-recorded-on-the-ndau-blockchain/',
    explanation: `Market Price is recorded on the ndau blockchain to provide input to ndau’s monetary policies and determine SIB rates.`
  }
}

// Term: Address
// https://ndau.io/knowledge-base/addresses/

// Term: Node
// https://ndau.io/knowledge-base/node/

// Term: Lock
// https://ndau.io/knowledge-base/locking/

// Term: Last EAI Update:
// https://ndau.io/knowledge-base/ecosystem-alignment-incentive-eai/

// Term: Last WAA Update
// https://ndau.io/knowledge-base/weighted-average-age-waa/

// Term: Weighted Average Age:
// https://ndau.io/knowledge-base/weighted-average-age-waa/

// Term: Settlement Settings (should be renamed "Recourse Period Settings")
// https://ndau.io/knowledge-base/recourse-period/
