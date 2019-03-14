import React, { Component } from 'react'
import { Box, Text, Anchor } from "grommet"
import Card from '../../atoms/card';
import TruncatedText from '../../atoms/truncatedText'
import { makeURLQuery } from '../../../helpers';

class TransactionDetails extends Component {
  render() {
    const { transaction } = this.props;
    if (!transaction) {
      return null;
    }

    const { 
      type,
      bonus,
      blockHeight,
      destination,
      distributionScript,
      // newKeys,
      node,
      noticePeriod,
      ownership,
      period,
      power,
      publicKey,
      quantity,
      RPCAddress,
      random,
      sequence,
      sidechainID,
      sidechainSignableBytes,
      sidechainSignatures,
      signature, // signatures,
      source,
      target,
      unlocksOn,
      validationKeys,
      validationScript, 
    } = transaction;

    return (
      <Card>
        <Box overflow="scroll">
          {
            type && 
            <Text as="article">
              <b>type: </b> {type}
            </Text>
          }
          {
            quantity && 
            <Text as="article">
              <b>quantity: </b> {quantity / 100000000}
            </Text>
          }
          {
            source &&
            <Text truncate as="article">
              <b>from: </b>
              <Anchor href={`/account/${source}/${makeURLQuery()}`}>
                <TruncatedText value={source} />
              </Anchor>
            </Text>
          }
          {
            destination &&
            <Text truncate as="article">
              <b>to: </b>
              <Anchor href={`/account/${destination}/${makeURLQuery()}`}>
                <TruncatedText value={destination} />
              </Anchor>
            </Text>
          }
          {
            bonus &&
            <Text truncate as="article">
              <b>bonus: </b> {bonus}
            </Text>
          }
          {
            blockHeight && 
            <Text as="section">
              <b>block height: </b> 
              <Anchor 
                label={blockHeight} 
                href={`/block/${blockHeight}/${makeURLQuery()}`}
              />
            </Text>
          }
          {
            distributionScript &&
            <Text truncate as="article">
              <b>distribution script: </b>  <TruncatedText value={distributionScript} />
            </Text>
          }
          {
            validationKeys &&
            <Text truncate as="article">
              <b>validation keys: </b> <TruncatedText value={validationKeys} />
            </Text>
          }
          {
            node &&
            <Text>
              <b>node: </b>
              <Anchor href={`/account/${node}/${makeURLQuery()}`}>
                <TruncatedText value={node} />
              </Anchor>
            </Text>
          }
          {
            noticePeriod &&
            <Text truncate as="article">
              <b>notice period: </b> {noticePeriod}
            </Text>
          }
          {
            ownership &&
            <Text truncate as="article">
              <b>ownership: </b> <TruncatedText value={ownership} />
            </Text>
          }
          {
            period &&
            <Text truncate as="article">
              <b>period: </b> {period}
            </Text>
          }
          {
            power &&
            <Text truncate as="article">
              <b>power: </b> {power}
            </Text>
          }
          {
            publicKey &&
            <Text truncate as="article">
              <b>public key: </b> <TruncatedText value={publicKey} />
            </Text>
          }
          {
            RPCAddress &&
            <Text truncate as="article">
              <b>RPC Address: </b> {RPCAddress}
            </Text>
          }
          {
            random &&
            <Text truncate as="article">
              <b>random: </b> {random}
            </Text>
          }
          {
            sequence &&
            <Text truncate as="article">
              <b>sequence: </b> {sequence}
            </Text>
          }
          {
            sidechainID &&
            <Text truncate as="article">
              <b>sidechain ID: </b> {sidechainID}
            </Text>
          }
          {
            sidechainSignableBytes &&
            <Text truncate as="article">
              <b>sidechain signable bytes: </b> {sidechainSignableBytes}
            </Text>
          }
          {
            sidechainSignatures &&
            <Text truncate as="article">
              <b>sidechain signatures: </b> {sidechainSignatures}
            </Text>
          }
          {
            signature &&
            <Text truncate as="article">
              <b>signatures: </b>
              <TruncatedText value={signature} />
            </Text>
          }
          {
            target &&
            <Text truncate as="article">
              <b>target: </b>
              <Anchor href={`/account/${target}/${makeURLQuery()}`}>
                <TruncatedText value={target} />
              </Anchor>
            </Text>
          }
          {
            unlocksOn &&
            <Text truncate as="article">
              <b>unlocks on: </b> {unlocksOn}
            </Text>
          }
          {
            validationScript &&
            <Text truncate as="article">
              <b>validation script: </b> 
              <TruncatedText value={validationScript} />
            </Text>
          }
        </Box> 
      </Card>
    );
  }
}

export default TransactionDetails;