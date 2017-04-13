///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
enum PickupType {
    SET_TO,
    SET_TO_DURATION,
    INCREMENT
}

class PickupComponent extends BaseComponent implements Component {
    private componentToAffect;
    private entityToAffect : EntityType;
    private amount : number;
    private duration : number;
    private pickupType : PickupType;

    constructor(entity : Entity, componentToAffect, entityToAffect : EntityType, amount : number, pickupType : PickupType, duration : number = null) {
        super(entity);
        this.componentToAffect = componentToAffect;
        this.entityToAffect = entityToAffect;
        this.amount = amount;
        this.duration = duration;
        this.pickupType = pickupType;
    }

    update(): void {
    }

    getComponentToAffect() {
        return this.componentToAffect;
    }

    getEntityToAffect(): EntityType {
        return this.entityToAffect;
    }

    getAmount(): number {
        return this.amount;
    }

    getDuration(): number {
        return this.duration;
    }

    getPickupType(): PickupType {
        return this.pickupType;
    }
}