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
    }

    savePos()
    {
        // console.log(this.valuePos);
        // localStorage.setItem('cP', this.valuePos);
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