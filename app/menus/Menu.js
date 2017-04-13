/**
 * Created by mirko on 13-4-17.
 */
var Menu = (function () {
    function Menu(gameManager) {
        this.buttons = [];
        this.gameManager = gameManager;
    }
    Menu.prototype.update = function () {
        var mouseXY = MenuMouseInput.getMouseXY();
        for (var i = 0; i < this.buttons.length; i++) {
            var button = this.buttons[i];
            if (button.checkForClick(mouseXY)) {
                return;
            }
            ;
        }
    };
    Menu.prototype.render = function (ctx) {
        for (var i = 0; i < this.buttons.length; i++) {
            var button = this.buttons[i];
            button.renderButton(ctx);
        }
    };
    Menu.defaultMenuFont = {
        "color": "#efefef",
        "size": "20px",
        "family": "Arial",
        "align": "center"
    };
    return Menu;
}());
