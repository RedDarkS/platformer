class EventCam extends Phaser.Physics.Arcade.Sprite
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

        this.setTint(0x009900);

        this.val = val;
    }

    change()
    {
        if(this.val)//base
        {
            this.emit(MyEvents.EXCENTREE);
        }
        else if(!this.val)//modifiée
        {
            this.emit(MyEvents.CENTREE);
        }
    }
}