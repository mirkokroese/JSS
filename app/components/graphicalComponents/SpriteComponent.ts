///<reference path="../baseComponent/Component.ts"/>
///<reference path="../../graphics/Sprite.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
class SpriteComponent extends BaseComponent implements Component {
    private _sprite;

    constructor(entity : Entity, filename : string, type : string) {
        super(entity);
        this._sprite = new Sprite(filename, type);
    }

    getSprite() {
        return this._sprite;
    }

    update(): void {
    }

}