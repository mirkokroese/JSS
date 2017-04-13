///<reference path="Button.ts"/>
///<reference path="../general/GameState.ts"/>
///<reference path="../general/GameStateManager.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
class PauseMenu extends Menu {

    constructor(gameManager : GameManager) {
        super(gameManager);
        let self = this;
        let continueButton = new Button("Continue", Canvas.WIDTH/2, 300, 300, 80, "#2ecc71", function () {
            GameStateManager.setActive(GameState.RUNNING_WAVE);
        }, PauseMenu.defaultMenuFont);
        this.buttons.push(continueButton);

        let exitButton = new Button("Exit to main menu", Canvas.WIDTH/2, 460, 300, 80, "#2ecc71", function () {
            GameStateManager.setActive(GameState.MAIN_MENU);
            self.gameManager.reset();
        }, PauseMenu.defaultMenuFont);
        this.buttons.push(exitButton);
    }
}