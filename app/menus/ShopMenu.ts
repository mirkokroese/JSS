///<reference path="Button.ts"/>
///<reference path="../general/GameState.ts"/>
///<reference path="../general/GameStateManager.ts"/>
///<reference path="Menu.ts"/>
///<reference path="../general/GameManager.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
class ShopMenu extends Menu {
    private waveManager : WaveManager;

    constructor(gameManager : GameManager, waveManager : WaveManager) {
        super(gameManager);
        this.waveManager = waveManager;

        let self = this;
        let continueButton = new Button("Continue with next wave", Canvas.WIDTH/2, 300, 300, 80, "#2ecc71", function () {
            self.gameManager.prepareNextWave();
            self.waveManager.nextWave();
            GameStateManager.setActive(GameState.STARTING_WAVE);
        }, PauseMenu.defaultMenuFont);
        this.buttons.push(continueButton);
    }
}