pragma solidity 0.5.1;

contract EventsExample {
    uint256 myInteger;
    event IntegerChanged(uint256);

    function changeInteger(uint256 newInteger) public {
        myInteger = newInteger;
        emit IntegerChanged(newInteger);
    }
}

contract CompleteStructVotingExampleWithEvents {
    enum AvailableState { OPEN, CLOSED }
    AvailableState public currentState;
    address owner;
    struct VotingInformation {
        string personVoted;
        uint256 blockNumber;
    }
    mapping (address => VotingInformation) voters;
    event VoteClosed();
    event VoteOpened();
    event CastedVote(address, uint256);

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
        emit VoteClosed();
    }

    function openVote() public onlyOwner {
        currentState = AvailableState.OPEN;
        emit VoteOpened();
    }

    function getVote(address individualAddress) public voteClosed view returns (string memory, uint256) {
        return (voters[individualAddress].personVoted, voters[individualAddress].blockNumber);
    }

    function vote(string memory myVote) public {
        voters[msg.sender] = VotingInformation(myVote, block.number);
        emit CastedVote(individualAddress, block.number);

    }

}
contract FundMovements {
    event FundsPaid(address from, address to, uint256 amount);
    mapping(address => uint256) balances;

    function payMe() public payable {
        balances[msg.sender] = msg.value;
    }

    function payMyFriend(address payable friendAddress, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        emit FundsPaid(msg.sender, friendAddress, amount); //why is this wrong?
        friendAddress.transfer(amount);
    }

    function payMyFriend(address payable friendAddress, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        friendAddress.transfer(amount);
        emit FundsPaid(msg.sender, friendAddress, amount);
    }

}