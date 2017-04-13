///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 12-4-17.
 */
class CircleColliderComponent extends BaseComponent implements Component {

    private checkForWorldCollision : boolean;
    private radius : number;

    constructor(entity : Entity, checkForWorldCollision : boolean = true, radius : number = null) {
        super(entity);
        this.radius = radius;
        if (radius == null) {
            let transformComponent = this.entity.transform;
            this.radius = transformComponent.scale.x/2;
        }
        this.checkForWorldCollision = checkForWorldCollision;
    }

    update(): void {

    }

    public collidesWith(entityToCheck : Entity) : boolean {
        let myTransform = this.entity.transform;
        // Convert the entities position from the left corner to the center of the entity,
        // so we can use the radius
        let myPosition = Vector2.sum(myTransform.position, new Vector2(myTransform.scale.x/2, myTransform.scale.y/2));

        let entityToCheckTransform = entityToCheck.transform;
        // Convert the entities position from the left corner to the center of the entity,
        // so we can use the radius
        let entityToCheckPosition = Vector2.sum(entityToCheckTransform.position, new Vector2(entityToCheckTransform.scale.x/2,entityToCheckTransform.scale.y/2));

        // Calculate the distance from the center of entity1 to the center of entity2 so
        // we can compare this to the collider radius of the current entity
        let distanceToEntity = Vector2.distance(myPosition, entityToCheckPosition);
        if ((distanceToEntity <= this.radius*2) && entityToCheck.hasComponent(CircleColliderComponent)) {
            return true;
        }

        return false;
    }

    public collidesWithWorldBounds(moveAmount : Vector2) : boolean {
        let myTransform = this.entity.transform;
        let centerX : number = myTransform.position.x + myTransform.scale.x/2;
        let centerY : number = myTransform.position.y + myTransform.scale.y/2;

        if (
                (((centerX-this.radius) + moveAmount.x > 0 &&
                (centerX+this.radius) + moveAmount.x < window.innerWidth) &&
                (((centerY-this.radius) + moveAmount.y > 0 &&
                (centerY+this.radius) + moveAmount.y < window.innerHeight)))
        ) {
            return false;
        }

        if ((centerX-this.radius) < 0) myTransform.position.x = 0;

        return true;
    }

    public getRadius() : number {
        return this.radius;
    }

}