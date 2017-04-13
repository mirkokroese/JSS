var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 12-4-17.
 */
var ShootComponent = (function (_super) {
    __extends(ShootComponent, _super);
    function ShootComponent(entity, fireRate) {
        _super.call(this, entity);
        this.shootingPossible = true;
        this.canFireTimer = 0;
        this.mouseComponent = this.entity.getComponent(MouseInputComponent);
        this.collisionComponent = this.entity.getComponent(CircleColliderComponent);
        this.fireRate = fireRate;
    }
    ShootComponent.prototype.update = function () {
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
    };
    ShootComponent.prototype.shoot = function () {
        var myTransform = this.entity.transform;
        var myPosition = myTransform.position;
        var mouseClickPosition = this.mouseComponent.getMousePosition();
        var differenceToMouseClickPosition = Vector2.getDifference(mouseClickPosition, myTransform.position);
        var bulletDirection = differenceToMouseClickPosition.normalize();
        var radiusMultiplier = this.collisionComponent.getRadius();
        var initialPosX = (myPosition.x + radiusMultiplier) + (bulletDirection.x * radiusMultiplier);
        var initialPosY = (myPosition.y + radiusMultiplier) + (bulletDirection.y * radiusMultiplier);
        var initialBulletPosition = new Vector2(initialPosX, initialPosY);
        GameManager.InitiateEntity(new Bullet(initialBulletPosition, 0, new Vector2(25, 25), bulletDirection, EntityType.PROJECTILE));
    };
    ShootComponent.prototype.readyToShoot = function () {
        return this.shootingPossible;
    };
    ShootComponent.prototype.canShoot = function (value) {
        this.shootingPossible = value;
    };
    return ShootComponent;
}(BaseComponent));
