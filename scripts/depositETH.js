const { attachToContract, getTxStatus, getArrayOfData } = require("./utility/tools");

module.exports = {
    deployContract: async function (depositContractAddress) {
        const [deployer] = await ethers.getSigners();
        console.log(`Deployer of faucet contract: ${deployer.address}`);
        console.log(`Deployer balance: ${await deployer.getBalance()}`);

        const DepositETH = await ethers.getContractFactory('DepositETH');
        const depositContract = await DepositETH.deploy(depositContractAddress);
        console.log(`Deploy contract transaction hash: ${depositContract.deployTransaction.hash}`);
        await depositContract.deployed();

        return depositContract.address;
    },

    depositETH: async function (contractAddress, amountToSendInEther, batchSize) {
        const depositContract = await attachToContract('DepositETH', contractAddress);
        const extractedData = getArrayOfData('/workspaces/depositETHStaking/deposits.json');
        const totalElements = extractedData.pubKeys.length;

        let startIndex = 0;
        while (startIndex < totalElements) {
            const endIndex = Math.min(startIndex + batchSize, totalElements);
            const pubKeysBatch = extractedData.pubKeys.slice(startIndex, endIndex);
            const withdrawalCredentialsBatch = extractedData.withdrawalCredentials.slice(startIndex, endIndex);
            const signaturesBatch = extractedData.signatures.slice(startIndex, endIndex);
            const depositDataRootsBatch = extractedData.depositDataRoots.slice(startIndex, endIndex);
            const totalAmount = amountToSendInEther * pubKeysBatch.length;

            const tx = await depositContract.callDepositFunction(pubKeysBatch, withdrawalCredentialsBatch, signaturesBatch, depositDataRootsBatch, amountToSendInEther, {
                value: ethers.utils.parseEther(totalAmount.toString()),
            });

            console.log(await getTxStatus(pubKeysBatch, tx));

            console.log(`Batch deposit transaction for elements ${startIndex} to ${endIndex} successful`);
            startIndex = endIndex;
        }
        return true;
    },

    deployContractDeposit: async function () {
        const [deployer] = await ethers.getSigners();
        console.log(`Deployer of faucet contract: ${deployer.address}`);
        console.log(`Deployer balance: ${await deployer.getBalance()}`);

        const DepositContract = await ethers.getContractFactory('DepositContract');
        const depositContract = await DepositContract.deploy();
        console.log(`Deploy contract transaction hash: ${depositContract.deployTransaction.hash}`);
        await depositContract.deployed();
        return depositContract.address;
    },

}