const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
    let Token;
    let token;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        await token.deployed();
    });

    it("Should set the correct name, symbol, totalSupply, and owner", async function () {
        expect(await token.name()).to.equal("shahid nawaz");
        expect(await token.symbol()).to.equal("HHT");
        expect(await token.totalSupply()).to.equal(1000);
        expect(await token.owner()).to.equal(owner.address);
    });

    it("Should transfer tokens between accounts", async function () {
        const initialBalanceOwner = await token.balancesOf(owner.address);
        const transferAmount = 100;

        // Transfer tokens from owner to addr1
        await token.Transfer(addr1.address, transferAmount);

        // Check balances after the transfer
        const finalBalanceOwner = await token.balancesOf(owner.address);
        const finalBalanceAddr1 = await token.balancesOf(addr1.address);

        expect(finalBalanceOwner).to.equal(initialBalanceOwner - transferAmount);
        expect(finalBalanceAddr1).to.equal(transferAmount);
    });

    it("Should not allow transfers if sender has insufficient balance", async function () {
        const initialBalanceAddr1 = await token.balancesOf(addr1.address);

        // Try to transfer more tokens than addr1 has
        const transferAmount = 10000;

        await expect(token.Transfer(addr1.address, transferAmount)).to.be.revertedWith("Not enough tokens");

        // Check that the balance of addr1 remains unchanged
        const finalBalanceAddr1 = await token.balancesOf(addr1.address);

        expect(finalBalanceAddr1).to.equal(initialBalanceAddr1);
    });
});
