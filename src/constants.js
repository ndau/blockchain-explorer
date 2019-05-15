
/////////////////////////////////////////
// NODE
/////////////////////////////////////////

export const NODES_ENDPOINT = "https://s3.us-east-2.amazonaws.com/ndau-json/services.json"
export const MAIN_NODE_ENDPOINT = 'https://mainnet-0.ndau.tech:3030'
export const TESTNET_NODE_ENDPOINT = 'https://api.ndau.tech:31300'
export const DEVNET_NODE_ENDPOINT = 'https://api.ndau.tech:30300'
export const DEFUALT_NODE_NAME = "mainnet"
export const NODE_ENDPOINTS = {
	mainnet: MAIN_NODE_ENDPOINT,
	testnet: TESTNET_NODE_ENDPOINT,
	devnet: DEVNET_NODE_ENDPOINT,
}
export const BLOCK_RANGE = 100
export const POLL_INTERVAL = 10000
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
	1:  "Transfer",
	2:  "ChangeValidation",
	3:  "ReleaseFromEndowment",
	4:  "ChangeRecoursePeriod",
	5:  "Delegate",
	6:  "CreditEAI",
	7:  "Lock",
	8:  "Notify",
	9:  "SetRewardsDestination",
	10: "SetValidation",
	11: "Stake",
	12: "RegisterNode",
	13: "NominateNodeReward",
	14: "ClaimNodeReward",
	15: "TransferAndLock",
	16: "CommandValidatorChange",
	18: "UnregisterNode",
	19: "Unstake",
	20: "Issue",
	21: "CreateChildAccount",
	22: "RecordPrice",
	23: "SetSysvar",
	24: "SetStakeRules",
	30: "ChangeSchema",
};

export const KEYWORD_MAP = {
	address: "address",
	balance: "balance",
	currencySeatDate: "currencySeat",
	delegationNode: "node",
	incomingRewardsFrom: "rewards",
	lastEAIUpdate: "EAI",
	lastWAAUpdate: "WAA",
	lock: "lock",
	rewardsTarget: "reward",
	sequence: "sequence",
	recourseSettings: "recourse", 
	// settlements: "recourse",
	stake: "stake",
	validationKeys: "validation", 
	validationScript: "validation",
	weightedAverageAge: "WAA",
}


/////////////////////////////////////////
// STYLES
/////////////////////////////////////////

export const PRIMARY_ORANGE = "#f99d1c"
export const NAVBAR_COLOR = "#0f2748";
export const PRIMARY_LIME = "#8cc74f";


/////////////////////////////////////////
// DATE
/////////////////////////////////////////

export const NDAU_EPOCH = '2000-01-01T00:00:00Z'
