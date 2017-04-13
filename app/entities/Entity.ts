///<reference path="../components/TransformComponent.ts"/>
///<reference path="BaseEntity.ts"/>
enum EntityType {
    PLAYER,
    ENEMY,
    PROJECTILE,
    PICKUP
}

abstract class Entity implements BaseEntity {
    protected components = [];
    public active : boolean = true;
    public transform : TransformComponent;
    public type : EntityType;

    constructor(position : Vector2, rotation : number, scale : Vector2, entityType : EntityType) {
        this.addComponent(new TransformComponent(this, position, rotation, scale));
        this.transform = this.getComponent<TransformComponent>(TransformComponent);
        this.type = entityType;
    }

    public update() : void {

    }

    public updateComponents() : void {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update();
        }
    }

    public getType() : EntityType {
        return this.type;
    }

    public isActive() : boolean {
        return this.active;
    }

    public setActive(value : boolean) : void {
        this.active = value;
    }

    public getComponent<T>(type : T) : T {
        for (let i = 0; i < this.components.length; i++) {
            let currentComponent = this.components[i];
            if (currentComponent.constructor.name == type.name) {
                return currentComponent as T;
            }
        }

        return null;
    }

    public hasComponent<T>(type : T) : boolean {
        let hasComponent = false;
        for (let i = 0; i < this.components.length; i++) {
            let currentComponent = this.components[i];
            if (currentComponent.constructor.name == type.name) {
                hasComponent = true;
            }
        }

        return hasComponent;
    }

    public addComponent(component : ComponentInterface) : void {
        if (! this.hasComponent(component)) {
            this.components.push(component);
        }
    }

    public addComponents(components : Array<ComponentInterface>) : void {
        for (let i = 0; i < components.length; i++) {
            let currentComponent = components[i];
            if (! this.hasComponent(currentComponent)) {
                this.components.push(currentComponent);
            }
        }
    }

    public removeComponent<T>(type : T) : void {
        if (this.hasComponent(type)) {
            for (let i = 0; i < this.components.length; i++) {
                let currentComponent = this.components[i];
                if (typeof currentComponent == typeof type) {
                    this.components.splice(i,1);
                }
            }
        }
    }
}