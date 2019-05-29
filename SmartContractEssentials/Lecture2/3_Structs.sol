pragma solidity 0.5.1;

contract StructVotingExample {
    struct VotingInformation {
        bytes32 personVoted;
        uint256 blockNumber;
    }

    mapping (address => VotingInformation) voters;

    function vote(bytes32 myVote) public {
        voters[msg.sender] = VotingInformation(myVote, block.number);
    }

}

contract CompleteStructVotingExample {
    enum AvailableState { OPEN, CLOSED }
    AvailableState public currentState;
    address owner;
    struct VotingInformation {
        string personVoted;
        uint256 blockNumber;
    }
    mapping (address => VotingInformation) voters;

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

    function getVote(address individualAddress) public voteClosed view returns (string memory, uint256) {
        return (voters[individualAddress].personVoted, voters[individualAddress].blockNumber);
    }


    function vote(string memory myVote) public {
        voters[msg.sender] = VotingInformation(myVote, block.number);
    }

}
