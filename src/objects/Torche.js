class Torche extends Phaser.Physics.Arcade.Sprite
{
    preload()
    {
        this.load.image('pixel', 'assets/pixel.png');
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

        if(value)//la torche est active
        {
            this.anims.play('burn', true);
            this.emmiter.on = true;
            // this.pointLight.setVisible(true);
            // this.pointLight.renderFlags = 15;
            this.pointLight.radius = 150;
        }
        else//la torche n'est pas active
        {
            this.anims.pause();
            this.emmiter.on = false;
            // this.pointLight.setVisible(false);
            // this.pointLight.renderFlags = 0;
            this.pointLight.radius = 0;
        }

        this._isActive = value;
    }

    constructor(scene, x, y)
    {
        super(scene, x, y, "torche")
        scene.add.existing(this);

        this.displayWidth = 72;
        this.displayHeight = 96;

        this.scene = scene;
        this._isActive = false;

        this.anims.create(
            {
                key: 'burn',
                frames: this.anims.generateFrameNumbers('torche', { start: 0, end: 6 }),
                frameRate: 10,
                repeat: -1
            });

        this.pointLight = scene.lights.addLight(x, y-10, 150, (0, 0, 0), 0.5);
        this.pointLight.color.r = 20;
        this.pointLight.color.g = 16;
        this.pointLight.color.b = 2;

        this.anims.play('burn', true);

        scene.starsFxContainer = scene.add.container();
        scene.starsFxContainer.x = 0;
        scene.starsFxContainer.y = -12;

        let particles = scene.add.particles('pixel');
        this.emmiter = particles.createEmitter({
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
            blendMode: Phaser.BlendModes.ADD,
            speed: 20
        });

        this.emmiter.startFollow(this);

        scene.starsFxContainer.add(particles);
    }
}