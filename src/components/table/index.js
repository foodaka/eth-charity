import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const PaymentHistoryTable = (props) => {
  const {
    transactionHash,
    sentTo,
    gasUsed,
    blockHash,
    from
  } = props;

  return(
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>From</Table.HeaderCell>
          <Table.HeaderCell>To</Table.HeaderCell>
          <Table.HeaderCell>Transaction Hash</Table.HeaderCell>
          <Table.HeaderCell>Gas Used</Table.HeaderCell>
          <Table.HeaderCell>Block Hash</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{from}</Table.Cell>
          <Table.Cell>{sentTo}</Table.Cell>
          <Table.Cell>{transactionHash}</Table.Cell>
          <Table.Cell>{gasUsed}</Table.Cell>
          <Table.Cell>{blockHash}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default PaymentHistoryTable;
