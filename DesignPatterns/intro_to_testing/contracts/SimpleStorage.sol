pragma solidity 0.5.4;

contract SimpleStorage {
  uint256 public customInteger;

  constructor(uint256 _newInt) public {
    customInteger = _newInt;
  }
  
  function setInteger(uint256 _newInt) public {
    customInteger = _newInt;
  }

  function getInteger() public view returns(uint256) {
    return customInteger;
  }

}
