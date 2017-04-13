var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="Button.ts"/>
///<reference path="../general/GameState.ts"/>
///<reference path="../general/GameStateManager.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
var PauseMenu = (function (_super) {
    __extends(PauseMenu, _super);
    function PauseMenu(gameManager) {
        _super.call(this, gameManager);
        var self = this;
        var continueButton = new Button("Continue", Canvas.WIDTH / 2, 300, 300, 80, "#2ecc71", function () {
            GameStateManager.setActive(GameState.RUNNING_WAVE);
        }, PauseMenu.defaultMenuFont);
        this.buttons.push(continueButton);
        var exitButton = new Button("Exit to main menu", Canvas.WIDTH / 2, 460, 300, 80, "#2ecc71", function () {
            GameStateManager.setActive(GameState.MAIN_MENU);
            self.gameManager.reset();
        }, PauseMenu.defaultMenuFont);
        this.buttons.push(exitButton);
    }
    return PauseMenu;
}(Menu));
