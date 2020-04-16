pragma solidity 0.5.8;

contract Mapping { 
    // Used for voting 
    enum State { OPEN, PAUSED, CLOSED }
    // 0 - OPEN, 1 - CLOSED, 2 - PAUSED
    State public currentState;
    mapping (address => bool) public hasVoted;
    address owner;
    
    
    constructor() public { 
        owner = msg.sender;
    } 
    
    modifier onlyOwner { 
        require(owner == msg.sender);
        _;
    } 
    
    modifier isVotingOpen { 
        require(currentState == State.OPEN, "The vote has closed");
        _;
    } 
    
    modifier isVotingPaused { 
        require(currentState == State.PAUSED, "The vote has paused");
        _;
    } 
    
    function closeVoting() public onlyOwner isVotingPaused {
        currentState = State.CLOSED;
    }
    
    function pauseVoting() public onlyOwner {
        currentState = State.PAUSED;
    }
        
    function openVoting() public onlyOwner {
        currentState = State.OPEN;
    }
    
    function submitVote() public isVotingOpen {
        require(currentState == State.OPEN, "The vote has closed");

        hasVoted[msg.sender] = true;
    }
    
    function getVote() public view returns (bool) {
        return hasVoted[msg.sender];
    }
    

}
