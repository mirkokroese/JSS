///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 12-4-17.
 */
class ShootComponent extends BaseComponent implements Component {

    private mouseComponent : MouseInputComponent;
    private collisionComponent : CircleColliderComponent;
    private shootingPossible : boolean = true;
    private fireRate : number;
    private canFireTimer : number = 0;

    constructor(entity : Entity, fireRate : number) {
        super(entity);
        this.mouseComponent = this.entity.getComponent<MouseInputComponent>(MouseInputComponent);
        this.collisionComponent = this.entity.getComponent<CircleColliderComponent>(CircleColliderComponent);
        this.fireRate = fireRate;
    }

    update(): void {
        if (this.mouseComponent.isPressed(MouseButton.BUTTON_LEFT) && this.readyToShoot()) {
            this.shoot();
            this.canShoot(false);
            this.canFireTimer = 0;
        }
        if (!this.readyToShoot()) {
            this.canFireTimer += Time.deltaTime;
            if (this.canFireTimer >= this.fireRate) {
                this.canShoot(true);
                this.canFireTimer = 0;
            }
        }
    }

    private shoot() : void {
        let myTransform = this.entity.transform;
        let myPosition = myTransform.position;
        let mouseClickPosition : Vector2 = this.mouseComponent.getMousePosition();
        let differenceToMouseClickPosition : Vector2 = Vector2.getDifference(mouseClickPosition, myTransform.position);

        let bulletDirection : Vector2 = differenceToMouseClickPosition.normalize();
        let radiusMultiplier : number = this.collisionComponent.getRadius();
        let initialPosX : number = (myPosition.x + radiusMultiplier) + (bulletDirection.x * radiusMultiplier);
        let initialPosY : number = (myPosition.y + radiusMultiplier) + (bulletDirection.y * radiusMultiplier);
        let initialBulletPosition : Vector2 = new Vector2(initialPosX, initialPosY);
        GameManager.InitiateEntity(new Bullet(initialBulletPosition, 0, new Vector2(25,25), bulletDirection, EntityType.PROJECTILE));
    }

    private readyToShoot() : boolean {
        return this.shootingPossible;
    }

    private canShoot(value : boolean) : void {
        this.shootingPossible = value;
    }

}