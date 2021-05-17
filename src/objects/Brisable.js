class Brisable extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, image)
    {
        super(scene, x, y, image);

        scene.add.existing(this);

        scene.physics.add.existing(this);

        // this.setBodySize(this.body.width,this.body.height);
        // this.setOffset(190, 10);

        this.displayWidth = 12;
        this.displayHeight = 190;

        this.scene = scene;
    }

}