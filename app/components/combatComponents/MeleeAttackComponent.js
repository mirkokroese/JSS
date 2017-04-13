var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
var MeleeAttackComponent = (function (_super) {
    __extends(MeleeAttackComponent, _super);
    function MeleeAttackComponent(entity, maxDamage, minDamage) {
        _super.call(this, entity);
        this.MAX_DAMAGE = 25;
        this.MIN_DAMAGE = 5;
        this.MAX_DAMAGE = maxDamage;
        this.MIN_DAMAGE = minDamage;
    }
    MeleeAttackComponent.prototype.update = function () {
    };
    MeleeAttackComponent.prototype.generateHitBasedOnLinearChance = function () {
        var random = Math.random();
        var damageAmount = this.MIN_DAMAGE;
        var amountOfPossibilities = (this.MAX_DAMAGE - this.MIN_DAMAGE) + 1;
        var lastPercentage = 1;
        for (var i = 0; i < amountOfPossibilities; i++) {
            var regularChance = 100 / amountOfPossibilities;
            var isOdd = (amountOfPossibilities % 2 == 1 ? true : false);
            var correctHalfOfAmount = isOdd ? ((amountOfPossibilities - 1) / 2) : (amountOfPossibilities / 2);
            var subtractFromHalfAmount = ((i >= correctHalfOfAmount && !isOdd) ? i + 1 : i);
            var chanceModifier = ((0.5 / correctHalfOfAmount)) * (correctHalfOfAmount - subtractFromHalfAmount);
            var finalChancePercentageDecimal = (regularChance + (regularChance * chanceModifier)) / 100;
            if (random > (lastPercentage - finalChancePercentageDecimal) && random <= lastPercentage) {
                damageAmount += i;
                return damageAmount;
            }
            lastPercentage -= finalChancePercentageDecimal;
        }
        return damageAmount;
    };
    return MeleeAttackComponent;
}(BaseComponent));
