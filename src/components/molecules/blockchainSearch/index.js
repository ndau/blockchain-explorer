/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextInput, Menu, Text, Stack, Form } from 'grommet';
import qs from 'query-string';
import { Search } from 'grommet-icons';
import { getNodeEndpoint, getNodeStatus, validURL } from '../../../helpers/fetch';

export default function BlockchainSearch(props) {
  const navigate = useNavigate();
  const [invalidNode, setInvalidNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState(null);
  const [invalidType, setInvalidType] = useState(null);

  const changeNode = async (selectedNode) => {
    const nodeEnpoints = await getNodeEndpoint(selectedNode);
    getNodeStatus(nodeEnpoints).then((status) => {
      if (status) {
        // navigate(`${history.location.pathname}?node=${selectedNode}`);
        navigate(`${window.location.pathname}?node=${selectedNode}`);

        setInvalidNode(false);
      } else {
        setInvalidNode(selectedNode);
      }
    });
  };

  const changeSearchTerm = (event) => {
    const { value } = event.target;
    setInvalidNode(null);
    setSearchTerm(value && value.trim());
    setInvalidType(null);
  };

  const onSearch = (event) => {
    event.preventDefault();

    if (searchTerm) {
      const searchType = termType();
      setSearchType(searchType);
      setInvalidType(searchType ? false : true);
      goToURL();
    }
  };

  const termType = () => {
    if (!searchTerm) {
      return null;
    }

    const term = searchTerm.trim();
    const isInteger = Number(term);
    const termLength = searchTerm.length;

    if (isInteger && isInteger < 10000000) {
      return 'blockHeight';
    }

    if (termLength === 48 && searchTerm.slice(0, 2) === 'nd') {
      return 'address';
    }

    if (termLength === 22) {
      return 'transactionHash';
    }

    return null;
  };

  const goToURL = () => {
    const query = window.location.search;

    if (searchType === 'blockHeight') {
      return navigate(`/block/${searchTerm}/${query}`);
    }

    if (searchType === 'address') {
      return navigate(`/account/${searchTerm}/${query}`);
    }

    if (searchType === 'transactionHash') {
      return navigate(`/transaction/${searchTerm}/${query}`);
    }
  };

  const query = qs.parse(window.location.search);
  const currentNode = query.node;
  const nodes = [
    {
      label: 'mainnet',
      onClick: () => changeNode('mainnet'),
    },
    {
      label: 'testnet',
      onClick: () => changeNode('testnet'),
    },
  ];
  const invalidEntry = invalidType || invalidNode;
  const selectableNodes = nodes && nodes.filter((node) => node && node.label !== currentNode);

  return (
    <Box
      round="xsmall"
      border
      direction="row"
      // align="end"
      style={{
        borderColor: invalidEntry ? 'rgba(255,0,0,0.5)' : 'rgba(255,255,255,0.15)',
        background: invalidEntry ? 'rgba(255,0,0,0.05)' : 'transparent',
      }}
    >
      <Stack fill>
        {invalidEntry && (
          <Box justify="end" height="44px" align="center" animation={{ type: 'fadeIn', delay: 0, duration: 300 }}>
            {invalidNode ? (
              <Text color="red" size="xsmall" weight="bold">
                {invalidNode || 'node'} may be down!
              </Text>
            ) : (
              <Text color="red" size="xsmall" weight="bold">
                invalid entry!
              </Text>
            )}
          </Box>
        )}

        <Box justify="center" height="100%" width="100%">
          <Form onSubmit={onSearch}>
            <TextInput
              type="search"
              value={searchTerm}
              onChange={changeSearchTerm}
              spellCheck={false}
              plain
              size="small"
              placeholder="search for blocks, transactions or accounts..."
              style={{ paddingRight: '5px', zIndex: 0 }}
            />
          </Form>
        </Box>
      </Stack>

      {/* {
          currentNode && */}
      <Box background="rgba(0, 0, 0, 0.0)" align="center">
        <Menu
          size="xsmall"
          icon={false}
          items={selectableNodes}
          margin={{ horizontal: 'small' }}
          label={
            <Text color="#f99d1c" size="small">
              {!currentNode || validURL(currentNode) ? 'network' : currentNode}
            </Text>
          }
        />
      </Box>

      <Box
        onClick={onSearch}
        pad={{ right: '20px', left: 'small' }}
        justify="center"
        style={{
          height: '44px',
          background: 'rgba(0, 0, 0, 0.15)',
          borderRadius: '0 100% 100% 0',
        }}
        round="100%"
      >
        <Search color="rgba(255,255,255,0.7)" />
      </Box>
    </Box>
  );
}
