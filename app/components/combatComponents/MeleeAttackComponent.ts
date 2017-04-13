///<reference path="../baseComponent/BaseComponent.ts"/>
/**
 * Created by mirko on 11-4-17.
 */
class MeleeAttackComponent extends BaseComponent implements Component {
    private MAX_DAMAGE : number = 25;
    private MIN_DAMAGE : number = 5;

    constructor(entity : Entity, maxDamage : number, minDamage : number) {
        super(entity);
        this.MAX_DAMAGE = maxDamage;
        this.MIN_DAMAGE = minDamage;
    }

    update(): void {
    }

    public generateHitBasedOnLinearChance() {
        let random : number = Math.random();
        let damageAmount = this.MIN_DAMAGE;

        let amountOfPossibilities : number = (this.MAX_DAMAGE - this.MIN_DAMAGE)+1;
        let lastPercentage : number = 1;
        for (let i = 0; i < amountOfPossibilities; i++) {
            let regularChance = 100 / amountOfPossibilities;
            let isOdd : boolean = (amountOfPossibilities%2 == 1 ? true : false);
            let correctHalfOfAmount = isOdd ? ((amountOfPossibilities - 1) / 2) : (amountOfPossibilities / 2);
            let subtractFromHalfAmount = ((i >= correctHalfOfAmount && !isOdd) ? i+1 : i);
            let chanceModifier = ( (0.5 / correctHalfOfAmount)) * (correctHalfOfAmount-subtractFromHalfAmount);
            let finalChancePercentageDecimal = (regularChance + (regularChance * chanceModifier)) / 100;

            if (random > (lastPercentage - finalChancePercentageDecimal) && random <= lastPercentage){
                damageAmount += i;
                return damageAmount;
            }
            lastPercentage -= finalChancePercentageDecimal;
        }

        return damageAmount;
    }

}