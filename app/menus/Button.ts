///<reference path="../graphics/Canvas.ts"/>
///<reference path="../input/MenuMouseInput.ts"/>
///<reference path="../util/Vector2.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
class Button {
    private text : string;
    private x : number;
    private y : number;
    private width : number;
    private height : number;
    private maxTextWidth : number;
    private color : string;
    private font : Object;
    private _callback;

    constructor(
                text : string, x : number, y : number, width : number, height : number,
                color : string, callback, font : Object = null, maxWidth : number = null
    ) {
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

    public renderButton(ctx : CanvasRenderingContext2D) : void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - (this.width/2), this.y - (this.height/2), this.width, this.height);

        ctx.fillStyle = (this.font["color"] != null ? this.font["color"] : "#efefef");
        ctx.font = (this.font["size"] != null && this.font["family"] != null ? this.font["size"] + " " + this.font["family"] : "10px Arial");
        ctx.textAlign = (this.font["align"] != null ? this.font["align"] : "center");
        ctx.fillText(this.text, this.x, this.y+8);
    }

    public checkForClick(mouseXY : Vector2) : boolean {
        if (mouseXY != null) {
            if (Vector2.mouseIntersection(new Vector2(this.x, this.y), new Vector2(this.width/2, this.height/2), mouseXY)) {
                this._callback();
                return true;
            }
        }

        return false;
    }
}