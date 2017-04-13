class Vector2 {
    private _x : number;
    private _y : number;

    constructor(x : number, y : number) {
        this._x = x;
        this._y = y;
    }

    public magnitude() : number {
        let magnitude : number = Math.sqrt((Math.pow(this.x, 2)) + (Math.pow(this.y, 2)));
        return magnitude;
    }

    public normalize() : Vector2 {
        let x = (!isNaN(this.x / this.magnitude()) ? this.x / this.magnitude() : 0);
        let y = (!isNaN(this.y / this.magnitude()) ? this.y / this.magnitude() : 0);
        let normalized : Vector2 = new Vector2(x, y);
        return normalized;
    }

    public add(amount : Vector2) : void {
        this.x += amount.x;
        this.y += amount.y;
    }

    public subtract(amount : Vector2) : void {
        this.x -= amount.x;
        this.y -= amount.y;
    }

    public divide(amount : Vector2) : Vector2 {
        return new Vector2(this.x / amount.x, this.y / amount.y);
    }

    public multiplyByVector(amount : Vector2) : Vector2 {
        return new Vector2(this.x * amount.x, this.y * amount.y);
    }

    public multiply(amount : number) : Vector2 {
        return new Vector2(this.x * amount, this.y * amount);
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    public static distance(position1 : Vector2, position2 : Vector2) : number {
        let xOffset  : number = position1.x - position2.x;
        let yOffset  : number = position1.y - position2.y;
        let distance : number = Math.sqrt((Math.pow(xOffset, 2)) + (Math.pow(yOffset, 2)));
        return distance;
    }

    public static getDifference(position1 : Vector2, position2 : Vector2) : Vector2 {
        let xOffset  : number = position1.x - position2.x;
        let yOffset  : number = position1.y - position2.y;
        return new Vector2(xOffset, yOffset);
    }

    public static sum(value1 : Vector2, value2 : Vector2) : Vector2 {
        return new Vector2(value1.x + value2.x, value1.y + value2.y);
    }

    public static mouseIntersection(position1 : Vector2, scale1 : Vector2, mouseXY : Vector2) : boolean {
        let positionDifference = Vector2.getDifference(position1, mouseXY);

        if (
            (positionDifference.x >= scale1.x || positionDifference.x <= -scale1.x) ||
            (positionDifference.y >= scale1.y || positionDifference.y <= -scale1.y)
        ) {
            return false;
        }

        return true;
    }
}