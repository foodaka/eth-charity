const assert = require('assert');
const ganache = require('ganache-cli');
//local test network
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);


let accounts;
beforeEach( async () => {
  accounts = await web3.eth.getAccounts();
})

describe('it should test payment', () => {
  it('should send money', async () => {

    const initialBalanceAccount = await web3.eth.getBalance(accounts[0]);
    await web3.eth.sendTransaction({
      to: accounts[1],
      value: web3.utils.toWei('1' ,'ether'),
      from: accounts[0]
    })
    const finalBalanceAccount = await web3.eth.getBalance(accounts[0]);

    console.log('initialBalanceAccount', initialBalanceAccount);
    console.log('finalBalanceAccount', finalBalanceAccount);
    assert( finalBalanceAccount !== initialBalanceAccount)
  })
})
