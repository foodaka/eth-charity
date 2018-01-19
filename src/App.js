import React, { Component } from 'react';

import HDWalletProvider from 'truffle-hdwallet-provider';
import web3  from './web3';
import { Card, Input, Dropdown, Button } from 'semantic-ui-react';

import logo from './logo.svg';

import { charityOptions } from './common'

import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {hasSuccess: false}
  }

  async componentDidMount(){
    const accounts = await web3.eth.accounts;

    if (typeof web3 !== 'undefined') {

    } else {

    }

    this.setState({ account: accounts[0]})
  }

  handleEthAmount = (e, {value}) => {
    this.setState({ amount: value });
  }

  sendEth = () => {
     web3.eth.sendTransaction({
      to: '0x0cd8Ed26744FFF2F2007d5F4787922a3D4832C54',
      value: web3.toWei('1','ether'),
      from: this.state.account
    },(err) => {
      console.log('err',err);
    })

    this.setState({ hasSuccess: 'You have sent the ETH' })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Make A Donation</h1>
        </header>
        <div className='payment'>
          <Card fluid header="Payment">
            <Dropdown placeholder='Select A Charity' fluid selection options={charityOptions} />
            <h2>Enter Amount</h2>
            <Input onChange={this.handleEthAmount} />
            <Button color="green" onClick={this.sendEth}>Send ETH!</Button>
          </Card>
          { this.state.hasSuccess && <div style={{color:'green'}}>{this.state.hasSuccess}</div>}
        </div>
      </div>
    );
  }
}

export default App;
