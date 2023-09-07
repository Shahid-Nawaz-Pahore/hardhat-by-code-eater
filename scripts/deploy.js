const { ethers } = require('hardhat');

async function main() {
    // Get the account deploying the contract
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);

    // Deploy the Token contract
    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy();

    await token.deployed();

    console.log('Token contract deployed to:', token.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
