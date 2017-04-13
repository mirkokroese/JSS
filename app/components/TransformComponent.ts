///<reference path="baseComponent/Component.ts"/>
///<reference path="../util/Vector2.ts"/>
///<reference path="baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 10-4-17.
 */
class TransformComponent extends BaseComponent implements Component {
    private _position : Vector2;
    private _rotation : number;
    private _scale : Vector2;

    constructor(entity : Entity, position : Vector2, rotation : number, scale : Vector2) {
        super(entity);
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
    }

    public update(): void {
    }

    public increasePosition(amount : Vector2) : void {
        this.position.add(amount);
    }

    get position(): Vector2 {
        return this._position;
    }

    set position(value: Vector2) {
        this._position = value;
    }

    get rotation(): number {
        return this._rotation;
    }

    set rotation(value: number) {
        this._rotation = value;
    }

    get scale(): Vector2 {
        return this._scale;
    }

    set scale(value: Vector2) {
        this._scale = value;
    }
}