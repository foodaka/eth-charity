import React, { Component } from 'react';
// import ganache from 'ganache-cli';

import HDWalletProvider from 'truffle-hdwallet-provider';
import web3  from './web3';
import { Card, Input, Dropdown, Button } from 'semantic-ui-react';

import logo from './logo.svg';

import { charityOptions } from './common'

import './App.css';


// const provider = new HDWalletProvider(
//   'call glow acoustic vintage front ring trade assist shuffle mimic volume reject',
//   'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
// );
// const web3 = new Web3(provider);


var accounts = web3.eth.accounts;
console.log(accounts);
class App extends Component {

  componentDidMount(){

    if (typeof web3 !== 'undefined') {
      this.setState({ hasWeb3: true })
      // console.log('has web account', web3.eth.accounts[0]);
      // console.log('we have');
      // console.log('web3', web3);
      // web3 = new Web3(web3.currentProvider);
    } else {

    }
  }

  handleEthAmount = (e, {value}) => {
    this.setState({ amount: value });
  }

  sendEth = () => {

    web3.eth.sendTransaction({
      to: '0x0cd8Ed26744FFF2F2007d5F4787922a3D4832C54',
      value: web3.toWei('1','ether'),
      from: this.state.account
    }, (err) => {
      console.log('err',err);
    })
  }

  render() {

    // web3.eth.getAccounts()
    // .then( console.log)


    return (
      <div className="App">
        <header className="App-header">
          <h1>Make A Donation</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className='payment'>
          <Card fluid header="Payment">
            <Dropdown placeholder='Select A Charity' fluid selection options={charityOptions} />
            <h2>Enter Amount</h2>
            <Input onChange={this.handleEthAmount} />
            <Button color="green" onClick={this.sendEth}>Send ETH!</Button>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
