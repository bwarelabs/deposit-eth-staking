const api = require("../scripts/depositETH")

task("deployContract")
    .addParam("depositContractAddress")
    .setAction(async (args) => {
        console.log("Deployed contract address:", await api.deployContract(args.depositContractAddress));
    });

task("callDeposit", "Call the deposit method of the contract and send Ether")
    .addParam("contractAddress")
    .addParam("amountToSendInEther")
    .addParam("batchSize")
    .setAction(async (args) => {
        console.log("Finalized with status:", await api.depositETH(args.contractAddress, args.amountToSendInEther, args.batchSize));
    });

task("deployContractDeposit")
    .setAction(async (args) => {
        console.log("Finalized with status:", await api.deployContractDeposit());
    });