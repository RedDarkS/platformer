class EventCam extends Phaser.Physics.Arcade.Sprite
{
    preload()
    {
        this.load.image('pixel', 'assets/pixel.png');
    }

    constructor(scene, player, x, y, val)
    {
        super(scene, x, y, "pixel")
        scene.add.existing(this)

        this.scene = scene;
        this.player = player;
        this.val = val;
    }

    change()
    {
        if(this.val)//base
        {
            //this.scene.cameras.main.startFollow(this.player, false, 0.1, 0.2, -200, 50);
            console.log("oui");
            this.emit(MyEvents.EXCENTREE);
        }
        else if(!this.val)//modifiée
        {
            //this.scene.cameras.main.startFollow(this.player, false, 0.1, 0.2, 0, 50);
            console.log("non");
            this.emit(MyEvents.CENTREE);
        }
    }
}