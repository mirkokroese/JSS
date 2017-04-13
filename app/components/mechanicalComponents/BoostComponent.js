var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 12-4-17.
 */
var BoostComponent = (function (_super) {
    __extends(BoostComponent, _super);
    function BoostComponent(entity, boostSpeed, boostAmount, boostRegenDelay, boostRegenSpeed) {
        _super.call(this, entity);
        this.boosting = false;
        this.isAbleToBoost = true;
        this.boostRegenTimer = 0;
        this.isRegenerating = false;
        this.boostSpeed = boostSpeed;
        this.boostAmount = boostAmount;
        this.maxBoostAmount = boostAmount;
        this.boostRegenDelay = boostRegenDelay;
        this.boostRegenSpeed = boostRegenSpeed;
    }
    BoostComponent.prototype.update = function () {
        if (this.isBoosting()) {
            this.isAbleToBoost = true;
            this.removeBoost(25 * Time.deltaTime);
        }
        else {
            this.isAbleToBoost = false;
            this.regenerate();
        }
    };
    BoostComponent.prototype.regenerate = function () {
        if (!this.isRegenerating) {
            if (this.boostAmount <= 1) {
                this.boostRegenTimer += Time.deltaTime;
                if (this.boostRegenTimer >= this.boostRegenDelay) {
                    this.isRegenerating = true;
                    this.boostRegenTimer = 0;
                }
            }
            else {
                this.isRegenerating = true;
                this.boostRegenTimer = 0;
            }
        }
        else {
            this.boostAmount += this.boostRegenSpeed * (Time.deltaTime * ((this.maxBoostAmount - this.boostAmount) / 5));
            if (this.boostAmount >= (this.maxBoostAmount - 1)) {
                this.boostAmount = this.maxBoostAmount;
                this.isRegenerating = false;
            }
        }
    };
    BoostComponent.prototype.entityCanBoost = function () {
        return this.isAbleToBoost;
    };
    BoostComponent.prototype.isBoosting = function () {
        return this.boosting;
    };
    BoostComponent.prototype.startBoosting = function () {
        if (this.hasBoostLeft()) {
            this.boosting = true;
            this.isRegenerating = false;
            return;
        }
        this.stopBoosting();
    };
    BoostComponent.prototype.stopBoosting = function () {
        this.boosting = false;
    };
    BoostComponent.prototype.getBoostSpeed = function () {
        return this.boostSpeed;
    };
    BoostComponent.prototype.getBoostAmount = function () {
        return this.boostAmount;
    };
    BoostComponent.prototype.getBoostAmountPercentage = function () {
        return (this.boostAmount / this.maxBoostAmount) * 100;
    };
    BoostComponent.prototype.getBoostAmountPercentageDecimal = function () {
        return (this.boostAmount / this.maxBoostAmount);
    };
    BoostComponent.prototype.hasBoostLeft = function () {
        if (this.boostAmount > 0) {
            return true;
        }
        return false;
    };
    BoostComponent.prototype.removeBoost = function (amount) {
        if (this.boostAmount - amount < 0) {
            this.boostAmount = 0;
        }
        else {
            this.boostAmount -= amount;
        }
    };
    return BoostComponent;
}(BaseComponent));
