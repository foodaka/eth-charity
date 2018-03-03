import React, { Component } from "react";
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
  state = {
    selectedCharity: "",
    sentSuccess: false,
    isLoading: false,
    errorMessage: false
  };

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();

      if (accounts.length < 1) {
        return this.triggerAccountErrorMessage();
      }
      this.setState({ account: accounts[0] });

    } catch (err) {
      return this.triggerGenereralErrorMessage();
    }
  }

  triggerGenereralErrorMessage = () => {
    SweetAlert({
      title: "Oops",
      text: "An error occured or the transaction was rejected",
      type: "error"
    });
    this.setState({ isLoading: false });
  };

  triggerAccountErrorMessage = () => {
    this.setState({
      errorMessage: "You must log into MetaMask and use chrome to send ether"
    });
  };

  handleEthAmount = (e, { value }) => {
    if(!this.state.account) return this.triggerAccountErrorMessage();

    this.setState({ amount: value, errorMessage: false });
  };

  sendEth = async () => {
    const { selectedCharity } = this.state;

    if (!this.state.account) return this.triggerAccountErrorMessage();

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
      return this.triggerGenereralErrorMessage();
    }
  };

  handleSelectCharity = (e, { value }) => {
    this.setState({ selectedCharity: value });
  };

  closeReceipt = () => {
    this.setState({ sentSuccess: false });
  };

  render() {
    const { sentSuccess } = this.state;

    return (
      <div className="App" style={{ backgroundImage: `url(${sprout})` }}>
        <div style={{ display: sentSuccess ? "none" : "" }}>
          <header className="App-header" />
          {this.state.errorMessage &&
            <span className="error">
              {" "}You must be logged into MetaMask to use this web application{" "}
            </span>}
          <Loader inverted className="loading" active={this.state.isLoading}>
            <span>
              Sit tight, this could take up to 30seconds to process...
            </span>
          </Loader>
          <div className="payment">
            <Card fluid>
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
                  // standard={true}
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
            <Receipt {...this.state} handleClose={this.closeReceipt} />
          </div>}
      </div>
    );
  }
}

export default App;
