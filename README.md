# Deposit ETH for Staking

## Prerequisites


* Visual Studio Code
* Docker
* Install Docker extension from Visual Studio Extensions


## Setup

* Open the project in docker container
* Run `npm install` in order to install the necessary dependencies like HardHat

## Usage

* Run `npx hardhat clean` and `npx hardhat compile` to compile the smart contract in order to obtain the ABI of `DepositETH` (this contract will be used to call the Deposit contract deployed on ETH Goerli)
* You will get three new files: abis, artifacts and cache
* From here there are three options: To use the already deployed contract to deposit ETH, deploy your own contract, or use the Goerli Etherscan Explorer. 

### Use already deployed contract

* For this option you will have to use HardHat tasks to interact with the deployed smart contract
* In `task` folder are implemented two tasks: `deployContract` and `callDeposit`.
* The `callDeposit` task will call a method from `scripts/depositETH`. The `depositETH` method is designed to simplify the process of making batch deposits of Ether into Deposit contract. It takes the contract address, the amount of Ether to send per deposit, and a batch size as inputs. The function processes data in batches, initiating deposit transactions for each batch on the Deposit contract. This method retrieves the data from a JSON file but you can pass data manually also. For each batch, it constructs deposit-related data arrays, calculates the total Ether value for the batch, and triggers a deposit transaction on the contract. The function logs the transaction status and completion for each batch.
* Here is an example of how to execute the `callDeposit` task:
  `npx hardhat callDeposit --contract-address <"deployed contract address"> --amount-to-send-in-ether 32 --batch-size 5 --network goerli`
* Before you run this task it's essential to generate an .env file and input the required parameters for the hardhat configuration. These parameters include the private key for the designated wallet responsible for submitting the deposit transaction, an apiKey for etherscan, and a Goerli RPC Endpoint, which can be obtained from Blast (https://blastapi.io/public-api/ethereum). For your convenience, a .env file is already included in this repository as a template.
* The address of the deployed contract is: `0xcEf38aa79178F31A2B8B2949E515D42FD6b2DD84`


### Deploy your own smart contract

* For this alternative, your initial step involves deploying the smart contract. To achieve this, you must initiate the  `deployContract` task.
* Here is an example command: `npx hardhat deployContract --deposit-contract-address <"Deposit Contract address"> --network goerli`. The specific Deposit Contract address for Goerli network is : `0xff50ed3d0ec03aC01D4C79aAd74928BFF48a7b2b`.
* Once the task successfully completed, you'll obtain your own smart contract's address.
* Now you can use the first option to deposit ETH on the Deposit contract using your self-deployed smart contract.


### Use Etherscan to make a deposit

* If you prefer not to deploy a contract or establish a development environment, an alternative approach is utilizing the Goerli Etherscan Explorer to make a deposit. To do this, follow the URL: https://goerli.etherscan.io/address/0xcEf38aa79178F31A2B8B2949E515D42FD6b2DD84#code. From there, proceed to the `Write Contract` tab, connect your wallet to the explorer, and complete the provided fields with the required data.




