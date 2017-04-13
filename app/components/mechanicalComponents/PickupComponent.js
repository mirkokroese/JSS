var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
var PickupType;
(function (PickupType) {
    PickupType[PickupType["SET_TO"] = 0] = "SET_TO";
    PickupType[PickupType["SET_TO_DURATION"] = 1] = "SET_TO_DURATION";
    PickupType[PickupType["INCREMENT"] = 2] = "INCREMENT";
})(PickupType || (PickupType = {}));
var PickupComponent = (function (_super) {
    __extends(PickupComponent, _super);
    function PickupComponent(entity, componentToAffect, entityToAffect, amount, pickupType, duration) {
        if (duration === void 0) { duration = null; }
        _super.call(this, entity);
        this.componentToAffect = componentToAffect;
        this.entityToAffect = entityToAffect;
        this.amount = amount;
        this.duration = duration;
        this.pickupType = pickupType;
    }
    PickupComponent.prototype.update = function () {
    };
    PickupComponent.prototype.getComponentToAffect = function () {
        return this.componentToAffect;
    };
    PickupComponent.prototype.getEntityToAffect = function () {
        return this.entityToAffect;
    };
    PickupComponent.prototype.getAmount = function () {
        return this.amount;
    };
    PickupComponent.prototype.getDuration = function () {
        return this.duration;
    };
    PickupComponent.prototype.getPickupType = function () {
        return this.pickupType;
    };
    return PickupComponent;
}(BaseComponent));
