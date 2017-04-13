///<reference path="../general/GameManager.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
class Sprite {
    private image;

    constructor(filename : string, filetype : string, x : number = null, y : number = null, width : number = null, height : number = null) {
        this.image = new Image();
        this.image.src = "assets/sprites/" + filename + "." + filetype;
    }

    getImage() {
        return this.image;
    }

    // getX(): number {
    //     return this.x;
    // }
    //
    // getY(): number {
    //     return this.y;
    // }
    //
    // getWidth(): number {
    //     return this.width;
    // }
    //
    // getHeight(): number {
    //     return this.height;
    // }

}