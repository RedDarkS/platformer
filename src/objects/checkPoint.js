class checkPoint extends Phaser.Physics.Arcade.Sprite
{
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

        this.starsFxContainer = scene.add.container();
        this.starsFxContainer.x = 16;
        this.starsFxContainer.y = -16;

        this.x = x;
        this.y = y;

        this.compt = 0;
    }

    glow()
    {
        if(this.compt < 1){
            this.halo = this.scene.add.pointlight(this.x - 16, this.y, (30, 255, 144), 75, 0.1, 0.1);
            this.halo.color.r = 30;
            this.halo.color.g = 255;
            this.halo.color.b = 144;

            this.scene.starsFxContainer.add(this.halo);

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