import React, { Component } from 'react'
import { Box, Text } from "grommet"
import Anchor from '../../atoms/anchor'
import Card from '../../atoms/card'
import Value from '../../molecules/value'
import TruncatedText from '../../atoms/truncatedText'

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
      ownershipKey,
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
      signatures,
      source,
      target,
      unlocksOn,
      validationKeys,
      validationScript, 
    } = transaction;

    return (
      <Card>
        <Box>
          {
            quantity && 
            <Text className="detailField" padding="5px 0">
              <b>amount: </b> <Value value={quantity} />
            </Text>
          }
          {
            source &&
            <Text className="detailField" padding="5px 0">
              <b>from: </b>
              <Anchor href={`/account/${source}`}>
                <TruncatedText value={source} />
              </Anchor>
            </Text>
          }
          {
            destination &&
            <Text className="detailField" padding="5px 0">
              <b>to: </b>
              <Anchor href={`/account/${destination}`}>
                <TruncatedText value={destination} />
              </Anchor>
            </Text>
          }
          {
            target &&
            <Text className="detailField" padding="5px 0">
              <b>target: </b>
              <Anchor href={`/account/${target}`}>
                <TruncatedText value={target} />
              </Anchor>
            </Text>
          }
          {
            type && 
            <Text className="detailField" padding="5px 0">
              <b>type: </b> <Value value={type} />
            </Text>
          }
          {
            bonus &&
            <Text className="detailField" padding="5px 0">
              <b>bonus: </b> <Value value={bonus} />
            </Text>
          }
          {
            blockHeight && 
            <Text className="detailField" padding="5px 0">
              <b>block height: </b> 
              <Anchor 
                label={blockHeight} 
                href={`/block/${blockHeight}`}
              />
            </Text>
          }
          {
            distributionScript &&
            <Text className="detailField" padding="5px 0">
              <b>distribution script: </b>  <Value value={distributionScript} />
            </Text>
          }
          {
            validationKeys &&
            <Text className="detailField" padding="5px 0">
              <b>validation keys: </b> <Value value={validationKeys} />
            </Text>
          }
          {
            node &&
            <Text className="detailField" padding="5px 0">
              <b>node: </b>
              <Anchor href={`/account/${node}`}>
                <TruncatedText value={node} />
              </Anchor>
            </Text>
          }
          {
            noticePeriod &&
            <Text className="detailField" padding="5px 0">
              <b>notice period: </b> <Value value={noticePeriod} />
            </Text>
          }
          {
            ownershipKey &&
            <Text className="detailField" padding="5px 0">
              <b>ownership key: </b> <Value value={ownershipKey} />
            </Text>
          }
          {
            period &&
            <Text className="detailField" padding="5px 0">
              <b>period: </b> <Value value={period} />
            </Text>
          }
          {
            power &&
            <Text className="detailField" padding="5px 0">
              <b>power: </b> <Value value={power} />
            </Text>
          }
          {
            publicKey &&
            <Text className="detailField" padding="5px 0">
              <b>public key: </b> <Value value={publicKey} />
            </Text>
          }
          {
            RPCAddress &&
            <Text className="detailField" padding="5px 0">
              <b>RPC Address: </b> <Value value={RPCAddress} />
            </Text>
          }
          {
            random &&
            <Text className="detailField" padding="5px 0">
              <b>random: </b> <Value value={random} />
            </Text>
          }
          {
            sequence &&
            <Text className="detailField" padding="5px 0">
              <b>sequence: </b> <Value value={sequence} />
            </Text>
          }
          {
            sidechainID &&
            <Text className="detailField" padding="5px 0">
              <b>sidechain ID: </b> <Value value={sidechainID} />
            </Text>
          }
          {
            sidechainSignableBytes &&
            <Text className="detailField" padding="5px 0">
              <b>sidechain signable bytes: </b> <Value value={sidechainSignableBytes} />
            </Text>
          }
          {
            sidechainSignatures &&
            <Text className="detailField" padding="5px 0">
              <b>sidechain signatures: </b> <Value value={sidechainSignatures} />
            </Text>
          }
          {
            signatures &&
            <Text className="detailField" padding="5px 0">
              <b>signature(s): </b> <Value value={signatures} />
            </Text>
          }
          {
            unlocksOn &&
            <Text className="detailField" padding="5px 0">
              <b>unlocks on: </b> <Value value={unlocksOn} />
            </Text>
          }
          {
            validationScript &&
            <Text className="detailField" padding="5px 0">
              <b>validation script: </b> <Value value={validationScript} />
            </Text>
          }
        </Box> 
      </Card>
    );
  }
}

export default TransactionDetails;