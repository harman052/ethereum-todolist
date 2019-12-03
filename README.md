## Simple Todo List - powered by React and Ethereum smart contracts

[`truffle`](https://www.trufflesuite.com/docs/truffle/overview) is required to compile and deployment the smart contract on blockchain. Download it with:

`npm install -g truffle`

### Compiling contracts

Clone this project, go to root directory and run following command to compile smart contracts:

`truffle compile`

Download and install [`Ganache`](https://www.trufflesuite.com/ganache) to setup blockchain locally on your system.

Start `Ganache`, create new workspace and add `truffle-config.json` to the workspace. At this point, contracts should be visible under Contracts tab as "Not Deployed".

Run:

`truffle migrate`

to deploy contracts on blockchain. Once it's completed, contracts under Contracts tab in Ganache should be visible as "Deployed". With this, the contracts are up and running.

Go to `client/` directory and install client side dependencies with:

`npm i`

Run `npm start` to finally run the app in browser.
