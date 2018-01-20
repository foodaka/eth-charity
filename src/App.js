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
    this.state = { hasSuccess: false, selectedCharity: '' }
  }

  async componentDidMount(){
    // const accounts = await web3.eth.accounts;
    const accounts = await web3.eth.getAccounts();

    if(accounts.length < 1) {
      this.setState({ errorMessage: 'You must log into MetaMask and use chrome to send ether' })
    }
    this.setState({ account: accounts[0]})
  }

  handleEthAmount = (e, {value}) => {
    this.setState({ amount: value });
  }

  sendEth = async () => {
    const { selectedCharity } = this.state;

    try {
      await web3.eth.sendTransaction({
        to: selectedCharity,
        value: web3.utils.toWei( this.state.amount,'ether'),
        from: this.state.account
      })
    } catch(err) {
      console.log('error', err);
    }
  }

  handleSelectCharity = (e,{value}) => {
    this.setState({ selectedCharity: value });
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Make A Donation</h1>
        </header>
        <div className='payment'>
          <Card fluid header="Payment">
            <Dropdown
              onChange={this.handleSelectCharity}
              placeholder='Select A Charity'
              fluid
              selection
              options={charityOptions}
            />
            <h2>Enter Amount</h2>
            <Input onChange={this.handleEthAmount} />
            <Button color="green" onClick={this.sendEth}>Send ETH!</Button>
          </Card>
          { this.state.errorMessage &&
            <div style={{color:'red'}}>
              {this.state.errorMessage}
            </div>
          }
          { this.state.hasSuccess && <div style={{color:'green'}}>{this.state.hasSuccess}</div>}
        </div>
      </div>
    );
  }
}

export default App;
