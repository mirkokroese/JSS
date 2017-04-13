var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/Component.ts"/>
///<reference path="../../graphics/Sprite.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
var SpriteComponent = (function (_super) {
    __extends(SpriteComponent, _super);
    function SpriteComponent(entity, filename, type) {
        _super.call(this, entity);
        this._sprite = new Sprite(filename, type);
    }
    SpriteComponent.prototype.getSprite = function () {
        return this._sprite;
    };
    SpriteComponent.prototype.update = function () {
    };
    return SpriteComponent;
}(BaseComponent));
