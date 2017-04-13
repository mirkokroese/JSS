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
var SimpleAIComponent = (function (_super) {
    __extends(SimpleAIComponent, _super);
    function SimpleAIComponent(entity, player) {
        _super.call(this, entity);
        this.currentSpeed = SimpleAIComponent.MOVE_SPEED;
        this.attackDelayTimer = 0;
        this.canAttack = true;
        this.inputVector = null;
        this.player = player;
        SimpleAIComponent.MOVE_SPEED = this.entity.getMoveSpeed() * SimpleAIComponent.MOVE_SPEED_MULTIPLIER;
        this.currentSpeed = SimpleAIComponent.MOVE_SPEED;
    }
    SimpleAIComponent.prototype.update = function () {
        var playerPosition = this.player.transform;
        var myTransform = this.entity.transform;
        var myPosition = myTransform.position;
        var distance = Vector2.distance(playerPosition, myPosition);
        var collisionComponent = this.entity.getComponent(CircleColliderComponent);
        if (this.inputVector == null)
            this.inputVector = this.getRandomPosition();
        var simpleMoveAmount = (this.inputVector.normalize().multiply(this.currentSpeed).multiply(Time.deltaTime));
        if (collisionComponent.collidesWithWorldBounds(simpleMoveAmount)) {
            var randomPos = this.getRandomPosition();
            while (randomPos == this.inputVector) {
                randomPos = this.getRandomPosition();
            }
            this.inputVector = randomPos;
        }
        if (this.entity.hasComponent(BoostComponent)) {
            this.checkForBoosting(distance);
        }
        this.move(myTransform);
        if (this.canAttack && collisionComponent.collidesWith(this.player)) {
            var playerHealth = this.player.getComponent(HealthComponent);
            playerHealth.removeHealth(this.entity.getComponent(MeleeAttackComponent).generateHitBasedOnLinearChance());
            this.canAttack = false;
        }
        if (!this.canAttack) {
            this.attackDelayTimer += Time.deltaTime;
            if (this.attackDelayTimer > SimpleAIComponent.ATTACK_RATE) {
                this.canAttack = true;
                this.attackDelayTimer = 0;
            }
        }
    };
    SimpleAIComponent.prototype.move = function (transform) {
        var direction = this.inputVector.normalize();
        var velocity = direction.multiply(this.currentSpeed);
        var moveAmount = velocity.multiply(Time.deltaTime);
        transform.increasePosition(moveAmount);
    };
    SimpleAIComponent.prototype.checkForBoosting = function (distance) {
        var boostComponent = (this.entity.hasComponent(BoostComponent) ? this.entity.getComponent(BoostComponent) : null);
        if (distance >= SimpleAIComponent.FAR && boostComponent != null) {
            boostComponent.startBoosting();
        }
        else {
            boostComponent.stopBoosting();
        }
        this.currentSpeed = (boostComponent.entityCanBoost() ? boostComponent.getBoostSpeed() : SimpleAIComponent.MOVE_SPEED);
    };
    SimpleAIComponent.prototype.getRandomPosition = function () {
        if (this.inputVector == null) {
            this.inputVector = new Vector2(Math.random(), Math.random());
        }
        var multiplierX = 0;
        var multiplierY = 0;
        if (this.inputVector.x > 0)
            multiplierX = -1;
        if (this.inputVector.x < 0)
            multiplierX = 1;
        if (this.inputVector.y > 0)
            multiplierY = -1;
        if (this.inputVector.y < 0)
            multiplierY = 1;
        var randomX = multiplierX * Math.random();
        var randomY = multiplierY * Math.random();
        //this.convertRandomToInputValue(Math.random());
        //this.convertRandomToInputValue(Math.random());
        return new Vector2(randomX, randomY);
    };
    SimpleAIComponent.prototype.convertRandomToInputValue = function (value) {
        var inputValue = 0;
        if (value < (1 / 3))
            inputValue = -1;
        if (value > (2 / 3))
            inputValue = 1;
        return inputValue;
    };
    SimpleAIComponent.MOVE_SPEED_MULTIPLIER = 1;
    SimpleAIComponent.FAR = 600;
    SimpleAIComponent.ATTACK_RANGE = 130;
    SimpleAIComponent.ATTACK_RATE = 1;
    return SimpleAIComponent;
}(BaseComponent));
