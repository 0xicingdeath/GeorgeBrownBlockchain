pragma solidity ^0.5.0;

contract SimpleStorage {

    event ValueChanged(address indexed author, uint oldValue, uint newValue);

    uint _value;

    constructor() public {
    }

    function getValue() public view  returns (uint) {
        return _value;
    }

    function setValue(uint value) public {
        emit ValueChanged(msg.sender, _value, value);
        _value = value;
    }
}
