class Planche extends Phaser.Physics.Arcade.Sprite
{
    get isFalling() {
        return this._isFalling;
    }

    set isFalling(value) {
        this._isFalling = value;
    }
    get isActive()
    {
        return this._isActive;
    }

    set isActive(value)
    {
        if(value === this._isActive)//la valeur n'a pas changé donc on ne fait rien
        {
            return;
        }

        if(value)
        {
            if(this.body.enable)
            {
                this.liliter.setVisible(true);
            }
        }
        else
        {
            this.liliter.pause();
            this.liliter.setVisible(false);
        }

        this._isActive = value;
    }

    constructor(scene, x, y, image)
    {
        super(scene, x, y, image);
        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.startX = x;
        this.startY = y;

        this.displayWidth = 32;
        this.displayHeight = 12;

        this.scene = scene;
        this._isActive = false;
        this._isFalling = false;

        scene.starsFxContainer = scene.add.container();
        scene.starsFxContainer.x = 0;
        scene.starsFxContainer.y = -12;

        let emmit = new Phaser.Geom.Rectangle(x, y, 32, 5);

        let parti = scene.add.particles("pixel");
        this.liliter = parti.createEmitter({
            frequency: 100,
            lifespan: 500,
            quantity: 5,
            gravityX: 0,
            gravityY: 50,
            tint: [0x6e3300],
            rotate: {min: 0, max: 360},
            scale: {start: 0.1, end: 0.3},
            alpha: {start: 1, end: 0},
            emitZone: { type: 'random', source: emmit },
            blendMode: Phaser.BlendModes.ADD,
            speed: 30
        });
        this.liliter.startFollow(this);
        this.liliter.pause();

        scene.starsFxContainer.add(parti);
    }

    fall(player)
    {
        let ici = this;

        if(player.isEsc !== true)
        {
            this._isFalling = true;

            this.body.allowGravity = true;
            this.liliter.resume();
            this.liliter.setVisible(true);

            setTimeout(function()
            {
                ici.liliter.pause();
                ici.liliter.setVisible(false);
            }, 2000)

            setTimeout(function()
            {
                ici.replace()
            }, 5000)
        }
    }

    replace()
    {
        this.body.allowGravity = false;
        this._isFalling = false;

        this.x = this.startX;
        this.y = this.startY;
        this.setVelocityX(0);
        this.setVelocityY(0);
    }
}