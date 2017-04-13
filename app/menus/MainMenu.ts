///<reference path="Button.ts"/>
///<reference path="../general/GameState.ts"/>
///<reference path="../general/GameStateManager.ts"/>
///<reference path="Menu.ts"/>
///<reference path="../general/GameManager.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
class MainMenu extends Menu {
    constructor(gameManager : GameManager) {
        super(gameManager);

        let startButton = new Button("Play", Canvas.WIDTH/2, 300, 300, 80, "#2ecc71", function () {
            GameStateManager.setActive(GameState.STARTING_WAVE);
        }, MainMenu.defaultMenuFont);

        this.buttons.push(startButton);
    }
}