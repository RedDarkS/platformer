class Planche extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, image)
    {
        super(scene, x, y, image);

        this.body.allowGravity=false;
    }
}