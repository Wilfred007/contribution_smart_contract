Contribution Smart Contract

This is a simple Solidity smart contract for managing contributions and withdrawals. The contract allows the owner to contribute Ether to the contract, store the amount contributed by each user, and later withdraw funds.
Features

    Contribute: Only the contract owner can contribute Ether to the contract.
    Withdraw: The contract owner can withdraw Ether from the contract.
    User Balance: Fetch the balance of a specific user (amount contributed).
    Owner Restricted Actions: Only the contract owner can perform the contribute and withdraw actions.

Table of Contents

    Installation
    Contract Details
    Functions
    Usage
    Testing
    License

Installation

    Clone the repository:

    bash

git clone https://github.com/your-username/contribution-contract.git
cd contribution-contract

Install dependencies:

This project requires Hardhat. To install Hardhat and other dependencies, run:

bash

npm install

Compile the contract:

To compile the smart contract, run:

bash

    npx hardhat compile

Contract Details

The Contribution contract allows for the management of funds contributed to the contract by the owner. It stores details such as:

    Owner: The account that deployed the contract.
    Contributions: Amounts contributed by users.
    Withdrawals: The owner can withdraw funds that have been contributed.

Key Data Structures:

    struct collection: Stores the user address and the contributed amount.
    mapping(address => collection) collections: Tracks each user's contribution.

Functions
Constructor

solidity

constructor()

    Initializes the contract by setting the owner to the address that deploys the contract.

contribute

solidity

function contribute() external payable OnlyOwner

    Allows the contract owner to contribute Ether to the contract.
    Increments the amount contributed by the sender (msg.sender).
    Stores the contribution in both collections and balances.

Requirements:

    The caller must be the owner.
    The value contributed (msg.value) must be greater than zero.

withdraw

solidity

function withdraw(uint _amount) external OnlyOwner

    Allows the contract owner to withdraw a specific amount of Ether from the contract balance.
    Updates the balance and the owner's contribution record accordingly.

Requirements:

    The caller must be the owner.
    The amount to withdraw must be greater than zero.

Returns: Transfers Ether to the owner’s address.
getUserBalance

solidity

function getUserBalance(address _user) external view returns (collection memory)

    Returns the contribution details of the specified _user (user address).

Returns:

    A collection struct containing the address and contributed amount for the user.

Modifiers
OnlyOwner

solidity

modifier OnlyOwner()

    Restricts the execution of functions to only the contract owner.

Usage
Contributing

To contribute Ether to the contract:

    Call the contribute() function, ensuring that the amount of Ether sent (msg.value) is greater than zero and you are the owner.

Withdrawing

To withdraw funds from the contract:

    Call the withdraw() function, specifying the amount to withdraw.

Checking User Balance

You can check the contribution details of a specific user using the getUserBalance() function by providing the user's address as an argument.
Example Interactions

    Contributing Ether:

    solidity

await contribution.connect(owner).contribute({ value: ethers.utils.parseEther("1.0") });

Withdrawing Ether:

solidity

await contribution.connect(owner).withdraw(ethers.utils.parseEther("0.5"));

Getting User Balance:

solidity

    const userBalance = await contribution.getUserBalance(addr1.address);
    console.log(userBalance.amount); // Displays the contributed amount

Testing

You can write unit tests using Hardhat to test the functionality of this contract.

    Run tests:

    bash

npx hardhat test

Sample test for contributing Ether:

javascript

it("Should allow the owner to contribute Ether", async function () {
    const ethAmount = ethers.utils.parseEther("1.0");
    await contribution.connect(owner).contribute({ value: ethAmount });
    const ownerBalance = await contribution.getUserBalance(owner.address);
    expect(ownerBalance.amount).to.equal(ethAmount);
});

Sample test for withdrawing Ether:

javascript

    it("Should allow the owner to withdraw Ether", async function () {
        const ethAmount = ethers.utils.parseEther("1.0");
        await contribution.connect(owner).contribute({ value: ethAmount });
        await contribution.connect(owner).withdraw(ethers.utils.parseEther("0.5"));
        const ownerBalance = await contribution.getUserBalance(owner.address);
        expect(ownerBalance.amount).to.equal(ethers.utils.parseEther("0.5"));
    });

License

This project is licensed under the MIT License. See the LICENSE file for more details.# contribution_smart_contract
# contribution_smart_contract
