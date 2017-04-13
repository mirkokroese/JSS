///<reference path="../baseComponent/Component.ts"/>
///<reference path="../baseComponent/Component.ts"/>
///<reference path="../../input/KeyboardInput.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
class KeyInputComponent extends BaseComponent implements Component {
    private moving : boolean = false;

    constructor(entity : Entity) {
        super(entity);
    }

    update(): void {
        this.checkIfMoving();
    }

    private checkIfMoving() : void {
        if (KeyboardInput.gameplayBindings.up.pressed || KeyboardInput.gameplayBindings.down.pressed ||
            KeyboardInput.gameplayBindings.left.pressed || KeyboardInput.gameplayBindings.right.pressed) {
            this.moving = true;
        } else {
            this.moving = false;
        }
    }

    public isMoving() : boolean {
        return this.moving;
    }
d
    public isPressed(key : string) : boolean {
        return KeyboardInput.gameplayBindings[key].pressed;
    }

    public getAxisRaw(axis : string) : number {
        let value : number = null;

        switch (axis) {
            case "Horizontal":
                value = this.getHorizontalAxis();
                break;
            case "Vertical":
                value = this.getVerticalAxis();
                break;
        }

        return value;
    }

    private getHorizontalAxis() : number {
        let value : number = 0;
        if (! (KeyboardInput.gameplayBindings.left.pressed && KeyboardInput.gameplayBindings.right.pressed)) {
            if (KeyboardInput.gameplayBindings.left.pressed) value = -1;
            if (KeyboardInput.gameplayBindings.right.pressed) value = 1;
        }

        return value;
    }

    private getVerticalAxis() : number {
        let value : number = 0;
        if (! (KeyboardInput.gameplayBindings.up.pressed && KeyboardInput.gameplayBindings.down.pressed)) {
            if (KeyboardInput.gameplayBindings.up.pressed) value = -1;
            if (KeyboardInput.gameplayBindings.down.pressed) value = 1;
        }

        return value;
    }
}