class Canvas {
    private canvas;
    private ctx;
    public static WIDTH : number;
    public static HEIGHT : number;

    constructor(canvasID : string) {
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext("2d");
        this.set();
    }

    public getWidth() : number {
        return this.canvas.width;
    }

    public getHeight() : number {
        return this.canvas.height;
    }

    public set() : void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        Canvas.WIDTH = window.innerWidth;
        Canvas.HEIGHT = window.innerHeight;
    }

    public getCtx() : CanvasRenderingContext2D {
        return this.ctx;
    }
}