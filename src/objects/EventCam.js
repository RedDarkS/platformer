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
        if(this.val === -1)
        {
            //this.scene.cameras.main.startFollow(this.player, false, 0.1, 0.2, -200, 50);
            console.log("oui");
            this.scene.cameras.main.setFollowOffset(-200,50);
        }
        else if(this.val === 1)
        {
            //this.scene.cameras.main.startFollow(this.player, false, 0.1, 0.2, 0, 50);
            console.log("non");
            this.scene.cameras.main.setFollowOffset(0,50);
        }
    }

    update()
    {

    }
}