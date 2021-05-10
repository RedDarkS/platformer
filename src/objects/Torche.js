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

        this.anims.create(
            {
                key: 'burn',
                frames: this.anims.generateFrameNumbers('torche', { start: 0, end: 6 }),
                frameRate: 10,
                repeat: -1
            });

        this.anims.play('burn', true);

        this.pointLight = scene.add.pointlight(x, y-10, (0, 0, 0), 150, 0.1, 0.1);
        this.pointLight.color.r = 255;
        this.pointLight.color.g = 215;
        this.pointLight.color.b = 0;

        scene.starsFxContainer = scene.add.container();
        scene.starsFxContainer.x = 0;
        scene.starsFxContainer.y = -12;

        let particles = scene.add.particles('pixel');
        let emmiter = particles.createEmitter({
            frequency: 100,
            //delay: 200,
            lifespan: 1000,
            quantity: 5,
            gravityX: 0,
            gravityY: -100,
            x: { min: -32, max: 32 },
            y: { min: -32, max: 32 },
            tint: [  0xB85901, 0x753901, 0xF57802, 0x361A01, 0xDB6B02 ],
            rotate: { min:0, max:360 },
            radial: true,
            scale: { start: 0.1, end: 0.1 },
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
            speed: 20
        });

        emmiter.startFollow(this);

        scene.starsFxContainer.add(particles);
    }

    update()
    {
        if(this.pointLight.x >= x+10)
        {
            this.pointLight.x = x-10;
        }
        else{
            this.pointLight.x += 1
        }
    }
}