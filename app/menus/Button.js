///<reference path="../graphics/Canvas.ts"/>
///<reference path="../input/MenuMouseInput.ts"/>
///<reference path="../util/Vector2.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
var Button = (function () {
    function Button(text, x, y, width, height, color, callback, font, maxWidth) {
        if (font === void 0) { font = null; }
        if (maxWidth === void 0) { maxWidth = null; }
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.font = font;
        this._callback = callback;
        this.maxTextWidth = maxWidth;
    }
    Button.prototype.renderButton = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
        ctx.fillStyle = (this.font["color"] != null ? this.font["color"] : "#efefef");
        ctx.font = (this.font["size"] != null && this.font["family"] != null ? this.font["size"] + " " + this.font["family"] : "10px Arial");
        ctx.textAlign = (this.font["align"] != null ? this.font["align"] : "center");
        ctx.fillText(this.text, this.x, this.y + 8);
    };
    Button.prototype.checkForClick = function (mouseXY) {
        if (mouseXY != null) {
            if (Vector2.mouseIntersection(new Vector2(this.x, this.y), new Vector2(this.width / 2, this.height / 2), mouseXY)) {
                this._callback();
                return true;
            }
        }
        return false;
    };
    return Button;
}());
