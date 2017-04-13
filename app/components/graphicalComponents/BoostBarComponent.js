var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="GuiComponent.ts"/>
///<reference path="../../graphics/Sprite.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
var BoostBarComponent = (function (_super) {
    __extends(BoostBarComponent, _super);
    function BoostBarComponent(entity, x, y, width, height, backgroundColor, foregroundColor, relativeToEntity, entityHUDimage) {
        if (relativeToEntity === void 0) { relativeToEntity = false; }
        if (entityHUDimage === void 0) { entityHUDimage = null; }
        _super.call(this, entity);
        this.x = x;
        this.y = y;
        if (relativeToEntity) {
            this.xOffset = x;
            this.yOffset = y;
        }
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.foregroundColor = foregroundColor;
        this.relativeToEntity = relativeToEntity;
        this.entityHUDImage = entityHUDimage;
    }
    BoostBarComponent.prototype.update = function () {
        if (this.relativeToEntity) {
            var entityTransform = this.entity.getComponent(TransformComponent).position;
            this.x = (entityTransform.x + this.xOffset);
            this.y = (entityTransform.y + this.yOffset);
        }
    };
    BoostBarComponent.prototype.getX = function () {
        return this.x;
    };
    BoostBarComponent.prototype.getY = function () {
        return this.y;
    };
    BoostBarComponent.prototype.getWidth = function (isForeground) {
        if (isForeground === void 0) { isForeground = false; }
        if (isForeground) {
            var boost = this.entity.getComponent(BoostComponent);
            return (this.width * boost.getBoostAmountPercentageDecimal());
        }
        return this.width;
    };
    BoostBarComponent.prototype.getHeight = function () {
        return this.height;
    };
    BoostBarComponent.prototype.getBackgroundColor = function () {
        return this.backgroundColor;
    };
    BoostBarComponent.prototype.getForegroundColor = function () {
        return this.foregroundColor;
    };
    BoostBarComponent.prototype.getEntityHUDImage = function () {
        return this.entityHUDImage;
    };
    return BoostBarComponent;
}(BaseComponent));
