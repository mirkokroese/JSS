///<reference path="Component.ts"/>
///<reference path="../../entities/Entity.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
var BaseComponent = (function () {
    function BaseComponent(entity) {
        this.entity = entity;
    }
    BaseComponent.prototype.hasRequiredComponents = function () {
        var hasComponents = true;
        for (var i = 0; i < this.requiredComponents.length; i++) {
            var currentComponent = this.requiredComponents[i];
            if (!this.entity.hasComponent(currentComponent)) {
                hasComponents = false;
            }
        }
        return hasComponents;
    };
    return BaseComponent;
}());
