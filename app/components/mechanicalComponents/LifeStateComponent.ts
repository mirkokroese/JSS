///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
enum LifeState {
    ALIVE,
    DEAD
}

class LifeStateComponent extends BaseComponent implements Component {

    public lifeState : LifeState;

    constructor(entity : Entity, lifeState : LifeState = LifeState.ALIVE) {
        super(entity);
        this.lifeState = lifeState;
    }

    update(): void {
    }

    public isAlive() : boolean {
        return (this.lifeState == LifeState.ALIVE);
    }

    public isDead() : boolean {
        return (this.lifeState == LifeState.DEAD);
    }

    public bringToLife() : void {
        this.lifeState = LifeState.ALIVE;
    }

    public die() : void {
        this.lifeState = LifeState.DEAD;
    }

    public dieAndDestroy() : void {
        this.lifeState = LifeState.DEAD;
        GameManager.RemoveEntity(this.entity);
    }

    public getLifeState() : LifeState {
        return this.lifeState;
    }
}