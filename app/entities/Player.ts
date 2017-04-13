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
class Player extends Entity implements BaseEntity {
    private static MOVE_SPEED : number = 220;
    private currentSpeed : number = Player.MOVE_SPEED;

    constructor(position : Vector2, rotation : number, scale : Vector2, entityType: EntityType) {
        super(position, 90, scale, entityType);
        super.addComponent(new CircleColliderComponent(this, true));
        super.addComponent(new KeyInputComponent(this));
        super.addComponent(new MouseInputComponent(this));
        super.addComponent(new SpriteComponent(this, "player", "png"));
        super.addComponent(new HealthComponent(this, 100));
        super.addComponent(new HealthBarComponent(this, 25, 25, 250, 25, "#e74c3c", "#2ecc71", false, null));
        super.addComponent(new BoostComponent(this, 350, 100, 2, 5));
        super.addComponent(new BoostBarComponent(this, 25, 55, 250, 25, "#2980b9", "#3498db", false, null));
        super.addComponent(new ShootComponent(this, 0.5));
        super.addComponent(new LifeStateComponent(this));
    }

    public update() : void {
        let healthComponent = this.getComponent<HealthComponent>(HealthComponent);
        let lifeStateComponent = this.getComponent<LifeStateComponent>(LifeStateComponent);

        if (healthComponent.getHealth() <= 0) {
            lifeStateComponent.dieAndDestroy();
            GameStateManager.setActive(GameState.GAME_OVER);
        }

        this.move();
    }

    private move() : void {
        this.checkForBoosting();

        let inputComponent = this.getComponent<KeyInputComponent>(KeyInputComponent);
        let input : Vector2 = new Vector2(inputComponent.getAxisRaw("Horizontal"), inputComponent.getAxisRaw("Vertical"));
        let direction : Vector2 = input.normalize();
        let velocity = direction.multiply(this.currentSpeed);
        let moveAmount = velocity.multiply(Time.deltaTime);
        let collisionComponent = this.getComponent<CircleColliderComponent>(CircleColliderComponent);
        if (!collisionComponent.collidesWithWorldBounds(moveAmount)) {
            this.getComponent<TransformComponent>(TransformComponent).increasePosition(moveAmount);
        }
    }

    private checkForBoosting() : void {
        if (this.hasComponent(BoostComponent)) {
            let inputComponent = this.getComponent<KeyInputComponent>(KeyInputComponent);
            let boostComponent = this.getComponent<BoostComponent>(BoostComponent);

            if (inputComponent.isPressed("boost") && inputComponent.isMoving()) {
                boostComponent.startBoosting();
            } else {
                boostComponent.stopBoosting();
            }
            this.currentSpeed = (boostComponent.entityCanBoost() ? boostComponent.getBoostSpeed() : Player.MOVE_SPEED);
        }
    }
}