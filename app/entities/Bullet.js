var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="Entity.ts"/>
///<reference path="../components/mechanicalComponents/CircleColliderComponent.ts"/>
///<reference path="../components/graphicalComponents/SpriteComponent.ts"/>
/**
 * Created by mirko on 12-4-17.
 */
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(position, rotation, scale, bulletDirection, entityType) {
        _super.call(this, position, rotation, scale, entityType);
        _super.prototype.addComponent.call(this, new CircleColliderComponent(this, true, this.transform.scale.x));
        _super.prototype.addComponent.call(this, new SpriteComponent(this, "player_laser_hit", "png"));
        _super.prototype.addComponent.call(this, new LifeStateComponent(this));
        this.bulletDirection = bulletDirection;
    }
    Bullet.prototype.update = function () {
        var collider = this.getComponent(CircleColliderComponent);
        var entities = GameManager.GetEntitiesByType(EntityType.ENEMY);
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (collider.collidesWith(entity)) {
                var entityHealth = entity.getComponent(HealthComponent);
                entityHealth.removeHealth(Bullet.BULLET_DAMAGE);
                this.getComponent(LifeStateComponent).dieAndDestroy();
            }
        }
        var velocity = this.bulletDirection.multiply(Bullet.BULLET_SPEED);
        var moveAmount = velocity.multiply(Time.deltaTime);
        if (collider.collidesWithWorldBounds(moveAmount)) {
            this.getComponent(LifeStateComponent).dieAndDestroy();
        }
        else {
            this.transform.increasePosition(moveAmount);
        }
    };
    Bullet.BULLET_SPEED = 400;
    Bullet.BULLET_DAMAGE = 25;
    return Bullet;
}(Entity));
