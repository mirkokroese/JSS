///<reference path="Component.ts"/>
///<reference path="../../entities/Entity.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
abstract class BaseComponent {

    protected entity : Entity;
    protected requiredComponents : Array<Component>;

    constructor(entity : Entity) {
        this.entity = entity;
    }

    protected hasRequiredComponents() : boolean {
        let hasComponents : boolean = true;
        for (let i = 0; i < this.requiredComponents.length; i++) {
            let currentComponent = this.requiredComponents[i];
            if (! this.entity.hasComponent(currentComponent)) {
                hasComponents = false;
            }
        }

        return hasComponents;
    }

}