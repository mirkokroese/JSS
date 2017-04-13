///<reference path="../components/graphicalComponents/HealthBarComponent.ts"/>
///<reference path="../menus/PauseMenu.ts"/>
class Renderer {
    private canvas : Canvas;
    private ctx : CanvasRenderingContext2D;
    private mainMenu : MainMenu;
    private pauseMenu : PauseMenu;
    private shopMenu : ShopMenu;
    private waveManager : WaveManager;
    private shouldDrawFPS : boolean = false;

    constructor(canvas : Canvas, mainMenu : MainMenu, pauseMenu : PauseMenu, shopMenu : ShopMenu, waveManager : WaveManager) {
        this.canvas = canvas;
        this.ctx = canvas.getCtx();
        this.mainMenu = mainMenu;
        this.pauseMenu = pauseMenu;
        this.shopMenu = shopMenu;
        this.waveManager = waveManager;
    }

    public prepare(background) : void {
        if (background != null) {
            this.ctx.drawImage(background, 0, 0, this.canvas.getWidth(), this.canvas.getHeight());
            return;
        }
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.getWidth(), this.canvas.getHeight());
    }

    public render(entities : Array<Entity>) : void {
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            this.ctx.fillStyle = "blue";

            let entityTransform = entity.getComponent<TransformComponent>(TransformComponent);
            let position : Vector2 = entityTransform.position;
            let scale : Vector2 = entityTransform.scale;
            if (entity.hasComponent(SpriteComponent) && entity.isActive()) {
                let sprite = entity.getComponent<SpriteComponent>(SpriteComponent).getSprite();
                // Draw the collider
                // this.drawCollider(entity);

                // Draw entity
                this.ctx.drawImage(sprite.getImage(), position.x, position.y, scale.x, scale.y);
            }

            this.ctx.globalAlpha = .75;
            if (entity.hasComponent(HealthBarComponent)) {
                let healthBar = entity.getComponent<HealthBarComponent>(HealthBarComponent);
                this.ctx.fillStyle = healthBar.getBackgroundColor();
                this.ctx.fillRect(healthBar.getX(), healthBar.getY(), healthBar.getWidth(), healthBar.getHeight());
                this.ctx.fillStyle = healthBar.getForegroundColor();
                this.ctx.fillRect(healthBar.getX(), healthBar.getY(), healthBar.getWidth(true), healthBar.getHeight());
            }
            if (entity.hasComponent(BoostBarComponent)) {
                let boostBar = entity.getComponent<BoostBarComponent>(BoostBarComponent);
                this.ctx.fillStyle = boostBar.getBackgroundColor();
                this.ctx.fillRect(boostBar.getX(), boostBar.getY(), boostBar.getWidth(), boostBar.getHeight());
                this.ctx.fillStyle = boostBar.getForegroundColor();
                this.ctx.fillRect(boostBar.getX(), boostBar.getY(), boostBar.getWidth(true), boostBar.getHeight());
            }
            this.ctx.globalAlpha = 1;
        }

        if (this.shouldDrawFPS) {
            this.ctx.fillStyle = "white";
            this.ctx.font = "15px Arial";
            this.ctx.fillText(""+Time.fps, 25, 25);
        }
    }

    public manageMainMenu() : void {
        this.mainMenu.update();
        this.mainMenu.render(this.ctx);
    }

    public managePauseMenu() : void {
        this.pauseMenu.update();
        this.pauseMenu.render(this.ctx);
    }

    public manageShopMenu() : void {
        this.shopMenu.update();
        this.shopMenu.render(this.ctx);
    }

    public renderWaveManager() : void {
        this.waveManager.render(this.ctx);
    }

    public renderGameOverScreen() : void {
        this.ctx.fillStyle = "#1abc9c";
        this.ctx.textAlign = "center";
        this.ctx.font = "50px Arial";
        this.ctx.fillText("Game Over!", Canvas.WIDTH/2, Canvas.HEIGHT/2-15);
        this.ctx.font = "50px Arial";
        this.ctx.fillText("You have reached wave " + this.waveManager.getWave(), Canvas.WIDTH/2, Canvas.HEIGHT/2-50);
    }

    public drawFPS(value : boolean) {
        this.shouldDrawFPS = value;
    }

    public drawCollider(entity : Entity) {
        let entityTransform : TransformComponent = entity.getComponent<TransformComponent>(TransformComponent);
        let position : Vector2 = entityTransform.position;
        let rotation : number = entityTransform.rotation;
        let scale : Vector2 = entityTransform.scale;
        // Draw collider
        this.ctx.beginPath();
        this.ctx.arc(position.x+scale.x/2, position.y+scale.y/2, scale.x/2, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "#003300";
        this.ctx.stroke();
    }

}