/**
 * Created by mirko on 13-4-17.
 */
abstract class Menu {
    protected buttons : Array<Button> = [];
    protected static defaultMenuFont : Object = {
        "color": "#efefef",
        "size": "20px",
        "family": "Arial",
        "align": "center"
    }
    protected gameManager : GameManager;

    constructor(gameManager : GameManager) {
        this.gameManager = gameManager;
    }

    public update() : void {
        let mouseXY : Vector2 = MenuMouseInput.getMouseXY();
        for (let i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            if (button.checkForClick(mouseXY)) {
                return;
            };
        }
    }

    public render(ctx : CanvasRenderingContext2D) : void {
        for (let i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            button.renderButton(ctx);
        }
    }
}