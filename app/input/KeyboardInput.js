/**
 * Created by mirko on 13-4-17.
 */
var KeyboardInput = (function () {
    function KeyboardInput() {
    }
    KeyboardInput.init = function () {
        document.addEventListener("keydown", function (e) {
            if (GameManager.DEBUG_KEYS)
                console.log(e.keyCode);
            for (var key in KeyboardInput.gameplayBindings) {
                var keyBinding = KeyboardInput.gameplayBindings[key];
                if (e.keyCode == keyBinding.keys) {
                    keyBinding.pressed = true;
                }
            }
        });
        document.addEventListener("keyup", function (e) {
            for (var key in KeyboardInput.gameplayBindings) {
                var keyBinding = KeyboardInput.gameplayBindings[key];
                if (e.keyCode == keyBinding.keys) {
                    keyBinding.pressed = false;
                }
            }
            for (var key in KeyboardInput.menuBindings) {
                var keyBinding = KeyboardInput.menuBindings[key];
                if (e.keyCode == keyBinding.keys) {
                    keyBinding.pressed = true;
                }
            }
        });
    };
    KeyboardInput.isPressed = function (key) {
        return KeyboardInput.gameplayBindings[key].pressed;
    };
    KeyboardInput.isClicked = function (key) {
        var button = KeyboardInput.menuBindings[key];
        if (button.pressed) {
            button.pressed = false;
            return true;
        }
        return false;
    };
    KeyboardInput.gameplayBindings = {
        "up": {
            "keys": 87 || 38,
            "pressed": false
        },
        "left": {
            "keys": 65 || 37,
            "pressed": false
        },
        "right": {
            "keys": 68 || 39,
            "pressed": false
        },
        "down": {
            "keys": 83 || 40,
            "pressed": false
        },
        "boost": {
            "keys": 32,
            "pressed": false
        },
        "pause": {
            "keys": 27,
            "pressed": false
        }
    };
    KeyboardInput.menuBindings = {
        "pause": {
            "keys": 27,
            "pressed": false
        }
    };
    return KeyboardInput;
}());
