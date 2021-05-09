class Planche extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, image)
    {
        super(scene, x, y, image);
        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setGravityY(0);
        this.setFriction(1,1);
    }

    fall()
    {
        this.body.allowGravity = true;
    }

    // update()
    // {
    //     if(this.x > 47 * 64)
    //     {
    //         console.log("hors map");
    //         this.destroy();
    //     }
    // }
}