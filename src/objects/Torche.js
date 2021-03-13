class Torche extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, "torche")
        scene.add.existing(this)

        this.anims.create(
            {
                key: 'burn',
                frames: this.anims.generateFrameNumbers('torche', { start: 0, end: 6 }),
                frameRate: 10,
                repeat: -1
            });

        this.anims.play('burn', true);

        this.pointLight = scene.add.pointlight(x, y-10, (0, 0, 0), 100, 0.1, 0.1);
        this.pointLight.color.r = 255;
        this.pointLight.color.g = 215;
        this.pointLight.color.b = 0;
    }

    update()
    {
        if(this.pointLight.x >= x+10)
        {
            this.pointLight.x = x-10;
        }
        else{
            this.pointLight.x += 1
        }
    }
}