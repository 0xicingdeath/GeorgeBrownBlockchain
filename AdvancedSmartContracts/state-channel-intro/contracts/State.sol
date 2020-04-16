pragma solidity ^0.5.0;

contract CoinFlipStateEnum {
    State currentState;
    enum State { NEW, FINISHED }

    function finishGame() public {
        require (currentState == State.NEW, "Game should be in NEW state");
        currentState = State.FINISHED;
    }
    function restartGame() public {
        require(currentState == State.FINISHED, "Game should be in FINISHED state");
        currentState = State.NEW;
    }
    function getState() public view returns (State) {
        return currentState;
    }
}

contract CoinFlipState {
    uint closedBlock;

    function finishGame() public {
        require (closedBlock == 0, "Game should be in NEW state");
        closedBlock = block.number;
    }
    function restartGame() public {
        require(closedBlock > 0, "Game should be in FINISHED state");
        closedBlock = 0;
    }
    function getClosedBlock() public view returns (uint) {
        return closedBlock;
    }
}
