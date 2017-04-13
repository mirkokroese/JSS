var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/Component.ts"/>
///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
var HealthComponent = (function (_super) {
    __extends(HealthComponent, _super);
    function HealthComponent(entity, maxHealth) {
        _super.call(this, entity);
        this.health = maxHealth;
        this.maxHealth = maxHealth;
    }
    HealthComponent.prototype.update = function () {
    };
    HealthComponent.prototype.addHealth = function (amount) {
        this.health = (this.health + amount >= this.maxHealth ? this.maxHealth : this.health + amount);
    };
    HealthComponent.prototype.getHealth = function () {
        return this.health;
    };
    HealthComponent.prototype.getHealthPercentageDecimal = function () {
        return this.health / this.maxHealth;
    };
    HealthComponent.prototype.getHealthPercentage = function () {
        return Math.floor((this.health / this.maxHealth) * 100);
    };
    HealthComponent.prototype.removeHealth = function (damage) {
        this.health -= damage;
        if (this.health < 0)
            this.health = 0;
    };
    return HealthComponent;
}(BaseComponent));
