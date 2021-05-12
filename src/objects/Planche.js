class Planche extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, image)
    {
        super(scene, x, y, image);

        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.displayWidth = 32;
        this.displayHeight = 12;

        // this.tombe = false;
    }

    fall()
    {
        this.body.allowGravity = true;
    }

    // verif()
    // {
    //     if(this.tombe && this.body.blocked.down)
    //     {
    //         this.destroy();
    //     }
    // }
}