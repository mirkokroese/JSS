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
///<reference path="../components/graphicalComponents/BoostBarComponent.ts"/>
///<reference path="../components/graphicalComponents/HealthBarComponent.ts"/>
///<reference path="../components/aiComponents/AdvancedAIComponent.ts"/>
///<reference path="../components/mechanicalComponents/LifeStateComponent.ts"/>
/**
 * Created by mirko on 10-4-17.
 */
var AdvancedEnemy = (function (_super) {
    __extends(AdvancedEnemy, _super);
    function AdvancedEnemy(position, rotation, scale, player, entityType, moveSpeed, boostSpeed) {
        _super.call(this, position, rotation, scale, entityType);
        this.player = player;
        this.moveSpeed = moveSpeed;
        this.boostSpeed = boostSpeed;
        _super.prototype.addComponent.call(this, new AdvancedAIComponent(this, player));
        _super.prototype.addComponent.call(this, new CircleColliderComponent(this, false));
        _super.prototype.addComponent.call(this, new SpriteComponent(this, "advancedEnemy", "png"));
        _super.prototype.addComponent.call(this, new MeleeAttackComponent(this, 15, 5));
        _super.prototype.addComponent.call(this, new HealthComponent(this, 100));
        _super.prototype.addComponent.call(this, new HealthBarComponent(this, 0, -35, this.transform.scale.x, 10, "#e74c3c", "#2ecc71", true, null));
        _super.prototype.addComponent.call(this, new BoostComponent(this, this.boostSpeed, 50, 2, 5));
        _super.prototype.addComponent.call(this, new BoostBarComponent(this, 0, -20, this.transform.scale.x, 10, "#2980b9", "#3498db", true, null));
        _super.prototype.addComponent.call(this, new LifeStateComponent(this));
    }
    AdvancedEnemy.prototype.update = function () {
        var healthComponent = this.getComponent(HealthComponent);
        var lifeStateComponent = this.getComponent(LifeStateComponent);
        if (healthComponent.getHealth() <= 0) {
            lifeStateComponent.dieAndDestroy();
        }
    };
    AdvancedEnemy.prototype.getMoveSpeed = function () {
        return this.moveSpeed;
    };
    AdvancedEnemy.prototype.getBoostSpeed = function () {
        return this.boostSpeed;
    };
    return AdvancedEnemy;
}(Entity));
