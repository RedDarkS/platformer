class Torche extends Phaser.Physics.Arcade.Sprite
{
    preload()
    {
        this.load.image('pixel', 'assets/pixel.png');
    }

    constructor(scene, x, y)
    {
        super(scene, x, y, "torche")
        scene.add.existing(this);

        this.displayWidth = 72;
        this.displayHeight = 96;

        this.scene = scene;

        this.anims.create(
            {
                key: 'burn',
                frames: this.anims.generateFrameNumbers('torche', { start: 0, end: 6 }),
                frameRate: 10,
                repeat: -1
            });

        this.anims.play('burn', true);

        this.pointLight = scene.add.pointlight(x, y-10, (0, 0, 0), 150, 0.1, 0.05);
        this.pointLight.color.r = 205;
        this.pointLight.color.g = 165;
        this.pointLight.color.b = 20;

        scene.starsFxContainer = scene.add.container();
        scene.starsFxContainer.x = 0;
        scene.starsFxContainer.y = -12;

        // let emmit = new Phaser.Geom.Circle(x+10, y+5, 10);

        let particles = scene.add.particles('pixel');
        let emmiter = particles.createEmitter({
            frequency: 100,
            lifespan: Phaser.Math.Between(1000,1500),
            quantity: 5,
            gravityX: 0,
            gravityY: -50,
            tint: [  0xB85901, 0x753901, 0xF57802, 0x361A01, 0xDB6B02 ],
            rotate: { min:0, max:360 },
            radial: true,
            scale: { start: 0.1, end: 0.1 },
            alpha: { start: 1, end: 0 },
            // emitZone: { type: 'random', source: emmit },
            blendMode: Phaser.BlendModes.ADD,
            speed: 20
        });

        emmiter.startFollow(this);

        scene.starsFxContainer.add(particles);
    }
}