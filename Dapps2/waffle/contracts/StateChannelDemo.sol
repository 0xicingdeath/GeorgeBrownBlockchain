pragma solidity 0.5.10;

contract StateChannel { 
    enum State { ESCROW, TRANSACT, TRANSFER } 
    struct Channel {
        address payable src;
        address payable dst;
        uint256 escrowAmount;
        uint256 blockNumber;
        uint256 nonce;
        uint256 spentAmount;
        uint256 disputePeriodLength;
        State currentState;
    }
    modifier uniqueId(uint256 uid) {
        require(multiChannel[uid].dst == address(0) && multiChannel[uid].src == address(0), "Unique id");
        _;
    }
    modifier isChannelParticipant(uint256 uid) {
        require(multiChannel[uid].src == msg.sender|| multiChannel[uid].dst == msg.sender, "Must be sender");
        _;
    }
    modifier isSender(uint256 uid) {
        require(multiChannel[uid].src == msg.sender, "Must be sender");
        _;
    }
    modifier lessThanAllowance(uint256 uid, uint256 spent) {
        require(spent < multiChannel[uid].escrowAmount, "exceeds escrow");
        _;
    }
    mapping (uint256 => Channel) public multiChannel;
    
    function newChannel(uint uid, address payable destination, uint256 _disputePeriodLength) 
        public uniqueId(uid){
        multiChannel[uid].src = msg.sender; //sender initiated this tx call
        multiChannel[uid].dst = destination;
        multiChannel[uid].disputePeriodLength = _disputePeriodLength;
    }
    function deposit(uint uid) public payable isSender(uid){
        multiChannel[uid].escrowAmount = msg.value;
        multiChannel[uid].currentState = State.TRANSACT;
    }
    function submitReceipt(uint uid, uint _nonce, uint spent)
        public lessThanAllowance(uid, spent) isChannelParticipant(uid) { //takes signature
        require(block.number > multiChannel[uid].blockNumber + multiChannel[uid].disputePeriodLength );
        require(multiChannel[uid].currentState == State.TRANSACT, "Must be in transacting state");
        // Verification lecture will be taught in Saturday - but verify tx public key = src address
        multiChannel[uid].blockNumber = block.number;
        multiChannel[uid].nonce = _nonce;
        multiChannel[uid].spentAmount = spent;
    }
    function disputeReceipt(uint uid, uint newNonce, uint spent) 
        public lessThanAllowance(uid, spent) isChannelParticipant(uid) { //take signature
        require(multiChannel[uid].blockNumber > 0, "In dispute");
        require(multiChannel[uid].blockNumber + multiChannel[uid].disputePeriodLength < block.number);
        require(newNonce > multiChannel[uid].nonce, "updated nonce");
        // Verification lecture will be taught in Saturday - but verify tx public key = src address
        multiChannel[uid].nonce = newNonce;
        multiChannel[uid].spentAmount = spent;
    }
    function transfer(uint uid) public isChannelParticipant(uid) {
        require(block.number > multiChannel[uid].blockNumber + multiChannel[uid].disputePeriodLength );
        multiChannel[uid].currentState = State.TRANSFER;
        uint256 toTransfer = multiChannel[uid].spentAmount;
        uint256 backToSender = multiChannel[uid].escrowAmount -= toTransfer;
        multiChannel[uid].spentAmount = 0; 
        multiChannel[uid].escrowAmount = 0;        
        
        (multiChannel[uid].dst).transfer(toTransfer);
        (multiChannel[uid].src).transfer(backToSender);
        
    }
    function backToEscrow(uint uid) public isChannelParticipant(uid) {
        require(multiChannel[uid].currentState == State.TRANSFER, "Must be in transfer state");
        multiChannel[uid].blockNumber = 0;
        multiChannel[uid].currentState = State.ESCROW;
    }
} 
