// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.0;

// import "hardhat/console.sol";
contract Token {
string public name="shahid nawaz";
string public symbol="HHT";
uint public totalSupply=1000;
address public owner;
mapping (address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner=msg.sender;
    }
    function Transfer(address to, uint amount)external {
    //    console.log("**Sennder Balance of %s tocken**", balances[msg.sender]); 
    //    console.log("sender is sending balance %s to ", amount , to); 
       require(balances[msg.sender]>=amount,"Not enough tokens");
       balances[msg.sender]-=amount;
       balances[to] += amount;
    }

    function balancesOf(address account) external view returns(uint){
        return balances[account];
    }
}