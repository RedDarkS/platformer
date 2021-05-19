class Rectangle extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, w, h, image)
    {
        super(scene, x, y, image);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity=false;

        this.setDisplaySize(w, h);
    }

    collision()
    {
        console.log("coucou");
    }

    collisionTorche(torch)
    {
        console.log("torche");
        torch.setTint(0x00FF00);
    }
}