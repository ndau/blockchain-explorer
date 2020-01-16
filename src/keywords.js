
export const KNOWLEDGE_BASE_ENDPOINT = 'https://ndaucollective.org/knowledge-base'
export const KEYWORDS = {
  // Term: Address
  // https://ndaucollective.org/knowledge-base/addresses/
  address: {
    endpoint: 'https://ndaucollective.org/knowledge-base/addresses/',
    explanation: `An ndau address is a string of 48 letters and numbers, and is 
    generated according to a specified algorithm from a securely-generated 
    public/private keypair known as its ownership key.`,
  },

  // Term: Node
  // https://ndaucollective.org/knowledge-base/node/
  node: {
    endpoint: 'https://ndaucollective.org/knowledge-base/node/',
    explanation: `A computing device participating in the ndau network, running 
    the ndau blockchain software.  Also referred to as a “Network Node.”`,
  },

  // Term: Lock
  // https://ndaucollective.org/knowledge-base/locking/
  lock: {
    endpoint: 'https://ndaucollective.org/knowledge-base/locking/',
    explanation: `To encourage long-term stability, ndau accounts may also accrue an 
    Ecosystem Alignment Incentive (EAI) incentive if they are locked by the holder 
    to prohibit withdrawals for a specified countdown period. A locked account earns 
    a lock incentive based on the countdown period specified.`
  },

  // Term: Last EAI Update:
  // https://ndaucollective.org/knowledge-base/ecosystem-alignment-incentive-eai/
  EAI: {
    endpoint: 'https://ndaucollective.org/knowledge-base/ecosystem-alignment-incentive-eai/',
    explanation: `Ecosystem Alignment Incentive (EAI) is ndau you can earn by locking
    one of your existing ndau accounts for a specific period of
    time. You can’t withdraw your ndau while an account is locked,
    and longer lock periods will let you earn more EAI.`
  },

  // Term: Last WAA Update
  // https://ndaucollective.org/knowledge-base/weighted-average-age-waa/
  WAA: {
    endpoint: 'https://ndaucollective.org/knowledge-base/weighted-average-age-waa/',
    explanation: `Weighted Average Age (WAA) is the average age of all the ndau in a 
    specific account. WAA is displayed in years/months/days, with 1 month always equal 
    to 30 days.`,
  },

  // Term: Settlement Settings (should be renamed "Recourse Period Settings")
  // https://ndaucollective.org/knowledge-base/recourse-period/
  recourse: {
    endpoint: 'https://ndaucollective.org/knowledge-base/recourse-period/',
    explanation: `The period of time (default 2 days) that it takes for a transfer of 
    ndau to become available to the recipient to send to a different account. The ndau 
    is pending during the recourse period, and then is cleared once the recourse period 
    is over. This is similar to how it takes time for a bank check to clear when being 
    deposited. The recourse period exists to help make ndau more resistant to fraud.`
  },

  // Term: Settlement Settings (should be renamed "Recourse Period Settings")
  // https://ndaucollective.org/knowledge-base/recourse-period/
  validation: {
    endpoint: 'https://ndaucollective.org/knowledge-base/validation-scripts-and-keys/',
    explanation: `ndau accounts are protected by security mechanisms more powerful and 
    more flexible than those offered by other digital currencies. Account transactions 
    may be required to meet multiple criteria before being accepted as valid, such as 
    having multiple signatures, minimum or maximum amounts, or a minimum time since 
    the last transaction. Each ndau account must have at least one validation key 
    associated with it, and it may also have a validation script assigned. Those keys 
    and validation script are used to validate any subsequent transactions submitted 
    for that account.`
  },

  ndauInCirculation: {
    endpoint:
      'https://ndau.io/knowledge-base/why-is-ndau-in-circulation-greater-than-ndau-issued/',
    explanation: `ndau in circulation is the amount of ndau held by purchasers. This includes all ndau issued by the foundation, plus those earned from ecosystem alignment incentives, minus any ndau burned as a result of stability mechanisms applied during market pressure. The number of ndau in circulation will exceed the number of ndau issued if there have been more ndau earned than burned. The maximum number of ndau that may be issued is 30 million and the maximum limit to ndau in circulation is 40 million.`
  },
  currentMarketPrice: {
    endpoint:
      'https://ndau.io/knowledge-base/what-is-market-price-and-how-is-it-recorded-on-the-ndau-blockchain/',
    explanation: `Market Price is recorded on the ndau blockchain to provide input to ndau’s Monetary Policies and determine SIB rates. As a specific Long-Term Store of Value, the Market Price used by the ndau blockchain for the above purposes must not be easy to deliberately manipulate, nor allow for intraday volatility to effect ndau’s Monetary Policies. The Market Price recorded on the ndau blockchain reflects the demand for ndau from holders who seek to use ndau for it’s designed purpose. Therefore, the Market Price of ndau is recorded as the highest executed price on an exchange every 24 hours (5pm NYC – 5pm NYC)`
  }
}

// Term: Address
// https://ndaucollective.org/knowledge-base/addresses/

// Term: Node
// https://ndaucollective.org/knowledge-base/node/

// Term: Lock
// https://ndaucollective.org/knowledge-base/locking/

// Term: Last EAI Update:
// https://ndaucollective.org/knowledge-base/ecosystem-alignment-incentive-eai/

// Term: Last WAA Update
// https://ndaucollective.org/knowledge-base/weighted-average-age-waa/

// Term: Weighted Average Age:
// https://ndaucollective.org/knowledge-base/weighted-average-age-waa/

// Term: Settlement Settings (should be renamed "Recourse Period Settings")
// https://ndaucollective.org/knowledge-base/recourse-period/