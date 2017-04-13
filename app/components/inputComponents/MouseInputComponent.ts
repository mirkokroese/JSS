///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 12-4-17.
 */
enum MouseButton {
    BUTTON_LEFT = 0,
    BUTTON_MIDDLE = 1,
    BUTTON_RIGHT = 2
}

class MouseInputComponent extends BaseComponent implements Component {
    private mouseX : number;
    private mouseY : number;
    private leftClicked : boolean = false;
    private rightClicked : boolean = false;
    private middleClicked : boolean = false;

    constructor(entity : Entity) {
        super(entity);
        
        var self = this;
        document.addEventListener("mousedown", function (e) {
            e.preventDefault();
            self.buttonPress(e.button);
        });
        
        document.addEventListener("mouseup", function (e) {
            e.preventDefault();
            self.buttonRelease(e.button);
        });

        document.addEventListener("mousemove", function (e) {
            e.preventDefault();
            self.mouseX = e.x;
            self.mouseY = e.y;
        });
    }

    update(): void {
        this.updateMousePosition();
    }

    public isPressed(button : number) : boolean {
        let pressed : boolean = false;

        switch (button) {
            case MouseButton.BUTTON_LEFT:
                pressed = this.leftClicked;
                break;
            case MouseButton.BUTTON_MIDDLE:
                pressed = this.middleClicked;
                break;
            case MouseButton.BUTTON_RIGHT:
                pressed = this.rightClicked;
                break;
        }

        return pressed;
    }

    private buttonPress(button : number) : void {
        switch (button) {
            case MouseButton.BUTTON_LEFT:
                this.leftClicked = true;
                break;
            case MouseButton.BUTTON_MIDDLE:
                this.middleClicked = true;
                break;
            case MouseButton.BUTTON_RIGHT:
                this.rightClicked = true;
                break;
        }
    }

    private buttonRelease(button : number) : void {
        switch (button) {
            case MouseButton.BUTTON_LEFT:
                this.leftClicked = false;
                break;
            case MouseButton.BUTTON_MIDDLE:
                this.middleClicked = false;
                break;
            case MouseButton.BUTTON_RIGHT:
                this.rightClicked = false;
                break;
        }
    }

    public getMouseX() : number {
        return this.mouseX;
    }

    public getMouseY() : number {
        return this.mouseY;
    }

    public getMousePosition() : Vector2 {
        return new Vector2(this.mouseX, this.mouseY)
    }

    private updateMousePosition() : void {

    }
}