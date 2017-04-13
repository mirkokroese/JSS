///<reference path="../baseComponent/Component.ts"/>
///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
class HealthComponent extends BaseComponent implements Component {
    private maxHealth : number;
    private health : number;
    
    constructor(entity : Entity, maxHealth : number) {
        super(entity);
        this.health = maxHealth;
        this.maxHealth = maxHealth;
    }

    update(): void {
    }

    public addHealth(amount : number) : void {
        this.health = (this.health + amount >= this.maxHealth ? this.maxHealth : this.health + amount);
    }

    public getHealth(): number {
        return this.health;
    }

    public getHealthPercentageDecimal() : number {
        return this.health/this.maxHealth;
    }

    public getHealthPercentage() : number {
        return Math.floor((this.health/this.maxHealth) * 100);
    }

    public removeHealth(damage : number) : void {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    }

}