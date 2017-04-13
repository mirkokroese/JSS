var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
var LifeState;
(function (LifeState) {
    LifeState[LifeState["ALIVE"] = 0] = "ALIVE";
    LifeState[LifeState["DEAD"] = 1] = "DEAD";
})(LifeState || (LifeState = {}));
var LifeStateComponent = (function (_super) {
    __extends(LifeStateComponent, _super);
    function LifeStateComponent(entity, lifeState) {
        if (lifeState === void 0) { lifeState = LifeState.ALIVE; }
        _super.call(this, entity);
        this.lifeState = lifeState;
    }
    LifeStateComponent.prototype.update = function () {
    };
    LifeStateComponent.prototype.isAlive = function () {
        return (this.lifeState == LifeState.ALIVE);
    };
    LifeStateComponent.prototype.isDead = function () {
        return (this.lifeState == LifeState.DEAD);
    };
    LifeStateComponent.prototype.bringToLife = function () {
        this.lifeState = LifeState.ALIVE;
    };
    LifeStateComponent.prototype.die = function () {
        this.lifeState = LifeState.DEAD;
    };
    LifeStateComponent.prototype.dieAndDestroy = function () {
        this.lifeState = LifeState.DEAD;
        GameManager.RemoveEntity(this.entity);
    };
    LifeStateComponent.prototype.getLifeState = function () {
        return this.lifeState;
    };
    return LifeStateComponent;
}(BaseComponent));
