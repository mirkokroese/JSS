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
class AdvancedEnemy extends Entity implements BaseEntity {
    private player : Player;
    private moveSpeed : number;
    private boostSpeed : number;

    constructor(position: Vector2, rotation: number, scale: Vector2, player: Player, entityType: EntityType,
                moveSpeed : number, boostSpeed : number) {
        super(position, rotation, scale, entityType);
        this.player = player;
        this.moveSpeed = moveSpeed;
        this.boostSpeed = boostSpeed;
        super.addComponent(new AdvancedAIComponent(this, player));
        super.addComponent(new CircleColliderComponent(this, false));
        super.addComponent(new SpriteComponent(this, "advancedEnemy", "png"));
        super.addComponent(new MeleeAttackComponent(this, 15, 5));
        super.addComponent(new HealthComponent(this, 100));
        super.addComponent(new HealthBarComponent(this, 0, -35, this.transform.scale.x, 10, "#e74c3c", "#2ecc71", true, null))
        super.addComponent(new BoostComponent(this, this.boostSpeed, 50, 2, 5));
        super.addComponent(new BoostBarComponent(this, 0, -20, this.transform.scale.x, 10, "#2980b9", "#3498db", true, null));
        super.addComponent(new LifeStateComponent(this));
    }

    public update() {
        let healthComponent = this.getComponent<HealthComponent>(HealthComponent);
        let lifeStateComponent = this.getComponent<LifeStateComponent>(LifeStateComponent);

        if (healthComponent.getHealth() <= 0) {
            lifeStateComponent.dieAndDestroy();
        }
    }

    public getMoveSpeed() : number {
        return this.moveSpeed;
    }

    public getBoostSpeed() : number {
        return this.boostSpeed;
    }
}