///<reference path="Entity.ts"/>
///<reference path="../components/mechanicalComponents/CircleColliderComponent.ts"/>
///<reference path="../components/graphicalComponents/SpriteComponent.ts"/>
///<reference path="../components/mechanicalComponents/PickupComponent.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
class HealthPickup extends Entity implements BaseEntity {
    private pickupComponent : PickupComponent;

    constructor(position : Vector2, rotation : number, scale : Vector2) {
        super(position, rotation, scale, EntityType.PICKUP);
        super.addComponent(new SpriteComponent(this, "health_pickup", "png"));
        super.addComponent(new CircleColliderComponent(this, false));
        this.pickupComponent = new PickupComponent(this, HealthComponent, EntityType.PLAYER, 20, PickupType.INCREMENT);
        super.addComponent(this.pickupComponent);
        super.addComponent(new LifeStateComponent(this));
    }

    update() : void {
        let entities : Array<BaseEntity> = GameManager.GetEntitiesByType(this.pickupComponent.getEntityToAffect());
        for (let i = 0; i < entities.length; i++) {
            let entity = <Entity>entities[i];
            let componentToAffect = this.pickupComponent.getComponentToAffect();
            switch (componentToAffect) {
                case HealthComponent:
                    if (entity.hasComponent(componentToAffect)) {
                        if (this.getComponent<CircleColliderComponent>(CircleColliderComponent).collidesWith(entity)) {
                            let entityComponent = entity.getComponent(componentToAffect);
                            entityComponent.addHealth(this.pickupComponent.getAmount());
                            this.getComponent<LifeStateComponent>(LifeStateComponent).dieAndDestroy();
                        }
                    }
                    break
            }
        }
    }

}