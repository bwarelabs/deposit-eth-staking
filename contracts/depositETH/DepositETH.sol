// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Import the ABI of the DepositContract
import "./IDepositInterface.sol";

contract DepositETH {
    IDepositContract private _depositContract;

    constructor(address depositContractAddress) {
        _depositContract = IDepositContract(depositContractAddress);
    }

    function callDepositFunction(
        bytes[] calldata pubkeys,
        bytes[] calldata withdrawal_credentials,
        bytes[] calldata signatures,
        bytes32[] calldata deposit_data_roots,
        uint256 amountToSendInEther
    ) external payable {
        for (uint256 i = 0; i < pubkeys.length; i++) {
            _depositContract.deposit{ value: amountToSendInEther * 1 ether }(
                pubkeys[i],
                withdrawal_credentials[i],
                signatures[i],
                deposit_data_roots[i]
            );
        }
    }
}
