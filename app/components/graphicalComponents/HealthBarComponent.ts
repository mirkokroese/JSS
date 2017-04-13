///<reference path="GuiComponent.ts"/>
///<reference path="../../graphics/Sprite.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
class HealthBarComponent extends BaseComponent implements Component {
    private x : number;
    private y : number;
    private xOffset : number;
    private yOffset : number;
    private width : number;
    private height : number;
    private backgroundColor : string;
    private foregroundColor : string;
    private relativeToEntity : boolean;
    private entityHUDImage : Sprite;

    constructor(
            entity : Entity, x : number, y : number, width : number, height : number,
            backgroundColor : string, foregroundColor : string, relativeToEntity : boolean = false, 
            entityHUDimage : Sprite = null
        ) {
        super(entity);
        this.x = x;
        this.y = y;
        if (relativeToEntity) {
            this.xOffset = x;
            this.yOffset = y;
        }
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.foregroundColor = foregroundColor;
        this.relativeToEntity = relativeToEntity;
        this.entityHUDImage = entityHUDimage;
    }

    update(): void {
        if (this.relativeToEntity) {
            let entityTransform : Vector2 = this.entity.getComponent<TransformComponent>(TransformComponent).position;
            this.x = (entityTransform.x + this.xOffset);
            this.y = (entityTransform.y + this.yOffset);
        }
    }

    public getX() : number {
        return this.x;
    }

    public getY() : number {
        return this.y;
    }

    public getWidth(isForeground : boolean = false) : number {
        if (isForeground) {
            let health = this.entity.getComponent<HealthComponent>(HealthComponent);
            return (this.width * health.getHealthPercentageDecimal());
        }

        return this.width;
    }

    public  getHeight(): number {
        return this.height;
    }

    public getBackgroundColor(): string {
        return this.backgroundColor;
    }

    public getForegroundColor(): string {
        return this.foregroundColor;
    }

    public  getEntityHUDImage(): Sprite {
        return this.entityHUDImage;
    }
}