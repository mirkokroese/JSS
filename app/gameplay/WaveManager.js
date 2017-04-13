///<reference path="../util/Time.ts"/>
///<reference path="../graphics/Canvas.ts"/>
///<reference path="../util/Utils.ts"/>
/**
 * Created by mirko on 13-4-17.
 */
var WaveManager = (function () {
    function WaveManager(startWave) {
        if (startWave === void 0) { startWave = 1; }
        this.inWaveIntro = false;
        this.inWave = false;
        this.inWaveEnding = false;
        this.waveIntroTimer = 0;
        this.waveTimer = 0;
        this.waveEndingTimer = 0;
        this.enemySpawnTimer = WaveManager.ENEMY_SPAWN_DELAY;
        this.pickupTimer = 0;
        this.wave = startWave;
    }
    WaveManager.prototype.startWaveIntro = function () {
        this.inWaveIntro = true;
    };
    WaveManager.prototype.startWave = function () {
        this.inWave = true;
    };
    WaveManager.prototype.startWaveEnding = function () {
        this.inWaveEnding = true;
    };
    WaveManager.prototype.stopWaveIntro = function () {
        this.inWaveIntro = false;
        this.waveIntroTimer = 0;
    };
    WaveManager.prototype.stopWave = function () {
        this.inWave = false;
        this.waveTimer = 0;
        console.log("stopping wave");
    };
    WaveManager.prototype.stopWaveEnding = function () {
        this.inWaveEnding = false;
        this.waveEndingTimer = 0;
    };
    WaveManager.prototype.isInWaveIntro = function () {
        return this.inWaveIntro;
    };
    WaveManager.prototype.isInWave = function () {
        return this.inWave;
    };
    WaveManager.prototype.isInWaveEnding = function () {
        return this.inWaveEnding;
    };
    WaveManager.prototype.nextWave = function () {
        this.wave++;
    };
    WaveManager.prototype.update = function () {
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
    };
    WaveManager.prototype.updateCurrentWave = function () {
        var chance = this.getChanceRandom();
        this.dropPickups();
        if (this.enemySpawnTimer >= this.getEnemySpawnDelayForwave()) {
            this.enemySpawnTimer = 0;
            var amountOfEnemies = GameManager.AMOUNT_OF_ENEMIES;
            var lastChance = 0;
            for (var i = 1; i <= amountOfEnemies; i++) {
                var thisChance = (i / amountOfEnemies);
                var enemyMoveSpeed = this.getEnemyMoveSpeed();
                var enemyBoostSpeed = this.getEnemyBoostSpeed();
                var enemyPosition = this.getRandomWorldPosition();
                if (i == amountOfEnemies) {
                    if (chance >= lastChance && chance <= thisChance) {
                        GameManager.InitiateEntity(new AdvancedEnemy(enemyPosition, 0, new Vector2(100, 100), GameManager.GetPlayer(), EntityType.ENEMY, enemyMoveSpeed, enemyBoostSpeed));
                    }
                }
                else {
                    if (chance >= lastChance && chance < thisChance) {
                        GameManager.InitiateEntity(new SimpleEnemy(enemyPosition, 0, new Vector2(100, 100), GameManager.GetPlayer(), EntityType.ENEMY, enemyMoveSpeed, enemyBoostSpeed));
                    }
                }
                lastChance = thisChance;
            }
        }
        else {
            this.enemySpawnTimer += Time.deltaTime;
        }
    };
    WaveManager.prototype.dropPickups = function () {
        if (this.pickupTimer >= WaveManager.PICKUP_DELAY) {
            this.pickupTimer = 0;
            GameManager.InitiateEntity(new HealthPickup(this.getRandomWorldPosition(), 0, new Vector2(50, 50)));
        }
        else {
            this.pickupTimer += Time.deltaTime;
        }
    };
    WaveManager.prototype.getWave = function () {
        return this.wave;
    };
    WaveManager.prototype.setWave = function (wave) {
        this.wave = wave;
    };
    WaveManager.prototype.getEnemyMoveSpeed = function () {
        return WaveManager.REGULAR_ENEMY_MOVE_SPEED * (this.wave / (this.wave * 2));
    };
    WaveManager.prototype.getEnemyBoostSpeed = function () {
        return WaveManager.REGULAR_ENEMY_BOOST_SPEED * (this.wave / (this.wave * 2));
    };
    WaveManager.prototype.getRandomWorldPosition = function () {
        var x = Utils.getRandomInt(0, Canvas.WIDTH - 101);
        var y = Utils.getRandomInt(0, Canvas.HEIGHT - 101);
        return new Vector2(x, y);
    };
    WaveManager.prototype.getEnemySpawnDelayForwave = function () {
        var delay = ((WaveManager.ENEMY_SPAWN_DELAY - (this.wave * WaveManager.WAVE_SPAWN_DELAY_MULTIPLIER)));
        var minDelay = WaveManager.WAVE_SPAWN_DELAY_MULTIPLIER * 2;
        return (delay <= minDelay ? minDelay : delay);
    };
    WaveManager.prototype.getChanceRandom = function () {
        var x = (Math.random() / 4) * this.wave;
        var finalChance = Math.random() * x;
        return (finalChance > 1 ? 1 : finalChance);
    };
    WaveManager.prototype.render = function (ctx) {
        if (this.inWaveIntro) {
            ctx.fillStyle = "#1abc9c";
            ctx.textAlign = "center";
            ctx.font = "50px Arial";
            ctx.fillText("Wave " + this.wave + " Starting in", Canvas.WIDTH / 2, Canvas.HEIGHT / 2 - 15);
            ctx.font = "100px Arial";
            ctx.fillText("" + (WaveManager.WAVE_INTRO_DURATION - Math.floor(this.waveIntroTimer)), Canvas.WIDTH / 2, Canvas.HEIGHT / 2 + 150);
        }
        else if (this.inWave) {
            ctx.fillStyle = "#1abc9c";
            ctx.textAlign = "right";
            ctx.font = "20px Arial";
            ctx.fillText("Time left in Wave " + this.wave + ": " + (WaveManager.WAVE_DURATION - Math.floor(this.waveTimer)), Canvas.WIDTH - 30, 40);
        }
        else if (this.inWaveEnding) {
            ctx.fillStyle = "#1abc9c";
            ctx.textAlign = "center";
            ctx.font = "50px Arial";
            ctx.fillText("You survived wave " + this.wave, Canvas.WIDTH / 2, Canvas.HEIGHT / 2 - 15);
        }
    };
    WaveManager.WAVE_INTRO_DURATION = 3;
    WaveManager.WAVE_DURATION = 30;
    WaveManager.WAVE_ENDING_DURATION = 3;
    WaveManager.ENEMY_SPAWN_DELAY = 4.5;
    WaveManager.REGULAR_ENEMY_MOVE_SPEED = 250;
    WaveManager.REGULAR_ENEMY_BOOST_SPEED = 320;
    WaveManager.WAVE_SPAWN_DELAY_MULTIPLIER = 0.5;
    WaveManager.PICKUP_DELAY = 10;
    return WaveManager;
}());
