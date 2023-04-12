// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import {Initializable} from '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock is Initializable {
    uint public unlockTime;
    address payable public owner;

    event OwnerChange(address newOwner);
    event Withdrawal(uint amount, uint when);

    function initialize(uint _unlockTime, address payable _owner) external payable initializer {
        require(block.timestamp < _unlockTime, 'Unlock time should be in the future');

        unlockTime = _unlockTime;
        owner = _owner;
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

    function changeOwner(address _owner) external {
        require(msg.sender == owner, '!OWNER');
        owner = payable(_owner);

        emit OwnerChange(_owner);
    }
}
