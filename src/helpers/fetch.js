/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import axios from "axios";
import qs from "query-string";
import {
  HTTP_REQUEST_HEADER,
  DEFUALT_NODE_NAME,
  NODES_ENDPOINT,
} from "../constants.js";
import {
  formatBlock,
  formatBlocks,
  formatTransaction,
  formatAccount,
  formatPriceInfo,
} from "./format";

/// //////////////////////////////////////
// BLOCK
/// //////////////////////////////////////

export const getBlock = async (blockHeight) => {
  const blockEndpoint = `${await getNodeEndpoint()}/block/height/${blockHeight}`;

  return axios
    .get(blockEndpoint, HTTP_REQUEST_HEADER)
    .then((response) => {
      return formatBlock(response.data.block_meta);
    })
    .catch((error) => {
      // console.error(error);
    });
};

export const getBlocks = async ({ before, after, filter, limit }) => {
  const query = `?after=${after || "1"}&filter=${
    filter ? "noempty" : ""
  }&limit=${limit || ""}`;
  const blocksEndpoint = `${await getNodeEndpoint()}/block/before/${before}${query}`;

  return axios
    .get(blocksEndpoint, HTTP_REQUEST_HEADER)
    .then((response) => {
      const { last_height, block_metas } = response.data;

      return {
        blocks: formatBlocks(block_metas),
        lastFetchedHeight: last_height,
        latestFetchedHeight: block_metas[0] && block_metas[0].header.height,
      };
    })
    .catch((error) => {
      console.error(error);
    });
};

