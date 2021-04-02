class checkPoint extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, image, value)
    {
        super(scene, x, y, image);
        this.scene=scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.valuePos = value;
        this.body.allowGravity=false;
    }

    savePos()
    {
        console.log(this.valuePos);
        localStorage.setItem('cP', this.valuePos);
    }

    loadPos()
    {
        if (localStorage.getItem('cP') === this.valuePos)
        {
            return{
                x : this.x,
                y : this.y
            }
        }
        return false;
    }
}