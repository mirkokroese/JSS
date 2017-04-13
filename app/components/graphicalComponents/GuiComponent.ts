///<reference path="../baseComponent/BaseComponent.ts"/>
///<reference path="GuiType.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
abstract class GuiComponent extends BaseComponent implements Component {
    protected type : GuiType;
    protected xPos : number;
    protected yPos : number;
    protected relativeToEntity : boolean;

    constructor(entity : Entity, xPos : number, yPos : number, relativeToEntity : boolean = false) {
        super(entity);
        this.xPos = xPos;
        this.yPos = yPos;
        if (relativeToEntity) {
            let entityTransform : Vector2 = entity.getComponent<TransformComponent>(TransformComponent).position;
            this.xPos = entityTransform.x + xPos;
            this.yPos = entityTransform.y + yPos;
        }
        this.relativeToEntity = relativeToEntity;
    }

    update(): void {
        if (this.relativeToEntity) {
            let entityTransform : Vector2 = this.entity.getComponent<TransformComponent>(TransformComponent).position;
            this.xPos = entityTransform.x + this.xPos;
            this.yPos = entityTransform.y + this.yPos;
        }
    }

    public getX() : number {
        return this.xPos;
    }

    public getY() : number {
        return this.yPos;
    }

    public isRelativeToEntity() : boolean {
        return this.relativeToEntity;
    }

}