export const pollForBlocks = ({ after, filter, success }) => {
  let pollAfter = after;
  return () => {
    getNodeStatus().then((status) => {
      if (!status) {
        return;
      }

      const currentBlockHeight = status.latest_block_height;
      const limit = currentBlockHeight - pollAfter;

      if (limit > 0) {
        getBlocks({
          before: currentBlockHeight,
          after: pollAfter,
          filter,
          limit,
        })
          .then(({ blocks }) => {
            getCurrentOrder().then((order) => {
              if (success) {
                success(blocks, currentBlockHeight, order);
                pollAfter = currentBlockHeight;
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};

/// //////////////////////////////////////
// TRANSACTION
/// //////////////////////////////////////

export const getTransaction = async (hash) => {
  const transactionHash = window.decodeURIComponent(hash);
  const transactionEndpoint = `${await getNodeEndpoint()}/transaction/detail/${window.encodeURIComponent(
    transactionHash
  )}`;

  let getTransactionRetrycount = 0;
  let response = await axios.get(transactionEndpoint, HTTP_REQUEST_HEADER);

  while (response.data === null && getTransactionRetrycount < 8) {
    const transactionEndpoint = `${await getNodeEndpoint()}/transaction/detail/${window.encodeURIComponent(
      transactionHash
    )}`;
    response = await axios.get(transactionEndpoint, HTTP_REQUEST_HEADER);
    getTransactionRetrycount++;
  }
  return formatTransaction(response.data);
};

export const getTransactions = (transactionHashes = []) => {
  const transactionRequests = transactionHashes.map((hash) => {
    return getTransaction(hash);
  });

  function getTransactionsWithProgress(proms, progress_cb) {
    let d = 0;
    progress_cb(0);
    for (const p of proms) {
      p.then(() => {
        d++;
        progress_cb((d * 100) / proms.length);
      });
    }
    return Promise.all(proms);
  }

  return getTransactionsWithProgress(transactionRequests, (p) => {});
};

export const getTransactionHashes = async (blockHeight) => {
  const transactionsEndpoint = `${await getNodeEndpoint()}/block/transactions/${blockHeight}`;

  return axios
    .get(transactionsEndpoint, HTTP_REQUEST_HEADER)
    .then((response) => {
      const hashes = response.data;
      return hashes;
    })
    .catch((error) => {
      // TODO: FAIL SAFE
    });
};

export const getBlockTransactions = (blockHeight) => {
  return getTransactionHashes(blockHeight).then((hashes) => {
    return getTransactions(hashes);
  });
};

export const getNewestTransaction = async () => {
  const transactionsEndpoint = `${await getNodeEndpoint()}/transaction/before/start/?limit=1`;
  let tx;
  await axios
    .get(transactionsEndpoint, HTTP_REQUEST_HEADER)
    .then((response) => {
      const transaction =
        response.data && response.data.Txs && response.data.Txs[0];
      tx = formatTransaction(transaction);
    })
    .catch((error) => {
      // TODO: FAIL SAFE
    });

  return tx;
};

export const getTransactionsBefore = async (txHash, typeFilters) => {
  const query = typeFilters ? `?type=${typeFilters.join(";&type=")}` : "";
  const transactionsEndpoint = `${await getNodeEndpoint()}/transaction/before/${txHash}${query}`;

  return axios
    .get(transactionsEndpoint, HTTP_REQUEST_HEADER)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // TODO: FAIL SAFE
    });
};

export const pollForTransactions = ({
  currentTxHash,
  success,
  typeFilters,
}) => {
  const fetchNewTransactions = () => {
    getNodeStatus()
      .then(async (status) => {
        if (!status) {
          return;
        }

        const newestTx = await getNewestTransaction();
        if (newestTx.hash === currentTxHash) {
          return;
        }

        await getTransactionsBefore("start", typeFilters).then(({ Txs }) => {
          const newTransactions = [];
          let counter = 0;
          const newCurrentTxHash = Txs[0].TxHash;
          let hash = newCurrentTxHash;

          while (hash !== currentTxHash) {
            const transaction = Txs[counter];
            if (transaction) {
              newTransactions.push(transaction);

              counter = counter + 1;
              hash = transaction.TxHash;
            }
          }

          success(newTransactions, newCurrentTxHash);
        });
      })
      .catch((error) => {});
  };

  return fetchNewTransactions;
};

/// //////////////////////////////////////
// ACCOUNT
/// //////////////////////////////////////

export const getAccount = async (address) => {
  const accountDetailsEndpoint = `${await getNodeEndpoint()}/account/account/${address}`;

  try {
    let accountDetailsEndpointResponse = await axios.get(
      accountDetailsEndpoint,
      HTTP_REQUEST_HEADER
    );

    const account = {
      address,
      ...accountDetailsEndpointResponse.data[address],
    };

    let formattedAccount = formatAccount(account);

    const weightedAverageAge = account.weightedAverageAge;

    const systemEAIRateEndpoint = `${await getNodeEndpoint()}/system/eai/rate`;

    //hitting System EAI rate
    const systemEAIRateEndpointResponse = await axios.post(
      systemEAIRateEndpoint,
      [
        {
          address,
          weightedAverageAge,
        },
      ]
    );

    let EAIRate = systemEAIRateEndpointResponse.data[0].eairate;
    EAIRate = (EAIRate / 10 ** 10).toString() + "%";

    return { ...formattedAccount, EAIRate };
  } catch (e) {
    console.error(e);
    return null;
  }
};

// .then((response) => {
//   const account = {
//     address,
//     ...response.data[address],
//   };

//
//     response.data[address] && formatAccount(account),
//     "response.data[address] && formatAccount(account)"
//   );
// return response.data[address] && formatAccount(account);
// })
//     .catch((error) => {});
// };
const dateToday = new Date(Date.now()).toISOString();
const initDate30DaysAgo = new Date(Date.now());
initDate30DaysAgo.setDate(initDate30DaysAgo.getDate() - 30);
let Date30DaysAgo = initDate30DaysAgo.toISOString();

export const getAccountHistory = async (
  address,
  fromDate = Date30DaysAgo,
  toDate = dateToday
) => {
  const dateToday = new Date(Date.now()).toISOString();
  const getAccountHistoryFromDate = fromDate ?? Date30DaysAgo;
  const getAccountHistoryToDate = toDate ?? dateToday;

  //
  //

  const BlockDateRangeEndpoint = `${await getNodeEndpoint()}/block/daterange/${getAccountHistoryFromDate}/${getAccountHistoryToDate}?noempty=true&limit=2`;

  //
  const blocksInRange = await axios.get(BlockDateRangeEndpoint);
  const oldestBlockInRange = blocksInRange.data.last_height;

  //

  const startingAccountHistoryEndpoint = `${await getNodeEndpoint()}/account/history/${address}?after=${oldestBlockInRange}`;

  const accountHistoryEndpoint = `${await getNodeEndpoint()}/account/history/${address}`;

  const firstEntryEndpoint = `${accountHistoryEndpoint}?limit=1`;
  const firstEntryResponse = await axios.get(
    firstEntryEndpoint,
    HTTP_REQUEST_HEADER
  );

  let allItems = [];

  let offset = 0;

  while (true) {
    const url = offset
      ? `${accountHistoryEndpoint}?after=${offset}`
      : startingAccountHistoryEndpoint;

    const response = await axios.get(url, HTTP_REQUEST_HEADER);

    let history = response.data && response.data.Items;

    if (response.data && response.data.Next === "") {
      allItems = allItems.concat(history); // accumulate
      break;
    }

    if (response.data && response.data.Next) {
      // assert this format in the Next field since it's not a useable address by itself
      if (!response.data.Next.match(/account\/history\/\?after=\d*/)) {
        throw new Error(
          `Expected /account/history?after=N, got ${response.data.Next}`
        );
      }
      allItems = allItems.concat(history); // accumulate

      // remove everything but the numbers from the url
      offset = response.data.Next.replace(/[^\d]/g, "");
    }
  }

  let isOldestInRangeFirstEntry =
    allItems[0].TxHash === firstEntryResponse.data.Items[0].TxHash;

  const allItemsObj = {
    allItems,
    isOldestInRangeFirstEntry,
  };

  // return allItems;
  return allItemsObj;
};

export const pollForAccountUpdates = ({ metadata, success }) => {
  return () => {
    if (metadata && metadata.type === "account") {
      getAccountHistory(metadata.identifier)
        .then((history) => {
          success && success(history);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};

/// //////////////////////////////////////
// NODE
/// //////////////////////////////////////

export const getNodeStatus = async (endpoint) => {
  const nodeEndpoint = endpoint || (await getNodeEndpoint());
  const statusEndpoint = `${nodeEndpoint}/node/status`;

  return axios
    .get(statusEndpoint, HTTP_REQUEST_HEADER)
    .then((response) => {
      const status = response.data.sync_info;
      return status;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getNodeHealth = async (nodeEndpoint) => {
  const healthEndpoint = `${nodeEndpoint}/health`;
  axios.defaults.timeout = 2000;
  const source = axios.CancelToken.source();
  const timeout = setTimeout(() => {
    source.cancel();
    axios.defaults.timeout = 0;
    return "Offline";
  }, 2000);

  return axios
    .get(healthEndpoint, HTTP_REQUEST_HEADER, { cancelToken: source.token })
    .then((response) => {
      clearTimeout(timeout);
      axios.defaults.timeout = 0;
      return response.data;
    })
    .catch((error) => {
      axios.defaults.timeout = 0;
      // console.error(error);
    });
};

export const getNodeEndpoint = async (node) => {
  var nodeEndpoint, health;
  //  var catchingUp
  while (true) {
    nodeEndpoint = await tryNodeEndpoint(node);
    health = await getNodeHealth(nodeEndpoint);
    if (health === "OK") {
      //      catchingUp = await getNodeStatus(node)
      //      if (catchingUp.catching_up) {
      //
      //        continue
      //      }
      return nodeEndpoint;
    } else {
      //
    }
  }
};

export const tryNodeEndpoint = async (node) => {
  const { location, history } = window;
  let query = qs.parse(location.search);
  let nodeName = node || query.node;

  if (validURL(window.decodeURI(nodeName))) {
    return window.decodeURI(nodeName);
  } else {
    let nodeEndpoint;
    if (!query || !query.node) {
      nodeName = DEFUALT_NODE_NAME;
      query = { node: nodeName };
      const newSearch = `?${qs.stringify(query)}`;
      const validURL = `${location.origin}${location.pathname}${newSearch}`;
      history.replaceState({}, "", validURL);
    }
    await axios.get(NODES_ENDPOINT, HTTP_REQUEST_HEADER).then((response) => {
      const { networks } = response.data;
      const nodeKey = networks[nodeName] ? nodeName : DEFUALT_NODE_NAME;
      const nodes = networks[nodeKey] && networks[nodeKey]["nodes"];
      const randomNodeIndex = Math.floor(
        Math.random() * Object.keys(nodes).length
      );
      const randomNode = Object.values(nodes)[randomNodeIndex];
      nodeEndpoint = randomNode && randomNode.api;
    });
    //
    return "https://" + nodeEndpoint;
  }
};

/// //////////////////////////////////////
// ORDER
/// //////////////////////////////////////

export const getCurrentOrder = async () => {
  const priceEndpoint = `${await getNodeEndpoint()}/price/current`;

  return axios
    .get(priceEndpoint, HTTP_REQUEST_HEADER)
    .then((response) => {
      return formatPriceInfo(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  // console.error(error)
};

//
export const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};
