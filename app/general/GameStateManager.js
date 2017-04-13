///<reference path="GameState.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
var GameStateManager = (function () {
    function GameStateManager() {
    }
    GameStateManager.setActive = function (gameState) {
        GameStateManager.currentState = gameState;
    };
    GameStateManager.getState = function () {
        return GameStateManager.currentState;
    };
    return GameStateManager;
}());
