///<reference path="Entity.ts"/>
///<reference path="../components/mechanicalComponents/CircleColliderComponent.ts"/>
///<reference path="../components/graphicalComponents/SpriteComponent.ts"/>
/**
 * Created by mirko on 12-4-17.
 */
class Bullet extends Entity implements BaseEntity {
    private static BULLET_SPEED : number = 400;
    private static BULLET_DAMAGE : number = 25;
    private bulletDirection : Vector2;

    constructor(position : Vector2, rotation : number, scale : Vector2, bulletDirection : Vector2, entityType : EntityType) {
        super(position, rotation, scale, entityType);
        super.addComponent(new CircleColliderComponent(this, true, this.transform.scale.x));
        super.addComponent(new SpriteComponent(this, "player_laser_hit", "png"));
        super.addComponent(new LifeStateComponent(this));
        this.bulletDirection = bulletDirection;
    }

    public update() : void {
        let collider = this.getComponent<CircleColliderComponent>(CircleColliderComponent);
        let entities = GameManager.GetEntitiesByType(EntityType.ENEMY);
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (collider.collidesWith(entity)) {
                let entityHealth = entity.getComponent<HealthComponent>(HealthComponent);
                entityHealth.removeHealth(Bullet.BULLET_DAMAGE);
                this.getComponent<LifeStateComponent>(LifeStateComponent).dieAndDestroy();
            }
        }

        let velocity : Vector2 = this.bulletDirection.multiply(Bullet.BULLET_SPEED);
        let moveAmount : Vector2 = velocity.multiply(Time.deltaTime);

        if (collider.collidesWithWorldBounds(moveAmount)) {
            this.getComponent<LifeStateComponent>(LifeStateComponent).dieAndDestroy();
        } else {
            this.transform.increasePosition(moveAmount);
        }

    }

}