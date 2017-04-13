///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 12-4-17.
 */
class BoostComponent extends BaseComponent implements Component {
    private boostSpeed : number;
    private boostAmount : number;
    private maxBoostAmount : number;
    private boosting : boolean = false;
    private isAbleToBoost : boolean = true;
    private boostRegenDelay : number;
    private boostRegenTimer : number = 0;
    private isRegenerating : boolean = false;
    private boostRegenSpeed : number;

    constructor(entity : Entity, boostSpeed : number, boostAmount : number, boostRegenDelay : number, boostRegenSpeed : number) {
        super(entity);
        this.boostSpeed = boostSpeed;
        this.boostAmount = boostAmount;
        this.maxBoostAmount = boostAmount;
        this.boostRegenDelay = boostRegenDelay;
        this.boostRegenSpeed = boostRegenSpeed;
    }

    update(): void {
        if (this.isBoosting()) {
            this.isAbleToBoost = true;
            this.removeBoost(25 * Time.deltaTime);
        } else {
            this.isAbleToBoost = false;
            this.regenerate();
        }
    }

    private regenerate() : void {
        if (!this.isRegenerating) {
            if (this.boostAmount <= 1) {
                this.boostRegenTimer += Time.deltaTime;
                if (this.boostRegenTimer >= this.boostRegenDelay) {
                    this.isRegenerating = true;
                    this.boostRegenTimer = 0;
                }
            } else {
                this.isRegenerating = true;
                this.boostRegenTimer = 0;
            }
        } else {
            this.boostAmount += this.boostRegenSpeed * (Time.deltaTime * ((this.maxBoostAmount - this.boostAmount) / 5));
            if (this.boostAmount >= (this.maxBoostAmount - 1)) {
                this.boostAmount = this.maxBoostAmount;
                this.isRegenerating = false;
            }
        }
    }

    public entityCanBoost() : boolean {
        return this.isAbleToBoost;
    }

    private isBoosting() : boolean {
        return this.boosting;
    }

    public startBoosting() : void {
        if (this.hasBoostLeft()) {
            this.boosting = true;
            this.isRegenerating = false;
            return;
        }

        this.stopBoosting();
    }

    public stopBoosting() : void {
        this.boosting = false;
    }

    public getBoostSpeed() : number {
        return this.boostSpeed;
    }

    public getBoostAmount() : number {
        return this.boostAmount;
    }

    public getBoostAmountPercentage() : number {
        return (this.boostAmount / this.maxBoostAmount) * 100;
    }

    public getBoostAmountPercentageDecimal() : number {
        return (this.boostAmount / this.maxBoostAmount);

    }

    private hasBoostLeft() : boolean {
        if (this.boostAmount > 0) {
            return true;
        }

        return false;
    }

    private removeBoost(amount : number) : void {
        if (this.boostAmount - amount < 0) {
            this.boostAmount = 0;
        } else {
            this.boostAmount -= amount;
        }
    }
}