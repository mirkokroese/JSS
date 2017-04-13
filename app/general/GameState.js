/**
 * Created by mirko on 10-4-17.
 */
var GameState;
(function (GameState) {
    GameState[GameState["MAIN_MENU"] = 0] = "MAIN_MENU";
    GameState[GameState["STARTING_WAVE"] = 1] = "STARTING_WAVE";
    GameState[GameState["RUNNING_WAVE"] = 2] = "RUNNING_WAVE";
    GameState[GameState["ENDING_WAVE"] = 3] = "ENDING_WAVE";
    GameState[GameState["SHOP_MENU"] = 4] = "SHOP_MENU";
    GameState[GameState["PAUSED"] = 5] = "PAUSED";
    GameState[GameState["GAME_OVER"] = 6] = "GAME_OVER";
})(GameState || (GameState = {}));
