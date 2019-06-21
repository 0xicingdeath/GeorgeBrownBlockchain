pragma solidity >=0.4.22 <0.6.0;


contract Hashing {

    bytes32 _hash;

    function setHash(bytes32 hash) public {
        _hash = hash;
    }


    function verify(bytes32 hash, bytes memory data)
        public
        pure
        returns (bool)
    {
        return hash == keccak256(data);
    }
    
    
    function checkPreimage(bytes memory data)
        public
        view
        returns(bool)
    {
        return verify(_hash, data);
    }
    
}
