import React, { Component } from 'react';

import HDWalletProvider from 'truffle-hdwallet-provider';
import web3  from './web3';
import { Card, Input, Dropdown, Button, Label } from 'semantic-ui-react';
import { SweetAlert } from './components/sweetalert';

import logo from './logo.svg';

import { charityOptions } from './common'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { hasSuccess: false, selectedCharity: '' }
  }

  async componentDidMount(){
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
      const sendEth = await web3.eth.sendTransaction({
        to: selectedCharity,
        // value: web3.utils.toWei( this.state.amount,'ether'),
        value: (this.state.amount,'ether'),

        from: this.state.account
      });

      if(sendEth) {
        SweetAlert({
          title:'Success',
          text:'You have successfully sent the transaction',
          type:'success'
        })
      }
    } catch(err) {
      console.log('err', err);
      SweetAlert({
        title: 'Oops',
        text: 'An error occured',
        type: 'error'
      })
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
            <div className="section">
              <div className="charity">
                <div>Select Charity</div>
                <Dropdown
                  onChange={this.handleSelectCharity}
                  placeholder='Select A Charity'
                  selection
                  className="dropdown"
                  fluid
                  options={charityOptions}
                />
              </div>
              <div className="charity">
                <div>Enter Amount In Ethereum</div>
                <Input className='input' onChange={this.handleEthAmount} labelPosition='right' type='text' placeholder='Amount'>
                  <Label basic>$</Label>
                  <input />
                  <Label>.00</Label>
                </Input>
              </div>
            </div>
            <Button color="green" onClick={this.sendEth}>Donate Now!</Button>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
