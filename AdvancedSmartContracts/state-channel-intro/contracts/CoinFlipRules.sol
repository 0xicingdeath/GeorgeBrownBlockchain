pragma solidity ^0.5.0;

contract CoinFlip {
    struct Game {
        address playerOne;
        address playerTwo;
        GameState state;
        uint256 escrowAmount;
    }
    mapping (address => uint256) balances;
    mapping (uint256 => Game) allGames;
    enum GameState { NEW, FINISHED }

    modifier isParticipant (uint256 uid) {
        require(allGames[uid].playerOne == msg.sender || allGames[uid].playerTwo == msg.sender);
        _;
    }

    modifier isNewGame (uint256 uid) {
        require (allGames[uid].state == GameState.NEW);
        _;
    }

    modifier validPlayer(uint256 uid, address winner) {
        require (allGames[uid].playerTwo == winner || allGames[uid].playerOne == winner);
        _;
    }

    function deposit() public payable {
        balances[msg.sender] = msg.value;
    }

    function newGame(uint256 uid, address dst, uint256 escrowAmount) public {
        allGames[uid] = Game(msg.sender, dst, GameState.NEW, escrowAmount);
    }

    function gameEnded(uint256 uid, address winner) public
        validPlayer(uid,winner)
        isNewGame(uid)
        isParticipant(uid){
        require (balances[allGames[uid].playerOne] >= allGames[uid].escrowAmount && balances[allGames[uid].playerTwo] >= allGames[uid].escrowAmount);

        allGames[uid].state = GameState.FINISHED;
    }

    function recoverAddressFromHashAndParameters(uint8 v, bytes32 r, bytes32 s)
        public pure
        returns(address) {
            bytes memory prefix = "\x19Ethereum Signed Message:\n32";
            bytes32 msgHash = keccak256((abi.encodePacked()));
            bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, msgHash));
            return ecrecover(prefixedHash, v, r, s);
    }

}