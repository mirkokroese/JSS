var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="Entity.ts"/>
///<reference path="../components/inputComponents/KeyInputComponent.ts"/>
///<reference path="../components/graphicalComponents/SpriteComponent.ts"/>
///<reference path="../util/Time.ts"/>
///<reference path="Player.ts"/>
///<reference path="../components/aiComponents/SimpleAIComponent.ts"/>
///<reference path="../components/graphicalComponents/BoostBarComponent.ts"/>
///<reference path="../components/mechanicalComponents/CircleColliderComponent.ts"/>
/**
 * Created by mirko on 10-4-17.
 */
var SimpleEnemy = (function (_super) {
    __extends(SimpleEnemy, _super);
    function SimpleEnemy(position, rotation, scale, player, entityType, movementSpeed, boostSpeed) {
        _super.call(this, position, rotation, scale, entityType);
        this.player = player;
        this.moveSpeed = movementSpeed;
        this.boostSpeed = boostSpeed;
        _super.prototype.addComponent.call(this, new SimpleAIComponent(this, player));
        _super.prototype.addComponent.call(this, new CircleColliderComponent(this, true));
        _super.prototype.addComponent.call(this, new SpriteComponent(this, "simpleEnemy", "png"));
        _super.prototype.addComponent.call(this, new MeleeAttackComponent(this, 15, 5));
        _super.prototype.addComponent.call(this, new HealthComponent(this, 50));
        _super.prototype.addComponent.call(this, new HealthBarComponent(this, 0, -35, this.transform.scale.x, 10, "#e74c3c", "#2ecc71", true, null));
        _super.prototype.addComponent.call(this, new LifeStateComponent(this));
    }
    SimpleEnemy.prototype.update = function () {
        var healthComponent = this.getComponent(HealthComponent);
        var lifeStateComponent = this.getComponent(LifeStateComponent);
        if (healthComponent.getHealth() <= 0) {
            lifeStateComponent.dieAndDestroy();
        }
    };
    SimpleEnemy.prototype.getMoveSpeed = function () {
        return this.moveSpeed;
    };
    SimpleEnemy.prototype.getBoostSpeed = function () {
        return this.boostSpeed;
    };
    return SimpleEnemy;
}(Entity));
