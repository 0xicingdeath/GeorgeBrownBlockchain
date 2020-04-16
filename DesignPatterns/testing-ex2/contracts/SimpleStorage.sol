pragma solidity 0.5.4;

contract Owner {
  address owner;

  constructor() public { 
    owner = msg.sender;
  } 
  modifier onlyOwner() {
    require(owner == msg.sender, "msg.sender is not owner");
    _;
  } 
} 

contract SimpleStorage is Owner{
  uint256 public customInteger;

  constructor(uint256 _newInt) public {
    customInteger = _newInt;
  }
  
  function setInteger(uint256 _newInt) public onlyOwner {
    require(_newInt>5, "newinteger must be > 5");
    customInteger = _newInt;
  }

  function getInteger() public view returns(uint256) {
    return customInteger;
  }

}
