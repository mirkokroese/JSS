var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/Component.ts"/>
///<reference path="../../entities/Player.ts"/>
///<reference path="../baseComponent/BaseComponent.ts"/>
///<reference path="../combatComponents/MeleeAttackComponent.ts"/>
///<reference path="../mechanicalComponents/BoostComponent.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
var AdvancedAIComponent = (function (_super) {
    __extends(AdvancedAIComponent, _super);
    function AdvancedAIComponent(entity, player) {
        _super.call(this, entity);
        this.attackDelayTimer = 0;
        this.canAttack = true;
        this.player = player;
        AdvancedAIComponent.MOVE_SPEED = this.entity.getMoveSpeed() * AdvancedAIComponent.MOVE_SPEED_MULTIPLIER;
        this.currentSpeed = AdvancedAIComponent.MOVE_SPEED;
    }
    AdvancedAIComponent.prototype.update = function () {
        var playerPosition = this.player.getComponent(TransformComponent).position;
        var myPosition = this.entity.getComponent(TransformComponent).position;
        var distance = Vector2.distance(playerPosition, myPosition);
        var collisionComponent = this.entity.getComponent(CircleColliderComponent);
        var attackRange = collisionComponent.getRadius() - 5;
        if (distance > attackRange) {
            if (this.entity.hasComponent(BoostComponent)) {
                this.checkForBoosting(distance);
            }
            var direction = Vector2.getDifference(playerPosition, myPosition).normalize();
            var velocity = direction.multiply(this.currentSpeed);
            var moveAmount = velocity.multiply(Time.deltaTime);
            this.entity.getComponent(TransformComponent).increasePosition(moveAmount);
        }
        if (this.canAttack && collisionComponent.collidesWith(this.player)) {
            var playerHealth = this.player.getComponent(HealthComponent);
            playerHealth.removeHealth(this.entity.getComponent(MeleeAttackComponent).generateHitBasedOnLinearChance());
            this.canAttack = false;
        }
        if (!this.canAttack) {
            this.attackDelayTimer += Time.deltaTime;
            if (this.attackDelayTimer > AdvancedAIComponent.ATTACK_RATE) {
                this.canAttack = true;
                this.attackDelayTimer = 0;
            }
        }
    };
    AdvancedAIComponent.prototype.checkForBoosting = function (distance) {
        var boostComponent = (this.entity.hasComponent(BoostComponent) ? this.entity.getComponent(BoostComponent) : null);
        if (distance >= AdvancedAIComponent.FAR && boostComponent != null) {
            boostComponent.startBoosting();
        }
        else {
            boostComponent.stopBoosting();
        }
        this.currentSpeed = (boostComponent.entityCanBoost() ? boostComponent.getBoostSpeed() : AdvancedAIComponent.MOVE_SPEED);
    };
    AdvancedAIComponent.MOVE_SPEED_MULTIPLIER = 1.5;
    AdvancedAIComponent.FAR = 600;
    AdvancedAIComponent.ATTACK_RANGE = 130;
    AdvancedAIComponent.ATTACK_RATE = 1;
    return AdvancedAIComponent;
}(BaseComponent));
