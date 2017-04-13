///<reference path="GameState.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
class GameStateManager {

    private static currentState : GameState;

    public static setActive(gameState : GameState) : void {
        GameStateManager.currentState = gameState;
    }

    public static getState() : GameState {
        return GameStateManager.currentState;
    }

}