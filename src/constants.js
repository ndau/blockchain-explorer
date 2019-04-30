
/////////////////////////////////////////
// NODE
/////////////////////////////////////////

export const MAIN_NODE_ENDPOINT = 'https://api.ndau.tech:32300'
export const TESTNET_NODE_ENDPOINT = 'https://api.ndau.tech:31300'
export const DEVNET_NODE_ENDPOINT = 'https://api.ndau.tech:30300'
export const DEFUALT_NODE_ENDPOINT = TESTNET_NODE_ENDPOINT
export const BLOCK_RANGE = 100
export const POLL_INTERVAL = 7000
export const MAX_FETCH_ATTEMPT = 10
export const HTTP_REQUEST_HEADER = {
  method: 'GET',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
}


/////////////////////////////////////////
// DATA
/////////////////////////////////////////

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

export const KEYWORD_MAP = {
	address: "address",
	balance: "balance",
	currencySeatDate: "currencySeat",
	delegationNode: "node",
	incomingRewardsFrom: "rewards",
	lastEAIUpdate: "EAI",
	lastWAAUpdate: "WAA",
	lock: "lock",// {noticePeriod: "1m", unlocksOn: null, bonus: 0}
	rewardsTarget: "reward",
	sequence: "sequence",
	settlementSettings: "settlement", // {period: "2d", changesAt: null, next: null}
	settlements: "settlement",
	stake: "stake", // {Point: "2019-02-26T00:28:44Z", Address: "ndahnsxr8zh7r6u685ka865wz77wb78xcn45rgskpeyiwuza"}
	validationKeys: "validationKey", 
	validationScript: "validationScript",
	weightedAverageAge: "WAA",
}


/////////////////////////////////////////
// STYLES
/////////////////////////////////////////

export const NAVBAR_COLOR = "#0f2748";
export const PRIMARY_LIME = "#8cc74f";


