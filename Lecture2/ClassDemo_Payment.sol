pragma solidity 0.5.8;

contract Payment { 
    event Transferred(address src, address destination, uint256 amount, uint256 balance);
    mapping(address => uint256) balance;
    
    function holdEscrow() public payable {
        balance[msg.sender] = msg.value;
    }
    
    function transferTo(address payable dst, uint amount) public { 
        balance[msg.sender] -= amount;
        dst.transfer(amount);
        emit Transferred(msg.sender, dst, amount, balance[msg.sender]);
    }
    
}
