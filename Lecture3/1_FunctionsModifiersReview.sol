pragma solidity 0.5.1;

contract FunctionsReview {
    uint256 public myInteger;

    function setNewInteger(uint256 newInteger) public {
        myInteger = newInteger;
    }
}


contract ModifierReview {
    uint256 public myInteger;
    address public owner;

    modifier onlyOwner {
        require(msg.sender == owner, "Msg.sender must be the owner");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function setNewInteger(uint256 newInteger) public onlyOwner {
        myInteger = newInteger;
    }
}
