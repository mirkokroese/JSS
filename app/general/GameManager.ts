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
class GameManager {
    private canvas : Canvas;
    private renderer : Renderer;
    private waveManager : WaveManager;
    private static entities : Array<BaseEntity> = [];
    private player : Player;
    private playerSpawnPosition : Vector2;

    private _gameLoop;
    private background = null;

    public static AMOUNT_OF_ENEMIES : number = 2;
    private static TARGET_FPS : number = 60;
    public static DEBUG_KEYS = false;
    public static RESOURCE_DIR = "assets/";

    constructor(canvasID : string) {
        this.canvas = new Canvas(canvasID);
        KeyboardInput.init();
        this.handleResizeEvent();
        this.start();
    }

    private start() : void {
        this.waveManager = new WaveManager();
        this.renderer = new Renderer(this.canvas, new MainMenu(this), new PauseMenu(this), new ShopMenu(this, this.waveManager), this.waveManager);

        GameManager.InitiateEntity(new HealthPickup(new Vector2(200,200), 0, new Vector2(50,50)));

        GameStateManager.setActive(GameState.MAIN_MENU);
        this.setBackgroundImage("space", "jpg");

        this.playerSpawnPosition = new Vector2((Canvas.WIDTH/2) - 50, (Canvas.HEIGHT/2) - 50);
        this.player = new Player(new Vector2(this.playerSpawnPosition.x, this.playerSpawnPosition.y), 0, new Vector2(100, 100), EntityType.PLAYER);
        GameManager.entities.push(this.player);

        this.renderer.drawFPS(true);

        let self = this;
        let lastTime = Date.now();
        new Time();
        this._gameLoop = setInterval(function () {

            self.update();

            let now = Date.now();
            let deltaTime = (now - lastTime) / 1000;
            Time.deltaTime = deltaTime;
            lastTime = now;

        }, 1000/GameManager.TARGET_FPS);
    }

    private update() : void {
        // Prepare for rendering
        this.renderer.prepare(this.background);

        // Check the game state
        if (GameStateManager.getState() == GameState.MAIN_MENU) {
            // Start listening for menu input if not already doing so
            if (!MenuMouseInput.isListening()) MenuMouseInput.startListening();
            // Update and render the main menu
            this.renderer.manageMainMenu();
        }
        if (GameStateManager.getState() == GameState.PAUSED) {
            // Start listening for menu input if not already doing so
            if (!MenuMouseInput.isListening()) MenuMouseInput.startListening();
            if (KeyboardInput.isClicked("pause")) {
                GameStateManager.setActive(GameState.RUNNING_WAVE);
                return;
            };
            // Render all entities but stop updating them
            this.renderer.render(<Array<Entity>>GameManager.entities);
            // Update and render the pause menu
            this.renderer.managePauseMenu();
        }
        if (GameStateManager.getState() == GameState.STARTING_WAVE) {
            if (MenuMouseInput.isListening()) MenuMouseInput.stopListening();
            if (!this.waveManager.isInWaveIntro()) this.waveManager.startWaveIntro();
            this.waveManager.update();
            this.renderer.renderWaveManager();
        }
        if (GameStateManager.getState() == GameState.RUNNING_WAVE) {
            console.log("running");
            // Stop listening for menu input if still doing this
            if (MenuMouseInput.isListening()) MenuMouseInput.stopListening();
            // Check for paused
            if (KeyboardInput.isClicked("pause")) {
                GameStateManager.setActive(GameState.PAUSED);
                return;
            };

            // Update game logic for all entities
            for (let i = 0; i < GameManager.entities.length; i++) {
                let entity = <Entity>GameManager.entities[i];
                entity.update();
                entity.updateComponents();
            }

            this.waveManager.update();
            this.renderer.renderWaveManager();

            // Render all entities
            this.renderer.render(<Array<Entity>>GameManager.entities);
        }
        if (GameStateManager.getState() == GameState.ENDING_WAVE) {
            if (MenuMouseInput.isListening()) MenuMouseInput.stopListening();
            this.waveManager.update();
            this.renderer.renderWaveManager();
        }
        if (GameStateManager.getState() == GameState.SHOP_MENU) {
            if (!MenuMouseInput.isListening()) MenuMouseInput.startListening();
            this.renderer.manageShopMenu();
        }
        if (GameStateManager.getState() == GameState.GAME_OVER) {
            if (!MenuMouseInput.isListening()) MenuMouseInput.startListening();
            this.renderer.renderGameOverScreen();
            let self = this;
            setTimeout(function () {
                self.reset();
            }, 3000);
        }
        Time.fpsCounter++; // Increment the fps counter
    }

    private handleResizeEvent() : void {
        let self = this;
        window.onresize = function () {
            self.canvas.set();
        }
    }

    public setBackgroundImage(filename : string, filetype : string): void {
        this.background = new Image();
        this.background.src = "assets/wallpapers/" + filename + "." + filetype;
    }

    public static InitiateEntity(entity : Entity) {
        GameManager.entities.push(entity);
    }

    public static GetPlayer() : Player {
        let player : Player = null;
        for (let i = 0; i < this.entities.length; i++) {
            let entity = <Entity>this.entities[i];
            if (entity.getType() == EntityType.PLAYER) {
                player = <Player>entity;
                break;
            }
        }

        return player;
    }

    public static GetEntitiesByType(entityType : EntityType) : Array<BaseEntity> {
        let entities : Array<BaseEntity> = [];
        for (let i = 0; i < this.entities.length; i++) {
            let entity = <Entity>this.entities[i];
            if (entity.getType() == entityType) {
                entities.push(entity);
            }
        }

        return entities;
    }

    public static RemoveEntity(entity : Entity) : void {
        for (let i = 0; i < this.entities.length; i++) {
            let currentEntity = this.entities[i];
            if (entity == currentEntity) {
                this.entities.splice(i, 1);
            }
        }
    }
    
    public reset() : void {
        GameManager.entities = [];
        this.waveManager.setWave(1);
        clearInterval(this._gameLoop);
        this.start();
    }

    public prepareNextWave() {
        GameManager.entities = [];
        let playerTransform = this.player.getComponent<TransformComponent>(TransformComponent);
        playerTransform.position = new Vector2(this.playerSpawnPosition.x, this.playerSpawnPosition.y);
        GameManager.entities.push(this.player);
    }
}