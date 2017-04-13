var Canvas = (function () {
    function Canvas(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext("2d");
        this.set();
    }
    Canvas.prototype.getWidth = function () {
        return this.canvas.width;
    };
    Canvas.prototype.getHeight = function () {
        return this.canvas.height;
    };
    Canvas.prototype.set = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        Canvas.WIDTH = window.innerWidth;
        Canvas.HEIGHT = window.innerHeight;
    };
    Canvas.prototype.getCtx = function () {
        return this.ctx;
    };
    return Canvas;
}());
