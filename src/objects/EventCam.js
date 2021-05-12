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
            console.log("non");
            this.emit(MyEvents.CENTREE);
        }
        /*
        var cam = Tableau.current.cameras.main;
        cam.pan(500, 500, 2000, 'Power2');
        cam.zoomTo(4, 3000);
         */
    }
}