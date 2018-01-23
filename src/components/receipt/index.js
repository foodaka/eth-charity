import React, {Component} from 'react';
import { Icon, Label, Segment, Card } from 'semantic-ui-react'
import styles from './styles.css';

export const Receipt = (props) => {
  const {
    transactionHash,
    to,
    gasUsed,
    blockHash,
    from,
    handleClose,
    amount
  } = props;

  return (
    <Card fluid className="receiptWrapper">
      <div className="details">
        <h2 style={{letterSpacing:'1.8px'}}>Transaction Details</h2>
        <i className="fa fa-times iconClose" aria-hidden="true" onClick={handleClose}></i>
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
        <div>Amount:</div>
        <div>{amount}</div>
      </div>
      <div className="sectionDetails">
        <div>Transaction Hash:</div>
        <div><a className="link" href={`https://rinkeby.etherscan.io/tx/${transactionHash}`} target="_blank">{transactionHash}</a></div>
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
