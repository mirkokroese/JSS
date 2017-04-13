var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="baseComponent/Component.ts"/>
///<reference path="../util/Vector2.ts"/>
///<reference path="baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 10-4-17.
 */
var TransformComponent = (function (_super) {
    __extends(TransformComponent, _super);
    function TransformComponent(entity, position, rotation, scale) {
        _super.call(this, entity);
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
    }
    TransformComponent.prototype.update = function () {
    };
    TransformComponent.prototype.increasePosition = function (amount) {
        this.position.add(amount);
    };
    Object.defineProperty(TransformComponent.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            this._position = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransformComponent.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (value) {
            this._rotation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransformComponent.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (value) {
            this._scale = value;
        },
        enumerable: true,
        configurable: true
    });
    return TransformComponent;
}(BaseComponent));
