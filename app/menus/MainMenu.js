var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="Button.ts"/>
///<reference path="../general/GameState.ts"/>
///<reference path="../general/GameStateManager.ts"/>
///<reference path="Menu.ts"/>
///<reference path="../general/GameManager.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu(gameManager) {
        _super.call(this, gameManager);
        var startButton = new Button("Play", Canvas.WIDTH / 2, 300, 300, 80, "#2ecc71", function () {
            GameStateManager.setActive(GameState.STARTING_WAVE);
        }, MainMenu.defaultMenuFont);
        this.buttons.push(startButton);
    }
    return MainMenu;
}(Menu));
