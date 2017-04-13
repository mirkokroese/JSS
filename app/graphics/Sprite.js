///<reference path="../general/GameManager.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
var Sprite = (function () {
    function Sprite(filename, filetype, x, y, width, height) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        if (width === void 0) { width = null; }
        if (height === void 0) { height = null; }
        this.image = new Image();
        this.image.src = "assets/sprites/" + filename + "." + filetype;
    }
    Sprite.prototype.getImage = function () {
        return this.image;
    };
    return Sprite;
}());
