pragma solidity 0.5.1;

contract VotingMappingExample {
    mapping (address => bool) voted;

    function vote(bool individualVote) public {
        voted[msg.sender] = individualVote;
    }

    function getVote(address individualAddress) public view returns (bool) {
        return voted[individualAddress];
    }
}

contract EnumVotingExample {
    enum AvailableState { OPEN, CLOSED }
    AvailableState public currentState;

    function closeVote() public {
        currentState = AvailableState.CLOSED;
    }

    function openVote() public {
        currentState = AvailableState.OPEN;
    }
}

contract ControlledVotingExample {

    enum AvailableState { OPEN, CLOSED }
    AvailableState public currentState;
    mapping (address => bool) voted;
    address owner;

    modifier voteClosed {
        require(currentState == AvailableState.CLOSED, "Voting needs to be closed");
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Msg.sender must be the owner");
        _;
    }

    constructor() public{
        owner = msg.sender;
    }

    function closeVote() public onlyOwner {
        currentState = AvailableState.CLOSED;
    }

    function openVote() public onlyOwner {
        currentState = AvailableState.OPEN;
    }

    function vote(bool individualVote) public {
        voted[msg.sender] = individualVote;
    }

    function getVote(address individualAddress) public voteClosed view returns (bool) {
        return voted[individualAddress];
    }
}
