const {expect} =  require("chai");
 

describe("Token Contract", function(){
     it("Deployment should assign assign the total supply of tokens to the owner",
     async function(){
      const [owner] = await ethers.getSigners();
      console.log("Signers object:",owner);
      const Token=await ethers.getContractFactory("Token");
      const hardhatToken= await Token.deploy();
      const ownerBlance = await hardhatToken.balancesOf(owner.address)
      console.log("Owner Address :", owner.address)

      expect(await hardhatToken.totalSupply()).to.equal(ownerBlance);
     })
})