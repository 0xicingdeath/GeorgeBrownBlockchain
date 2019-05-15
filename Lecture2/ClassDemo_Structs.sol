pragma solidity 0.5.8;

contract Structs { 
    enum VoterRegion { NONE, TORONTO, MISSISSAUGA } 
    
    struct VotingInfo { 
        address person; // 0x000000000
        uint256 blockNumber; //0
        bool hasVoted; //false
        address voter; //0x000000000
        VoterRegion region;
    } 
    event PersonVoted(address personVoted, address candidate, uint256 blockNumber, bool hasVoted);
    mapping (address => VotingInfo) public voter;
    
        function vote(address person) public { 
        voter[msg.sender].person = person;
        voter[msg.sender].blockNumber = block.number;
        voter[msg.sender].hasVoted = true;
        emit PersonVoted(msg.sender,
            voter[msg.sender].person,
            voter[msg.sender].blockNumber, 
            voter[msg.sender].hasVoted
        );
    } 
    
    function getVote() public view returns (bool) {
        return voter[msg.sender].hasVoted;
    }
    
    function setToronto() public { 
        voter[msg.sender].region = VoterRegion.TORONTO;
    } 
}
