let chai = require('chai');
const {createMockProvider, deployContract, getWallets, solidity} = require('ethereum-waffle');
const GameMock = require('../build/GameLogic');

chai.use(solidity);
const {expect} = chai;

describe('INTEGRATION: Example', () => {
  let provider = createMockProvider();
  let [wallet, walletTo] = getWallets(provider);
  let game;

  beforeEach(async () => {
    game = await deployContract(wallet, GameMock, []);
  });

  it("Should start a game", async () => {
    let gameId = "1";

    await expect(game.startGame("1", walletTo.address))
      .to.emit(game, "InitiatedGame")
      .withArgs(gameId, wallet.address, walletTo.address);
  });

  it("Should not start a game if it already exists", async () => {
    let gameId = "1";

    await expect(game.startGame("1", walletTo.address))
      .to.emit(game, "InitiatedGame")
      .withArgs(gameId, wallet.address, walletTo.address);
    
    await expect(game.startGame(gameId, "0x5b4834f2609bD6057beB93E0Ac189098bFD35FEc"))
        .to.be.reverted;
  });

  it("Should declare a tie if game exists", async () => {
    let gameId = 2;

    await expect(game.startGame(gameId, walletTo.address))
      .to.emit(game, "InitiatedGame")
      .withArgs(gameId, wallet.address, walletTo.address);

    await expect(game.declareTie(gameId))
      .to.emit(game, "TiedGame");
  });

  it("Should not declare a tie if game already exists", async () => {
    let gameId = 2;
    
    await expect(game.declareTie(gameId))
      .to.be.revertedWith("Caller must be a player");
  });

  it("should declare a tie if game already exists", async () => {
    let gameId = 3;
    
    await expect(game.startGame(gameId, walletTo.address))
      .to.emit(game, "InitiatedGame")
      .withArgs(gameId, wallet.address, walletTo.address);

    await expect(game.declareDone(gameId))
      .to.emit(game, "DoneGame");
  });
});
