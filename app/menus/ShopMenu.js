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
var ShopMenu = (function (_super) {
    __extends(ShopMenu, _super);
    function ShopMenu(gameManager, waveManager) {
        _super.call(this, gameManager);
        this.waveManager = waveManager;
        var self = this;
        var continueButton = new Button("Continue with next wave", Canvas.WIDTH / 2, 300, 300, 80, "#2ecc71", function () {
            self.gameManager.prepareNextWave();
            self.waveManager.nextWave();
            GameStateManager.setActive(GameState.STARTING_WAVE);
        }, PauseMenu.defaultMenuFont);
        this.buttons.push(continueButton);
    }
    return ShopMenu;
}(Menu));
