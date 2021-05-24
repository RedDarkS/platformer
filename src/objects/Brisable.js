class Brisable extends Phaser.Physics.Arcade.Sprite
{
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
                this.mimiter.setVisible(true);
            }
        }
        else
        {
            this.mimiter.pause();
            this.mimiter.setVisible(false);
        }

        this._isActive = value;
    }

    constructor(scene, x, y, image)
    {
        super(scene, x, y, image);

        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.displayWidth = 12;
        this.displayHeight = 190;

        this.scene = scene;
        this._isActive = false;

        scene.starsFxContainer = scene.add.container();
        scene.starsFxContainer.x = 0;
        scene.starsFxContainer.y = -12;

        let emmit = new Phaser.Geom.Rectangle(x + 50, y - 120, 5, 190);

        let parti = scene.add.particles("pixel");
        this.mimiter = parti.createEmitter({
            frequency: 100,
            lifespan: 500,
            quantity: 5,
            gravityX: 50,
            gravityY: 0,
            x: {min: -64, max: 64},
            y: {min: -64, max: 64},
            tint: [0x6e3300],
            rotate: {min: 0, max: 360},
            scale: {start: 0.1, end: 0.3},
            alpha: {start: 1, end: 0},
            emitZone: { type: 'random', source: emmit },
            blendMode: Phaser.BlendModes.ADD,
            speed: 30
        });

        this.mimiter.startFollow(this);
        // this.mimiter.pause();

        scene.starsFxContainer.add(parti);
    }

    break()
    {
        this.mimiter.resume();
        this.mimiter.setVisible(true);
        this.emit(MyEvents.BREAK);
    }

}