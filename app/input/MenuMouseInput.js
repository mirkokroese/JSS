/**
 * Created by mirko on 13-4-17.
 */
var MenuMouseInput = (function () {
    function MenuMouseInput() {
    }
    MenuMouseInput.isListening = function () {
        return this.listening;
    };
    MenuMouseInput.startListening = function () {
        document.addEventListener("mouseup", function (e) {
            MenuMouseInput.mouseClickXY = new Vector2(e.x, e.y);
            MenuMouseInput.gotRecentClick = true;
        });
    };
    MenuMouseInput.stopListening = function () {
        document.removeEventListener("mouseup");
    };
    MenuMouseInput.getMouseXY = function () {
        if (MenuMouseInput.gotRecentClick) {
            MenuMouseInput.gotRecentClick = false;
            return this.mouseClickXY;
        }
        return null;
    };
    MenuMouseInput.listening = false;
    MenuMouseInput.mouseClickXY = new Vector2(0, 0);
    MenuMouseInput.gotRecentClick = false;
    return MenuMouseInput;
}());
