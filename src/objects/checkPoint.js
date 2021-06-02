class checkPoint extends Phaser.Physics.Arcade.Sprite
{
    get isActive()
    {
        return this._isActive;
    }

    set isActive(value)
    {
        if(value === this._isActive)
        {
            return;
        }

        if(value)
        {
            this.emmiter.resume();
            this.emmiter.setVisible(true);
        }
        else
        {
            this.emmiter.pause();
            this.emmiter.setVisible(false);
        }

        this._isActive = value;
    }

    constructor(scene, x, y, image, value)
    {
        super(scene, x, y, image);
        this.scene=scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDisplaySize(32,64);

        this.setBodySize(this.body.width,this.body.height);
        this.setOffset(0,0);

        this.valuePos = value;
        this.body.allowGravity=false;
        this._isActive = false;

        this.starsFxContainer = scene.add.container();
        this.starsFxContainer.x = 16;
        this.starsFxContainer.y = -16;

        this.x = x;
        this.y = y;

        let particles = scene.add.particles('pixel');
        this.emmiter = particles.createEmitter({
            frequency: 150,
            lifespan: Phaser.Math.Between(800,1000),
            quantity: 5,
            gravityX: 0,
            gravityY: -50,
            x: {min: -16, max: 16},
            y: {min: -16, max: 16},
            tint: [  0x9ACD32, 0x32CD32, 0x00FF00, 0x7CFC00, 0x008000 ],
            rotate: { min:0, max:360 },
            radial: true,
            scale: { start: 0.2, end: 0.1 },
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
            speed: 20
        });

        this.emmiter.startFollow(this);
        this.emmiter.pause();

        scene.starsFxContainer.add(particles);

        this.compt = 0;
    }

    glow()
    {
        if(this.compt < 1)
        {
            this.halo = this.scene.add.pointlight(this.x - 16, this.y, (30, 255, 144), 75, 0.1, 0.1);
            this.halo.color.r = 30;
            this.halo.color.g = 255;
            this.halo.color.b = 144;

            this.scene.starsFxContainer.add(this.halo);

            this.emmiter.resume();

            this.compt ++;
        }
    }

    savePos()
    {
        if(localStorage.getItem('cP') > 0)
        {
            if (localStorage.getItem('cP') < this.valuePos)
            {
                localStorage.setItem('cP', this.valuePos);
            }
        }
        else
        {
            localStorage.setItem('cP', this.valuePos);
        }
    }

    loadPos()
    {
        if (localStorage.getItem('cP') == this.valuePos)
        {
            return{
                x : this.x,
                y : this.y
            }
        }
        return false;
    }
}