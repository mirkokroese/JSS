var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/Component.ts"/>
///<reference path="../baseComponent/Component.ts"/>
///<reference path="../../input/KeyboardInput.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
var KeyInputComponent = (function (_super) {
    __extends(KeyInputComponent, _super);
    function KeyInputComponent(entity) {
        _super.call(this, entity);
        this.moving = false;
    }
    KeyInputComponent.prototype.update = function () {
        this.checkIfMoving();
    };
    KeyInputComponent.prototype.checkIfMoving = function () {
        if (KeyboardInput.gameplayBindings.up.pressed || KeyboardInput.gameplayBindings.down.pressed ||
            KeyboardInput.gameplayBindings.left.pressed || KeyboardInput.gameplayBindings.right.pressed) {
            this.moving = true;
        }
        else {
            this.moving = false;
        }
    };
    KeyInputComponent.prototype.isMoving = function () {
        return this.moving;
    };
    KeyInputComponent.prototype.isPressed = function (key) {
        return KeyboardInput.gameplayBindings[key].pressed;
    };
    KeyInputComponent.prototype.getAxisRaw = function (axis) {
        var value = null;
        switch (axis) {
            case "Horizontal":
                value = this.getHorizontalAxis();
                break;
            case "Vertical":
                value = this.getVerticalAxis();
                break;
        }
        return value;
    };
    KeyInputComponent.prototype.getHorizontalAxis = function () {
        var value = 0;
        if (!(KeyboardInput.gameplayBindings.left.pressed && KeyboardInput.gameplayBindings.right.pressed)) {
            if (KeyboardInput.gameplayBindings.left.pressed)
                value = -1;
            if (KeyboardInput.gameplayBindings.right.pressed)
                value = 1;
        }
        return value;
    };
    KeyInputComponent.prototype.getVerticalAxis = function () {
        var value = 0;
        if (!(KeyboardInput.gameplayBindings.up.pressed && KeyboardInput.gameplayBindings.down.pressed)) {
            if (KeyboardInput.gameplayBindings.up.pressed)
                value = -1;
            if (KeyboardInput.gameplayBindings.down.pressed)
                value = 1;
        }
        return value;
    };
    return KeyInputComponent;
}(BaseComponent));
