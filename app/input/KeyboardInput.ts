/**
 * Created by mirko on 13-4-17.
 */
class KeyboardInput {
    public static gameplayBindings = {
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

    public static menuBindings = {
        "pause": {
            "keys": 27,
            "pressed": false
        }
    };

    public static init() : void {
        document.addEventListener("keydown", function (e) {
            if (GameManager.DEBUG_KEYS) console.log(e.keyCode);
            for(let key in KeyboardInput.gameplayBindings) {
                let keyBinding = KeyboardInput.gameplayBindings[key];
                if (e.keyCode == keyBinding.keys) {
                    keyBinding.pressed = true;
                }
            }
        });

        document.addEventListener("keyup", function (e) {
            for(let key in KeyboardInput.gameplayBindings) {
                let keyBinding = KeyboardInput.gameplayBindings[key];
                if (e.keyCode == keyBinding.keys) {
                    keyBinding.pressed = false;
                }
            }
            for(let key in KeyboardInput.menuBindings) {
                let keyBinding = KeyboardInput.menuBindings[key];
                if (e.keyCode == keyBinding.keys) {
                    keyBinding.pressed = true;
                }
            }
        });
    }

    public static isPressed(key : string) : boolean {
        return KeyboardInput.gameplayBindings[key].pressed;
    }

    public static isClicked(key : string) : boolean {
        let button = KeyboardInput.menuBindings[key];
        if (button.pressed) {
            button.pressed = false;
            return true;
        }

        return false;
    }
}