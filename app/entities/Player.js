var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="Entity.ts"/>
///<reference path="../components/inputComponents/KeyInputComponent.ts"/>
///<reference path="../components/graphicalComponents/SpriteComponent.ts"/>
///<reference path="BaseEntity.ts"/>
///<reference path="../components/mechanicalComponents/HealthComponent.ts"/>
///<reference path="../components/inputComponents/MouseInputComponent.ts"/>
///<reference path="../components/combatComponents/ShootComponent.ts"/>
/**
 * Created by mirko on 10-4-17.
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(position, rotation, scale, entityType) {
        _super.call(this, position, 90, scale, entityType);
        this.currentSpeed = Player.MOVE_SPEED;
        _super.prototype.addComponent.call(this, new CircleColliderComponent(this, true));
        _super.prototype.addComponent.call(this, new KeyInputComponent(this));
        _super.prototype.addComponent.call(this, new MouseInputComponent(this));
        _super.prototype.addComponent.call(this, new SpriteComponent(this, "player", "png"));
        _super.prototype.addComponent.call(this, new HealthComponent(this, 100));
        _super.prototype.addComponent.call(this, new HealthBarComponent(this, 25, 25, 250, 25, "#e74c3c", "#2ecc71", false, null));
        _super.prototype.addComponent.call(this, new BoostComponent(this, 350, 100, 2, 5));
        _super.prototype.addComponent.call(this, new BoostBarComponent(this, 25, 55, 250, 25, "#2980b9", "#3498db", false, null));
        _super.prototype.addComponent.call(this, new ShootComponent(this, 0.5));
        _super.prototype.addComponent.call(this, new LifeStateComponent(this));
    }
    Player.prototype.update = function () {
        var healthComponent = this.getComponent(HealthComponent);
        var lifeStateComponent = this.getComponent(LifeStateComponent);
        if (healthComponent.getHealth() <= 0) {
            lifeStateComponent.dieAndDestroy();
            GameStateManager.setActive(GameState.GAME_OVER);
        }
        this.move();
    };
    Player.prototype.move = function () {
        this.checkForBoosting();
        var inputComponent = this.getComponent(KeyInputComponent);
        var input = new Vector2(inputComponent.getAxisRaw("Horizontal"), inputComponent.getAxisRaw("Vertical"));
        var direction = input.normalize();
        var velocity = direction.multiply(this.currentSpeed);
        var moveAmount = velocity.multiply(Time.deltaTime);
        var collisionComponent = this.getComponent(CircleColliderComponent);
        if (!collisionComponent.collidesWithWorldBounds(moveAmount)) {
            this.getComponent(TransformComponent).increasePosition(moveAmount);
        }
    };
    Player.prototype.checkForBoosting = function () {
        if (this.hasComponent(BoostComponent)) {
            var inputComponent = this.getComponent(KeyInputComponent);
            var boostComponent = this.getComponent(BoostComponent);
            if (inputComponent.isPressed("boost") && inputComponent.isMoving()) {
                boostComponent.startBoosting();
            }
            else {
                boostComponent.stopBoosting();
            }
            this.currentSpeed = (boostComponent.entityCanBoost() ? boostComponent.getBoostSpeed() : Player.MOVE_SPEED);
        }
    };
    Player.MOVE_SPEED = 220;
    return Player;
}(Entity));
