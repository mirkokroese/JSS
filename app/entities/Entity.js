///<reference path="../components/TransformComponent.ts"/>
///<reference path="BaseEntity.ts"/>
var EntityType;
(function (EntityType) {
    EntityType[EntityType["PLAYER"] = 0] = "PLAYER";
    EntityType[EntityType["ENEMY"] = 1] = "ENEMY";
    EntityType[EntityType["PROJECTILE"] = 2] = "PROJECTILE";
    EntityType[EntityType["PICKUP"] = 3] = "PICKUP";
})(EntityType || (EntityType = {}));
var Entity = (function () {
    function Entity(position, rotation, scale, entityType) {
        this.components = [];
        this.active = true;
        this.addComponent(new TransformComponent(this, position, rotation, scale));
        this.transform = this.getComponent(TransformComponent);
        this.type = entityType;
    }
    Entity.prototype.update = function () {
    };
    Entity.prototype.updateComponents = function () {
        for (var i = 0; i < this.components.length; i++) {
            this.components[i].update();
        }
    };
    Entity.prototype.getType = function () {
        return this.type;
    };
    Entity.prototype.isActive = function () {
        return this.active;
    };
    Entity.prototype.setActive = function (value) {
        this.active = value;
    };
    Entity.prototype.getComponent = function (type) {
        for (var i = 0; i < this.components.length; i++) {
            var currentComponent = this.components[i];
            if (currentComponent.constructor.name == type.name) {
                return currentComponent;
            }
        }
        return null;
    };
    Entity.prototype.hasComponent = function (type) {
        var hasComponent = false;
        for (var i = 0; i < this.components.length; i++) {
            var currentComponent = this.components[i];
            if (currentComponent.constructor.name == type.name) {
                hasComponent = true;
            }
        }
        return hasComponent;
    };
    Entity.prototype.addComponent = function (component) {
        if (!this.hasComponent(component)) {
            this.components.push(component);
        }
    };
    Entity.prototype.addComponents = function (components) {
        for (var i = 0; i < components.length; i++) {
            var currentComponent = components[i];
            if (!this.hasComponent(currentComponent)) {
                this.components.push(currentComponent);
            }
        }
    };
    Entity.prototype.removeComponent = function (type) {
        if (this.hasComponent(type)) {
            for (var i = 0; i < this.components.length; i++) {
                var currentComponent = this.components[i];
                if (typeof currentComponent == typeof type) {
                    this.components.splice(i, 1);
                }
            }
        }
    };
    return Entity;
}());
