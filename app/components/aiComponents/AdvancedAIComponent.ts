///<reference path="../baseComponent/Component.ts"/>
///<reference path="../../entities/Player.ts"/>
///<reference path="../baseComponent/BaseComponent.ts"/>
///<reference path="../combatComponents/MeleeAttackComponent.ts"/>
///<reference path="../mechanicalComponents/BoostComponent.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
class AdvancedAIComponent extends BaseComponent implements Component {
    private static MOVE_SPEED_MULTIPLIER : number = 1.5;
    private static MOVE_SPEED : number;
    private static FAR : number = 600;
    private static ATTACK_RANGE : number = 130;
    private static ATTACK_RATE : number = 1;

    private currentSpeed : number;
    private attackDelayTimer : number = 0;
    private canAttack : boolean = true;

    private player : Player;

    constructor(entity : Entity, player : Player) {
        super(entity);
        this.player = player;
        AdvancedAIComponent.MOVE_SPEED = this.entity.getMoveSpeed() * AdvancedAIComponent.MOVE_SPEED_MULTIPLIER;
        this.currentSpeed = AdvancedAIComponent.MOVE_SPEED;
    }

    update(): void {
        let playerPosition = this.player.getComponent<TransformComponent>(TransformComponent).position;
        let myPosition = this.entity.getComponent<TransformComponent>(TransformComponent).position;
        let distance : number = Vector2.distance(playerPosition, myPosition);
        let collisionComponent = this.entity.getComponent<CircleColliderComponent>(CircleColliderComponent);
        let attackRange = collisionComponent.getRadius() - 5;

        if (distance > attackRange) {
            if (this.entity.hasComponent(BoostComponent)) {
                this.checkForBoosting(distance);
            }
            let direction : Vector2 = Vector2.getDifference(playerPosition, myPosition).normalize();
            let velocity = direction.multiply(this.currentSpeed);
            let moveAmount = velocity.multiply(Time.deltaTime);
            this.entity.getComponent<TransformComponent>(TransformComponent).increasePosition(moveAmount);
        }

        if (this.canAttack && collisionComponent.collidesWith(this.player)) {
            let playerHealth = this.player.getComponent<HealthComponent>(HealthComponent);
            playerHealth.removeHealth(this.entity.getComponent<MeleeAttackComponent>(MeleeAttackComponent).generateHitBasedOnLinearChance());
            this.canAttack = false;
        }
        if (!this.canAttack) {
            this.attackDelayTimer+=Time.deltaTime;
            if (this.attackDelayTimer > AdvancedAIComponent.ATTACK_RATE) {
                this.canAttack = true;
                this.attackDelayTimer = 0;
            }
        }
    }

    private checkForBoosting(distance : number) : void {
        let boostComponent = (this.entity.hasComponent(BoostComponent) ? this.entity.getComponent<BoostComponent>(BoostComponent) : null);
        if (distance >= AdvancedAIComponent.FAR && boostComponent != null) {
            boostComponent.startBoosting();
        } else {
            boostComponent.stopBoosting();
        }
        this.currentSpeed = (boostComponent.entityCanBoost() ? boostComponent.getBoostSpeed() : AdvancedAIComponent.MOVE_SPEED);
    }
}