var Vector2 = (function () {
    function Vector2(x, y) {
        this._x = x;
        this._y = y;
    }
    Vector2.prototype.magnitude = function () {
        var magnitude = Math.sqrt((Math.pow(this.x, 2)) + (Math.pow(this.y, 2)));
        return magnitude;
    };
    Vector2.prototype.normalize = function () {
        var x = (!isNaN(this.x / this.magnitude()) ? this.x / this.magnitude() : 0);
        var y = (!isNaN(this.y / this.magnitude()) ? this.y / this.magnitude() : 0);
        var normalized = new Vector2(x, y);
        return normalized;
    };
    Vector2.prototype.add = function (amount) {
        this.x += amount.x;
        this.y += amount.y;
    };
    Vector2.prototype.subtract = function (amount) {
        this.x -= amount.x;
        this.y -= amount.y;
    };
    Vector2.prototype.divide = function (amount) {
        return new Vector2(this.x / amount.x, this.y / amount.y);
    };
    Vector2.prototype.multiplyByVector = function (amount) {
        return new Vector2(this.x * amount.x, this.y * amount.y);
    };
    Vector2.prototype.multiply = function (amount) {
        return new Vector2(this.x * amount, this.y * amount);
    };
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    Vector2.distance = function (position1, position2) {
        var xOffset = position1.x - position2.x;
        var yOffset = position1.y - position2.y;
        var distance = Math.sqrt((Math.pow(xOffset, 2)) + (Math.pow(yOffset, 2)));
        return distance;
    };
    Vector2.getDifference = function (position1, position2) {
        var xOffset = position1.x - position2.x;
        var yOffset = position1.y - position2.y;
        return new Vector2(xOffset, yOffset);
    };
    Vector2.sum = function (value1, value2) {
        return new Vector2(value1.x + value2.x, value1.y + value2.y);
    };
    Vector2.mouseIntersection = function (position1, scale1, mouseXY) {
        var positionDifference = Vector2.getDifference(position1, mouseXY);
        if ((positionDifference.x >= scale1.x || positionDifference.x <= -scale1.x) ||
            (positionDifference.y >= scale1.y || positionDifference.y <= -scale1.y)) {
            return false;
        }
        return true;
    };
    return Vector2;
}());
