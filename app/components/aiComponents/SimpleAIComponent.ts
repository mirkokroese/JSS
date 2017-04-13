///<reference path="../baseComponent/Component.ts"/>
///<reference path="../../entities/Player.ts"/>
///<reference path="../baseComponent/BaseComponent.ts"/>
///<reference path="../combatComponents/MeleeAttackComponent.ts"/>
///<reference path="../mechanicalComponents/BoostComponent.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
class SimpleAIComponent extends BaseComponent implements Component {
    private static MOVE_SPEED_MULTIPLIER : number = 1;
    private static MOVE_SPEED : number;
    private static FAR : number = 600;
    private static ATTACK_RANGE : number = 130;
    private static ATTACK_RATE : number = 1;

    private currentSpeed : number = SimpleAIComponent.MOVE_SPEED;
    private attackDelayTimer : number = 0;
    private canAttack : boolean = true;

    private player : Player;
    private inputVector : Vector2 = null;

    constructor(entity : Entity, player : Player) {
        super(entity);
        this.player = player;
        SimpleAIComponent.MOVE_SPEED = this.entity.getMoveSpeed() * SimpleAIComponent.MOVE_SPEED_MULTIPLIER;
        this.currentSpeed = SimpleAIComponent.MOVE_SPEED;
    }

    update(): void {
        let playerPosition = this.player.transform;
        let myTransform = this.entity.transform;
        let myPosition = myTransform.position;
        let distance : number = Vector2.distance(playerPosition, myPosition);
        let collisionComponent = this.entity.getComponent<CircleColliderComponent>(CircleColliderComponent);

        if (this.inputVector == null) this.inputVector = this.getRandomPosition();
        let simpleMoveAmount : Vector2 = (this.inputVector.normalize().multiply(this.currentSpeed).multiply(Time.deltaTime));
        if (collisionComponent.collidesWithWorldBounds(simpleMoveAmount)) {
            let randomPos = this.getRandomPosition();
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
            let playerHealth = this.player.getComponent<HealthComponent>(HealthComponent);
            playerHealth.removeHealth(this.entity.getComponent<MeleeAttackComponent>(MeleeAttackComponent).generateHitBasedOnLinearChance());
            this.canAttack = false;
        }

        if (!this.canAttack) {
            this.attackDelayTimer+=Time.deltaTime;
            if (this.attackDelayTimer > SimpleAIComponent.ATTACK_RATE) {
                this.canAttack = true;
                this.attackDelayTimer = 0;
            }
        }
    }

    private move(transform : TransformComponent) : void {
        let direction : Vector2 = this.inputVector.normalize();
        let velocity : Vector2 = direction.multiply(this.currentSpeed);
        let moveAmount : Vector2 = velocity.multiply(Time.deltaTime);
        transform.increasePosition(moveAmount);
    }

    private checkForBoosting(distance : number) : void {
        let boostComponent = (this.entity.hasComponent(BoostComponent) ? this.entity.getComponent<BoostComponent>(BoostComponent) : null);
        if (distance >= SimpleAIComponent.FAR && boostComponent != null) {
            boostComponent.startBoosting();
        } else {
            boostComponent.stopBoosting();
        }
        this.currentSpeed = (boostComponent.entityCanBoost() ? boostComponent.getBoostSpeed() : SimpleAIComponent.MOVE_SPEED);
    }

    private getRandomPosition() : Vector2 {
        if (this.inputVector == null) {
            this.inputVector = new Vector2(Math.random(), Math.random());
        }

        let multiplierX = 0;
        let multiplierY = 0;
        if (this.inputVector.x > 0) multiplierX = -1;
        if (this.inputVector.x < 0) multiplierX = 1;
        if (this.inputVector.y > 0) multiplierY = -1;
        if (this.inputVector.y < 0) multiplierY = 1;

        let randomX = multiplierX * Math.random();
        let randomY = multiplierY * Math.random();

        //this.convertRandomToInputValue(Math.random());
        //this.convertRandomToInputValue(Math.random());

        return new Vector2(randomX, randomY);
    }

    private convertRandomToInputValue(value : number) {
        let inputValue = 0;
        if (value < (1/3)) inputValue = -1;
        if (value > (2/3)) inputValue = 1;

        return inputValue;
    }
}