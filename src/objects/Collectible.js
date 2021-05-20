class Collectible extends Phaser.Physics.Arcade.Sprite
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
            this.emmiter.on = true;
            this.halo.boot();
        }
        else//la torche n'est pas active
        {
            this.emmiter.on = false;
            this.halo.shutdown();
        }

        this._isActive = value;
    }

    constructor(scene, x, y, image)
    {
        super(scene, x, y, image)
        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.displayWidth = 72;
        this.displayHeight = 96;

        this.scene = scene;
        this._isActive = false;

        this.starsFxContainer = scene.add.container();
        this.starsFxContainer.x = 0;
        this.starsFxContainer.y = -12;

        let particles = scene.add.particles('pixel');
        this.emmiter = particles.createEmitter({
            frequency: 10,
            lifespan: 1000,
            quantity: 5,
            x: {min: -64, max: 64},
            y: {min: -64, max: 64},
            tint: [0xFFFF00],
            rotate: {min: 0, max: 360},
            scale: {start: 0.1, end: 0.3},
            alpha: {start: 1, end: 0},
            blendMode: Phaser.BlendModes.ADD,
            speed: 30
        });
        this.flameche = particles.createEmitter({
            frequency: 100,
            lifespan: 1200,
            quantity: 5,
            gravityX: 0,
            gravityY: -100,
            x: {min: -32, max: 32},
            y: {min: -32, max: 32},
            tint: [0x191970, 0x000080, 0x4169E1, 0x1E90FF, 0x4682B4],
            rotate: {min: 0, max: 360},
            radial: true,
            scale: {start: 0.3, end: 0.1},
            alpha: {start: 1, end: 0},
            blendMode: Phaser.BlendModes.ADD,
            speed: 20
        });
        this.flameche.startFollow(this);

        this.halo = scene.add.pointlight(this.x, this.y, (30, 144, 255), 50, 0.1, 0.1);
        this.halo.color.r = 30;
        this.halo.color.g = 144;
        this.halo.color.b = 255;

        // scene.starsFxContainer.add(particles);
        // scene.starsFxContainer.add(this.halo);
    }

    pick()
    {
        this.emit(MyEvents.ACTIVE);
    }
}