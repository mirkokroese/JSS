///<reference path="../components/graphicalComponents/HealthBarComponent.ts"/>
///<reference path="../menus/PauseMenu.ts"/>
var Renderer = (function () {
    function Renderer(canvas, mainMenu, pauseMenu, shopMenu, waveManager) {
        this.shouldDrawFPS = false;
        this.canvas = canvas;
        this.ctx = canvas.getCtx();
        this.mainMenu = mainMenu;
        this.pauseMenu = pauseMenu;
        this.shopMenu = shopMenu;
        this.waveManager = waveManager;
    }
    Renderer.prototype.prepare = function (background) {
        if (background != null) {
            this.ctx.drawImage(background, 0, 0, this.canvas.getWidth(), this.canvas.getHeight());
            return;
        }
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.getWidth(), this.canvas.getHeight());
    };
    Renderer.prototype.render = function (entities) {
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            this.ctx.fillStyle = "blue";
            var entityTransform = entity.getComponent(TransformComponent);
            var position = entityTransform.position;
            var scale = entityTransform.scale;
            if (entity.hasComponent(SpriteComponent) && entity.isActive()) {
                var sprite = entity.getComponent(SpriteComponent).getSprite();
                // Draw the collider
                // this.drawCollider(entity);
                // Draw entity
                this.ctx.drawImage(sprite.getImage(), position.x, position.y, scale.x, scale.y);
            }
            this.ctx.globalAlpha = .75;
            if (entity.hasComponent(HealthBarComponent)) {
                var healthBar = entity.getComponent(HealthBarComponent);
                this.ctx.fillStyle = healthBar.getBackgroundColor();
                this.ctx.fillRect(healthBar.getX(), healthBar.getY(), healthBar.getWidth(), healthBar.getHeight());
                this.ctx.fillStyle = healthBar.getForegroundColor();
                this.ctx.fillRect(healthBar.getX(), healthBar.getY(), healthBar.getWidth(true), healthBar.getHeight());
            }
            if (entity.hasComponent(BoostBarComponent)) {
                var boostBar = entity.getComponent(BoostBarComponent);
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
            this.ctx.fillText("" + Time.fps, 25, 25);
        }
    };
    Renderer.prototype.manageMainMenu = function () {
        this.mainMenu.update();
        this.mainMenu.render(this.ctx);
    };
    Renderer.prototype.managePauseMenu = function () {
        this.pauseMenu.update();
        this.pauseMenu.render(this.ctx);
    };
    Renderer.prototype.manageShopMenu = function () {
        this.shopMenu.update();
        this.shopMenu.render(this.ctx);
    };
    Renderer.prototype.renderWaveManager = function () {
        this.waveManager.render(this.ctx);
    };
    Renderer.prototype.renderGameOverScreen = function () {
        this.ctx.fillStyle = "#1abc9c";
        this.ctx.textAlign = "center";
        this.ctx.font = "50px Arial";
        this.ctx.fillText("Game Over!", Canvas.WIDTH / 2, Canvas.HEIGHT / 2 - 15);
        this.ctx.font = "50px Arial";
        this.ctx.fillText("You have reached wave " + this.waveManager.getWave(), Canvas.WIDTH / 2, Canvas.HEIGHT / 2 - 50);
    };
    Renderer.prototype.drawFPS = function (value) {
        this.shouldDrawFPS = value;
    };
    Renderer.prototype.drawCollider = function (entity) {
        var entityTransform = entity.getComponent(TransformComponent);
        var position = entityTransform.position;
        var rotation = entityTransform.rotation;
        var scale = entityTransform.scale;
        // Draw collider
        this.ctx.beginPath();
        this.ctx.arc(position.x + scale.x / 2, position.y + scale.y / 2, scale.x / 2, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "#003300";
        this.ctx.stroke();
    };
    return Renderer;
}());
