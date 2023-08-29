const fs = require('fs');
module.exports = {
  
    attachToContract: async function (name, address) {
        return await ethers.getContractAt(name, address);
    },

    getTxStatus: async function (arguments, tx) {
        console.log(`
        - args: ${JSON.stringify([...arguments])} 
        - hash: ${tx.hash}\n`);
        return (await tx.wait()).status === 1 ? true : false;
    },

    getArrayOfData: function(filePath){
        const pubKeys = [];
        const withdrawalCredentials = [];
        const signatures = [];
        const depositMessageRoots = [];
        const depositDataRoots = [];
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const depositData = JSON.parse(jsonData)
        for (const entry of depositData) {
            pubKeys.push("0x" + entry.pubkey);
            withdrawalCredentials.push("0x" + entry.withdrawal_credentials);
            signatures.push("0x" + entry.signature);
            depositMessageRoots.push("0x" + entry.deposit_message_root);
            depositDataRoots.push("0x" + entry.deposit_data_root);
        }

        return { "pubKeys": pubKeys, "withdrawalCredentials": withdrawalCredentials, "signatures": signatures, "depositDataRoots": depositDataRoots };
    },

}
