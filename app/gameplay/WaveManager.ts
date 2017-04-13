///<reference path="../util/Time.ts"/>
///<reference path="../graphics/Canvas.ts"/>
///<reference path="../util/Utils.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
class WaveManager {
    private static WAVE_INTRO_DURATION : number = 3;
    private static WAVE_DURATION : number = 30;
    private static WAVE_ENDING_DURATION : number = 3;
    private static ENEMY_SPAWN_DELAY : number = 4.5;
    private static REGULAR_ENEMY_MOVE_SPEED : number = 250;
    private static REGULAR_ENEMY_BOOST_SPEED : number = 320;
    private static WAVE_SPAWN_DELAY_MULTIPLIER : number = 0.5;
    private static PICKUP_DELAY : number = 10;

    private wave : number;
    private inWaveIntro : boolean = false;
    private inWave : boolean = false;
    private inWaveEnding : boolean = false;

    private waveIntroTimer : number = 0;
    private waveTimer : number = 0;
    private waveEndingTimer : number = 0;
    private enemySpawnTimer : number = WaveManager.ENEMY_SPAWN_DELAY;
    private pickupTimer : number = 0;
    
    constructor(startWave : number = 1) {
        this.wave = startWave;
    }

    public startWaveIntro() : void {
        this.inWaveIntro = true;
    }

    public startWave() : void {
        this.inWave = true;
    }

    public startWaveEnding() : void {
        this.inWaveEnding = true;
    }

    public stopWaveIntro() : void {
        this.inWaveIntro = false;
        this.waveIntroTimer = 0;
    }

    public stopWave() : void {
        this.inWave = false;
        this.waveTimer = 0;
        console.log("stopping wave");
    }

    public stopWaveEnding() : void {
        this.inWaveEnding = false;
        this.waveEndingTimer = 0;
    }

    public isInWaveIntro() : boolean {
        return this.inWaveIntro;
    }

    public isInWave() : boolean {
        return this.inWave;
    }

    public isInWaveEnding() : boolean {
        return this.inWaveEnding;
    }

    public nextWave() : void {
        this.wave++;
    }

    public update() : void {
        if (this.inWaveIntro) {
            this.waveIntroTimer += Time.deltaTime;
            if (this.waveIntroTimer >= WaveManager.WAVE_INTRO_DURATION) {
                this.stopWaveIntro();
                this.startWave();
                GameStateManager.setActive(GameState.RUNNING_WAVE);
            }
        }
        if (this.inWave) {
            this.updateCurrentWave();
            this.waveTimer += Time.deltaTime;
            if (this.waveTimer >= WaveManager.WAVE_DURATION) {
                this.stopWave();
                this.startWaveEnding();
                GameStateManager.setActive(GameState.ENDING_WAVE);
            }
        }
        if (this.inWaveEnding) {
            this.waveEndingTimer += Time.deltaTime;
            if (this.waveEndingTimer >= WaveManager.WAVE_ENDING_DURATION) {
                this.stopWaveEnding();
                GameStateManager.setActive(GameState.SHOP_MENU);
            }
        }
    }

    private updateCurrentWave() : void {
        let chance = this.getChanceRandom();
        this.dropPickups();
        if (this.enemySpawnTimer >= this.getEnemySpawnDelayForwave()) {
            this.enemySpawnTimer = 0;
            let amountOfEnemies = GameManager.AMOUNT_OF_ENEMIES;
            let lastChance = 0;
            for (let i = 1; i <= amountOfEnemies; i++) {
                let thisChance = (i / amountOfEnemies);
                let enemyMoveSpeed = this.getEnemyMoveSpeed();
                let enemyBoostSpeed = this.getEnemyBoostSpeed();
                let enemyPosition = this.getRandomWorldPosition();
                if (i == amountOfEnemies) {
                    if (chance >= lastChance && chance <= thisChance) {
                        GameManager.InitiateEntity(new AdvancedEnemy(enemyPosition, 0, new Vector2(100, 100),
                            GameManager.GetPlayer(), EntityType.ENEMY, enemyMoveSpeed, enemyBoostSpeed));
                    }
                } else {
                    if (chance >= lastChance && chance < thisChance) {
                        GameManager.InitiateEntity(new SimpleEnemy(enemyPosition, 0, new Vector2(100, 100),
                            GameManager.GetPlayer(), EntityType.ENEMY, enemyMoveSpeed, enemyBoostSpeed));
                    }
                }
                lastChance = thisChance;
            }
        } else {
            this.enemySpawnTimer += Time.deltaTime;
        }
    }
    
    private dropPickups() : void {
        if (this.pickupTimer >= WaveManager.PICKUP_DELAY) {
            this.pickupTimer = 0;
            GameManager.InitiateEntity(new HealthPickup(this.getRandomWorldPosition(), 0, new Vector2(50, 50)));
        } else {
            this.pickupTimer += Time.deltaTime;
        }
    }

    public getWave() : number {
        return this.wave;
    }

    public setWave(wave : number) : void {
        this.wave = wave;
    }

    private getEnemyMoveSpeed() : number {
        return WaveManager.REGULAR_ENEMY_MOVE_SPEED * (this.wave / (this.wave*2));
    }

    private getEnemyBoostSpeed() : number {
        return WaveManager.REGULAR_ENEMY_BOOST_SPEED * (this.wave / (this.wave*2));
    }

    private getRandomWorldPosition() : Vector2 {
        let x : number = Utils.getRandomInt(0, Canvas.WIDTH-101);
        let y : number = Utils.getRandomInt(0, Canvas.HEIGHT-101);
        return new Vector2(x, y);
    }

    private getEnemySpawnDelayForwave() : number {
        let delay : number = ((WaveManager.ENEMY_SPAWN_DELAY - (this.wave * WaveManager.WAVE_SPAWN_DELAY_MULTIPLIER)));
        let minDelay : number = WaveManager.WAVE_SPAWN_DELAY_MULTIPLIER*2;
        return (delay <= minDelay ? minDelay : delay);
    }

    private getChanceRandom() : number {
        let x : number = (Math.random() / 4) * this.wave;
        let finalChance = Math.random() * x;
        return (finalChance > 1 ? 1 : finalChance);
    }

    public render(ctx : CanvasRenderingContext2D) : void {
        if (this.inWaveIntro) {
            ctx.fillStyle = "#1abc9c";
            ctx.textAlign = "center";
            ctx.font = "50px Arial";
            ctx.fillText("Wave " + this.wave + " Starting in", Canvas.WIDTH/2, Canvas.HEIGHT/2-15);
            ctx.font = "100px Arial";
            ctx.fillText(""+(WaveManager.WAVE_INTRO_DURATION - Math.floor(this.waveIntroTimer)), Canvas.WIDTH/2, Canvas.HEIGHT/2+150);
        }
        else if (this.inWave) {
            ctx.fillStyle = "#1abc9c";
            ctx.textAlign = "right";
            ctx.font = "20px Arial";
            ctx.fillText("Time left in Wave " + this.wave + ": "+(WaveManager.WAVE_DURATION - Math.floor(this.waveTimer)), Canvas.WIDTH - 30, 40);
        }
        else if (this.inWaveEnding) {
            ctx.fillStyle = "#1abc9c";
            ctx.textAlign = "center";
            ctx.font = "50px Arial";
            ctx.fillText("You survived wave " + this.wave, Canvas.WIDTH/2, Canvas.HEIGHT/2-15);
        }
    }

}