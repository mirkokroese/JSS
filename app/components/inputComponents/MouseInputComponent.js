var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 12-4-17.
 */
var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["BUTTON_LEFT"] = 0] = "BUTTON_LEFT";
    MouseButton[MouseButton["BUTTON_MIDDLE"] = 1] = "BUTTON_MIDDLE";
    MouseButton[MouseButton["BUTTON_RIGHT"] = 2] = "BUTTON_RIGHT";
})(MouseButton || (MouseButton = {}));
var MouseInputComponent = (function (_super) {
    __extends(MouseInputComponent, _super);
    function MouseInputComponent(entity) {
        _super.call(this, entity);
        this.leftClicked = false;
        this.rightClicked = false;
        this.middleClicked = false;
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
    MouseInputComponent.prototype.update = function () {
        this.updateMousePosition();
    };
    MouseInputComponent.prototype.isPressed = function (button) {
        var pressed = false;
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
    };
    MouseInputComponent.prototype.buttonPress = function (button) {
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
    };
    MouseInputComponent.prototype.buttonRelease = function (button) {
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
    };
    MouseInputComponent.prototype.getMouseX = function () {
        return this.mouseX;
    };
    MouseInputComponent.prototype.getMouseY = function () {
        return this.mouseY;
    };
    MouseInputComponent.prototype.getMousePosition = function () {
        return new Vector2(this.mouseX, this.mouseY);
    };
    MouseInputComponent.prototype.updateMousePosition = function () {
    };
    return MouseInputComponent;
}(BaseComponent));
