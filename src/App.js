import React, { Component } from "react";
import HDWalletProvider from "truffle-hdwallet-provider";

import web3 from "./web3";
import {
  Card,
  Input,
  Dropdown,
  Button,
  Label,
  Loader
} from "semantic-ui-react";
import { SweetAlert } from "./components/sweetalert";
import { charityOptions } from "./common";
import { Receipt } from "./components/receipt";
import sprout from "./sprout.jpg";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSuccess: false,
      selectedCharity: "",
      sentSuccess: false,
      isLoading: false
    };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();

    if (accounts.length < 1) {
      this.setState({
        errorMessage: "You must log into MetaMask and use chrome to send ether"
      });
    }
    this.setState({ account: accounts[0] });
  }

  handleEthAmount = (e, { value }) => {
    this.setState({ amount: value });
  };

  sendEth = async () => {
    const { selectedCharity } = this.state;

    this.setState({ isLoading: true });

    try {
      const sendEth = await web3.eth.sendTransaction({
        to: selectedCharity,
        value: web3.utils.toWei(this.state.amount, "ether"),
        from: this.state.account
      });

      if (sendEth) {
        SweetAlert({
          title: "Success",
          text: "You have successfully sent the transaction",
          type: "success"
        });

        this.setState({
          ...sendEth,
          sentSuccess: true,
          isLoading: false
        });
      }
    } catch (err) {
      SweetAlert({
        title: "Oops",
        text: "An error occured",
        type: "error"
      });
      this.setState({ isLoading: false });
    }
  };

  handleSelectCharity = (e, { value }) => {
    this.setState({ selectedCharity: value });
  };

  render() {
    const { sentSuccess } = this.state;

    return (
      <div className="App" style={{ backgroundImage: `url(${sprout})` }}>
        <div style={{ display: sentSuccess ? "none" : "" }}>
          <header className="App-header" />
          <Loader
            inverted
            className="loading"
            active={this.state.isLoading}
          >
            <span>
              Sit tight, this could take up to 30seconds to process...
            </span>
          </Loader>

          <div className="payment">
            <Card fluid header="Payment">
              <div className="section">
                <h1 className="title">Make A Donation</h1>
                <div className="charity">
                  <div>Select Charity</div>
                  <Dropdown
                    onChange={this.handleSelectCharity}
                    placeholder="Select A Charity"
                    selection
                    className="dropdown"
                    fluid
                    options={charityOptions}
                  />
                </div>
                <div className="charity">
                  <div>Enter Amount In Ethereum</div>
                  <Input className="input" onChange={this.handleEthAmount}>
                    <Label className="ethSymbol" basic>
                      ETH
                    </Label>
                    <input />
                  </Input>
                </div>
                <Button
                  className="donate"
                  inverted
                  disabled={this.state.isLoading}
                  standard
                  onClick={this.sendEth}
                >
                  Donate Now!
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {sentSuccess &&
          <div>
            <Receipt {...this.state} />
          </div>}
      </div>
    );
  }
}

export default App;
