pragma solidity 0.5.10;

contract GameLogic {
    enum GameState { STARTED, TIED, DONE } 
    struct IndividualGame{
      address player1;
      address player2;
      GameState individualGameState; 
    }
    event InitiatedGame(uint gameID, address player1, address player2);
    event TiedGame(uint256 blockNumber);
    event DoneGame(uint256 blockNumber);
    mapping (uint => IndividualGame) games;

    modifier gameDoesNotExist(uint newGameID) {
      require(games[newGameID].player1 == address(0), "Single game");
      _;
    }
    
    modifier calledByPlayer(uint newGameID) {
      require(games[newGameID].player1 == msg.sender || games[newGameID].player2 == msg.sender, "Caller must be a player");
      _;
    } 

    function startGame(uint gameID, address player2) public gameDoesNotExist(gameID) {
        games[gameID] = IndividualGame(msg.sender, player2, GameState.STARTED);           
        emit InitiatedGame(gameID, msg.sender, player2);
    }

    function declareTie(uint gameID) public calledByPlayer(gameID) {
        games[gameID].individualGameState = GameState.TIED;
        emit TiedGame(block.number);
    }

    function declareDone(uint gameID) public calledByPlayer(gameID) {
        games[gameID].individualGameState = GameState.DONE;
        emit DoneGame(block.number);
    } 
}
