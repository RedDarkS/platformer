class PriseEsc extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, image)
    {
        super(scene, x, y, image);

        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.setBodySize(this.body.width + 10,this.body.height);
        this.setOffset(-10, 0);

        this.displayWidth = 5;
        this.displayHeight = 32;

        this.scene = scene;
        this.ici = this;
    }
}