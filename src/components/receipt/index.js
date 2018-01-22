import React, {Component} from 'react';
import { Icon, Label, Segment, Card } from 'semantic-ui-react'
import styles from './styles.css';

export const Receipt = (props) => {
  const {
    transactionHash,
    to,
    gasUsed,
    blockHash,
    from
  } = props;

  return (
    <Card fluid className="receiptWrapper">
      <div className="details">
        <h2 style={{letterSpacing:'1.8px'}}>Transaction Details</h2>
      </div>
      <div className="sectionDetails">
        <div>From:</div>
        <div>{from}</div>
      </div>
      <div className="sectionDetails">
        <div>To:</div>
        <div>{to}</div>
      </div>
      <div className="sectionDetails">
        <div>Transaction Hash:</div>
        <div>{transactionHash}</div>
      </div>
      <div className="sectionDetails">
        <div>Gas Used:</div>
        <div>{gasUsed}</div>
      </div>
      <div className="sectionDetails">
        <div>Block Hash:</div>
        <div>{blockHash}</div>
      </div>
    </Card>
  )
}
