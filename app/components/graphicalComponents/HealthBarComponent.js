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
var HealthBarComponent = (function (_super) {
    __extends(HealthBarComponent, _super);
    function HealthBarComponent(entity, x, y, width, height, backgroundColor, foregroundColor, relativeToEntity, entityHUDimage) {
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
    HealthBarComponent.prototype.update = function () {
        if (this.relativeToEntity) {
            var entityTransform = this.entity.getComponent(TransformComponent).position;
            this.x = (entityTransform.x + this.xOffset);
            this.y = (entityTransform.y + this.yOffset);
        }
    };
    HealthBarComponent.prototype.getX = function () {
        return this.x;
    };
    HealthBarComponent.prototype.getY = function () {
        return this.y;
    };
    HealthBarComponent.prototype.getWidth = function (isForeground) {
        if (isForeground === void 0) { isForeground = false; }
        if (isForeground) {
            var health = this.entity.getComponent(HealthComponent);
            return (this.width * health.getHealthPercentageDecimal());
        }
        return this.width;
    };
    HealthBarComponent.prototype.getHeight = function () {
        return this.height;
    };
    HealthBarComponent.prototype.getBackgroundColor = function () {
        return this.backgroundColor;
    };
    HealthBarComponent.prototype.getForegroundColor = function () {
        return this.foregroundColor;
    };
    HealthBarComponent.prototype.getEntityHUDImage = function () {
        return this.entityHUDImage;
    };
    return HealthBarComponent;
}(BaseComponent));
