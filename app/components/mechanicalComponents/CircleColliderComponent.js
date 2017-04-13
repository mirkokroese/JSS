var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 12-4-17.
 */
var CircleColliderComponent = (function (_super) {
    __extends(CircleColliderComponent, _super);
    function CircleColliderComponent(entity, checkForWorldCollision, radius) {
        if (checkForWorldCollision === void 0) { checkForWorldCollision = true; }
        if (radius === void 0) { radius = null; }
        _super.call(this, entity);
        this.radius = radius;
        if (radius == null) {
            var transformComponent = this.entity.transform;
            this.radius = transformComponent.scale.x / 2;
        }
        this.checkForWorldCollision = checkForWorldCollision;
    }
    CircleColliderComponent.prototype.update = function () {
    };
    CircleColliderComponent.prototype.collidesWith = function (entityToCheck) {
        var myTransform = this.entity.transform;
        // Convert the entities position from the left corner to the center of the entity,
        // so we can use the radius
        var myPosition = Vector2.sum(myTransform.position, new Vector2(myTransform.scale.x / 2, myTransform.scale.y / 2));
        var entityToCheckTransform = entityToCheck.transform;
        // Convert the entities position from the left corner to the center of the entity,
        // so we can use the radius
        var entityToCheckPosition = Vector2.sum(entityToCheckTransform.position, new Vector2(entityToCheckTransform.scale.x / 2, entityToCheckTransform.scale.y / 2));
        // Calculate the distance from the center of entity1 to the center of entity2 so
        // we can compare this to the collider radius of the current entity
        var distanceToEntity = Vector2.distance(myPosition, entityToCheckPosition);
        if ((distanceToEntity <= this.radius * 2) && entityToCheck.hasComponent(CircleColliderComponent)) {
            return true;
        }
        return false;
    };
    CircleColliderComponent.prototype.collidesWithWorldBounds = function (moveAmount) {
        var myTransform = this.entity.transform;
        var centerX = myTransform.position.x + myTransform.scale.x / 2;
        var centerY = myTransform.position.y + myTransform.scale.y / 2;
        if ((((centerX - this.radius) + moveAmount.x > 0 &&
            (centerX + this.radius) + moveAmount.x < window.innerWidth) &&
            (((centerY - this.radius) + moveAmount.y > 0 &&
                (centerY + this.radius) + moveAmount.y < window.innerHeight)))) {
            return false;
        }
        if ((centerX - this.radius) < 0)
            myTransform.position.x = 0;
        return true;
    };
    CircleColliderComponent.prototype.getRadius = function () {
        return this.radius;
    };
    return CircleColliderComponent;
}(BaseComponent));
