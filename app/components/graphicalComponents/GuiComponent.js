var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/BaseComponent.ts"/>
///<reference path="GuiType.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
var GuiComponent = (function (_super) {
    __extends(GuiComponent, _super);
    function GuiComponent(entity, xPos, yPos, relativeToEntity) {
        if (relativeToEntity === void 0) { relativeToEntity = false; }
        _super.call(this, entity);
        this.xPos = xPos;
        this.yPos = yPos;
        if (relativeToEntity) {
            var entityTransform = entity.getComponent(TransformComponent).position;
            this.xPos = entityTransform.x + xPos;
            this.yPos = entityTransform.y + yPos;
        }
        this.relativeToEntity = relativeToEntity;
    }
    GuiComponent.prototype.update = function () {
        if (this.relativeToEntity) {
            var entityTransform = this.entity.getComponent(TransformComponent).position;
            this.xPos = entityTransform.x + this.xPos;
            this.yPos = entityTransform.y + this.yPos;
        }
    };
    GuiComponent.prototype.getX = function () {
        return this.xPos;
    };
    GuiComponent.prototype.getY = function () {
        return this.yPos;
    };
    GuiComponent.prototype.isRelativeToEntity = function () {
        return this.relativeToEntity;
    };
    return GuiComponent;
}(BaseComponent));
