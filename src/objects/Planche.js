class Planche extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, image)
    {
        super(scene, x, y, image);

        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.displayWidth = 32;
        this.displayHeight = 12;

        scene.starsFxContainer = scene.add.container();
        scene.starsFxContainer.x = 0;
        scene.starsFxContainer.y = -12;

        let emmit = new Phaser.Geom.Rectangle(x, y, 16, 10);

        let parti = scene.add.particles("pixel");
        this.liliter = parti.createEmitter({
            frequency: 100,
            lifespan: 500,
            quantity: 5,
            gravityX: 0,
            gravityY: 50,
            x: {min: -64, max: 64},
            // y: {min: -64, max: 64},
            tint: [0x6e3300],
            rotate: {min: 0, max: 360},
            scale: {start: 0.1, end: 0.3},
            alpha: {start: 1, end: 0},
            emitZone: { type: 'random', source: emmit },
            blendMode: Phaser.BlendModes.ADD,
            speed: 30
        });

        scene.starsFxContainer.add(parti);
        // this.liliter.on = false;
    }

    fall()
    {
        // this.liliter.on = true;
        this.body.allowGravity = true;
        this.liliter.startFollow(this);

        setTimeout(function()
        {
            this.liliter.on = false;
        }, 50)

    }
}