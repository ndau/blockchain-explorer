import React, { Component } from 'react'
import { Box, Text } from "grommet"
import Card from '../../atoms/card';

class TransactionDetails extends Component {
  render() {
    const { transaction } = this.props;
    if (!transaction) {
      return null;
    }

    const { 
      type,
      bonus,
      destination,
      distributionScript,
      newKeys,
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
      //validationKeys,
      validationScript, 
    } = transaction;

  
    return (
      <Card background="transparent">
        <Box>
          {
            type && 
            <Text as="section">
              <b>type: </b> {type}
            </Text>
          }
          {
            quantity && 
            <Text as="section">
              <b>quantity: </b> {quantity / 100000000}
            </Text>
          }
          {
            source &&
            <Text truncate as="article">
              <b>from: </b> {source}
            </Text>
          }
          {
            destination &&
            <Text truncate as="article">
              <b>to: </b> {destination}
            </Text>
          }
          {
            bonus &&
            <Text truncate as="article">
              <b>bonus: </b> {bonus}
            </Text>
          }
          {
            distributionScript &&
            <Text truncate as="article">
              <b>distribution script: </b> {distributionScript}
            </Text>
          }
          {
            newKeys &&
            <Text truncate as="article">
              <b>new keys: </b> {newKeys}
            </Text>
          }
          {
            node &&
            <Text truncate as="article">
              <b>node: </b> {node}
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
              <b>ownership: </b> {ownership}
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
              <b>public key: </b> {publicKey}
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
              <b>signature: </b> {signature}
            </Text>
          }
          {
            target &&
            <Text truncate as="article">
              <b>target: </b> {target}
            </Text>
          }
          {
            unlocksOn &&
            <Text truncate as="article">
              <b>unlocks on: </b> {unlocksOn}
            </Text>
          }
          {/* {
            validationKeys &&
            <Text truncate as="article">
              <b>validation keys: </b> {validationKeys}
            </Text>
          } */}
          {
            validationScript &&
            <Text truncate as="article">
              <b>validation script: </b> {validationScript}
            </Text>
          }
        </Box> 
      </Card>
    );
  }
}

export default TransactionDetails;