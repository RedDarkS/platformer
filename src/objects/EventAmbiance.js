class EventAmbiance extends Phaser.Physics.Arcade.Sprite
{
    preload()
    {
        this.load.image('pixel', 'assets/pixel.png');
    }

    constructor(scene, x, y, val, image)
    {
        super(scene, x, y, image);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity=false;
        this.setTint(0x990000);

        this.val = val;
    }

    change()
    {
        if(this.val >= 1)
        {
            this.emit(MyEvents.EXTERIEUR);
        }
        else if(this.val === 0)
        {
            this.emit(MyEvents.INTERIEUR);
        }
    }
}