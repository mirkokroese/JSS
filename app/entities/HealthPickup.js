var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="Entity.ts"/>
///<reference path="../components/mechanicalComponents/CircleColliderComponent.ts"/>
///<reference path="../components/graphicalComponents/SpriteComponent.ts"/>
///<reference path="../components/mechanicalComponents/PickupComponent.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
var HealthPickup = (function (_super) {
    __extends(HealthPickup, _super);
    function HealthPickup(position, rotation, scale) {
        _super.call(this, position, rotation, scale, EntityType.PICKUP);
        _super.prototype.addComponent.call(this, new SpriteComponent(this, "health_pickup", "png"));
        _super.prototype.addComponent.call(this, new CircleColliderComponent(this, false));
        this.pickupComponent = new PickupComponent(this, HealthComponent, EntityType.PLAYER, 20, PickupType.INCREMENT);
        _super.prototype.addComponent.call(this, this.pickupComponent);
        _super.prototype.addComponent.call(this, new LifeStateComponent(this));
    }
    HealthPickup.prototype.update = function () {
        var entities = GameManager.GetEntitiesByType(this.pickupComponent.getEntityToAffect());
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            var componentToAffect = this.pickupComponent.getComponentToAffect();
            switch (componentToAffect) {
                case HealthComponent:
                    if (entity.hasComponent(componentToAffect)) {
                        if (this.getComponent(CircleColliderComponent).collidesWith(entity)) {
                            var entityComponent = entity.getComponent(componentToAffect);
                            entityComponent.addHealth(this.pickupComponent.getAmount());
                            this.getComponent(LifeStateComponent).dieAndDestroy();
                        }
                    }
                    break;
            }
        }
    };
    return HealthPickup;
}(Entity));
