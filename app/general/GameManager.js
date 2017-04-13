/// <reference path="../graphics/Canvas.ts"/>
/// <reference path="../graphics/Renderer.ts"/>
/// <reference path="GameState.ts"/>
///<reference path="../entities/Player.ts"/>
///<reference path="../util/Time.ts"/>
///<reference path="../entities/SimpleEnemy.ts"/>
///<reference path="../entities/AdvancedEnemy.ts"/>
///<reference path="GameStateManager.ts"/>
///<reference path="../input/MenuMouseInput.ts"/>
///<reference path="../menus/MainMenu.ts"/>
///<reference path="../gameplay/WaveManager.ts"/>
///<reference path="../menus/ShopMenu.ts"/>
///<reference path="../entities/HealthPickup.ts"/>
var GameManager = (function () {
    function GameManager(canvasID) {
        this.background = null;
        this.canvas = new Canvas(canvasID);
        KeyboardInput.init();
        this.handleResizeEvent();
        this.start();
    }
    GameManager.prototype.start = function () {
        this.waveManager = new WaveManager();
        this.renderer = new Renderer(this.canvas, new MainMenu(this), new PauseMenu(this), new ShopMenu(this, this.waveManager), this.waveManager);
        GameManager.InitiateEntity(new HealthPickup(new Vector2(200, 200), 0, new Vector2(50, 50)));
        GameStateManager.setActive(GameState.MAIN_MENU);
        this.setBackgroundImage("space", "jpg");
        this.playerSpawnPosition = new Vector2((Canvas.WIDTH / 2) - 50, (Canvas.HEIGHT / 2) - 50);
        this.player = new Player(new Vector2(this.playerSpawnPosition.x, this.playerSpawnPosition.y), 0, new Vector2(100, 100), EntityType.PLAYER);
        GameManager.entities.push(this.player);
        this.renderer.drawFPS(true);
        var self = this;
        var lastTime = Date.now();
        new Time();
        this._gameLoop = setInterval(function () {
            self.update();
            var now = Date.now();
            var deltaTime = (now - lastTime) / 1000;
            Time.deltaTime = deltaTime;
            lastTime = now;
        }, 1000 / GameManager.TARGET_FPS);
    };
    GameManager.prototype.update = function () {
        // Prepare for rendering
        this.renderer.prepare(this.background);
        // Check the game state
        if (GameStateManager.getState() == GameState.MAIN_MENU) {
            // Start listening for menu input if not already doing so
            if (!MenuMouseInput.isListening())
                MenuMouseInput.startListening();
            // Update and render the main menu
            this.renderer.manageMainMenu();
        }
        if (GameStateManager.getState() == GameState.PAUSED) {
            // Start listening for menu input if not already doing so
            if (!MenuMouseInput.isListening())
                MenuMouseInput.startListening();
            if (KeyboardInput.isClicked("pause")) {
                GameStateManager.setActive(GameState.RUNNING_WAVE);
                return;
            }
            ;
            // Render all entities but stop updating them
            this.renderer.render(GameManager.entities);
            // Update and render the pause menu
            this.renderer.managePauseMenu();
        }
        if (GameStateManager.getState() == GameState.STARTING_WAVE) {
            if (MenuMouseInput.isListening())
                MenuMouseInput.stopListening();
            if (!this.waveManager.isInWaveIntro())
                this.waveManager.startWaveIntro();
            this.waveManager.update();
            this.renderer.renderWaveManager();
        }
        if (GameStateManager.getState() == GameState.RUNNING_WAVE) {
            console.log("running");
            // Stop listening for menu input if still doing this
            if (MenuMouseInput.isListening())
                MenuMouseInput.stopListening();
            // Check for paused
            if (KeyboardInput.isClicked("pause")) {
                GameStateManager.setActive(GameState.PAUSED);
                return;
            }
            ;
            // Update game logic for all entities
            for (var i = 0; i < GameManager.entities.length; i++) {
                var entity = GameManager.entities[i];
                entity.update();
                entity.updateComponents();
            }
            this.waveManager.update();
            this.renderer.renderWaveManager();
            // Render all entities
            this.renderer.render(GameManager.entities);
        }
        if (GameStateManager.getState() == GameState.ENDING_WAVE) {
            if (MenuMouseInput.isListening())
                MenuMouseInput.stopListening();
            this.waveManager.update();
            this.renderer.renderWaveManager();
        }
        if (GameStateManager.getState() == GameState.SHOP_MENU) {
            if (!MenuMouseInput.isListening())
                MenuMouseInput.startListening();
            this.renderer.manageShopMenu();
        }
        if (GameStateManager.getState() == GameState.GAME_OVER) {
            if (!MenuMouseInput.isListening())
                MenuMouseInput.startListening();
            this.renderer.renderGameOverScreen();
            var self_1 = this;
            setTimeout(function () {
                self_1.reset();
            }, 3000);
        }
        Time.fpsCounter++; // Increment the fps counter
    };
    GameManager.prototype.handleResizeEvent = function () {
        var self = this;
        window.onresize = function () {
            self.canvas.set();
        };
    };
    GameManager.prototype.setBackgroundImage = function (filename, filetype) {
        this.background = new Image();
        this.background.src = "assets/wallpapers/" + filename + "." + filetype;
    };
    GameManager.InitiateEntity = function (entity) {
        GameManager.entities.push(entity);
    };
    GameManager.GetPlayer = function () {
        var player = null;
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            if (entity.getType() == EntityType.PLAYER) {
                player = entity;
                break;
            }
        }
        return player;
    };
    GameManager.GetEntitiesByType = function (entityType) {
        var entities = [];
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            if (entity.getType() == entityType) {
                entities.push(entity);
            }
        }
        return entities;
    };
    GameManager.RemoveEntity = function (entity) {
        for (var i = 0; i < this.entities.length; i++) {
            var currentEntity = this.entities[i];
            if (entity == currentEntity) {
                this.entities.splice(i, 1);
            }
        }
    };
    GameManager.prototype.reset = function () {
        GameManager.entities = [];
        this.waveManager.setWave(1);
        clearInterval(this._gameLoop);
        this.start();
    };
    GameManager.prototype.prepareNextWave = function () {
        GameManager.entities = [];
        var playerTransform = this.player.getComponent(TransformComponent);
        playerTransform.position = new Vector2(this.playerSpawnPosition.x, this.playerSpawnPosition.y);
        GameManager.entities.push(this.player);
    };
    GameManager.entities = [];
    GameManager.AMOUNT_OF_ENEMIES = 2;
    GameManager.TARGET_FPS = 60;
    GameManager.DEBUG_KEYS = false;
    GameManager.RESOURCE_DIR = "assets/";
    return GameManager;
}());
