// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


contract Contribution {

    address public owner;
    uint count = 0;
    uint balance = 0;

    struct collection {
        // string name;
        address user;
        uint amount; 
        // uint balance;
    }
    // struct balance {
    //     string name;
    //     uint amount;
    // }

    constructor() {
        owner = msg.sender;
    }

    modifier OnlyOwner () {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    mapping (address => collection) collections;
    mapping (address => uint256) balances;

    function contribute () external payable OnlyOwner{
        require(msg.sender != address(0), "Adress zero not allowed");
        require(msg.value > 0, "Cant contribute zero amount");

        // collection storage coll = collection(msg.sender, msg.value})
    

        collections[msg.sender].amount += msg.value;
        collections[msg.sender].user = msg.sender;
        count++;
        balance += msg.value;
        balances[msg.sender] += msg.value;
    }

    function withdraw (uint _amount) external OnlyOwner{
        require(msg.sender != address(0), "Address zero cannot withdraw");
        require(_amount > 0, "Cant withdraw zero amount");
        balance -= _amount;
        collections[msg.sender].amount -= _amount;
        balances[msg.sender] -= _amount;
        (bool success,) = msg.sender.call{value:_amount}("");
        require(success, "transfer failed");
    }

    function getUserBalance (address _user) external view returns(collection memory){
        return collections[_user];
    }


    
}