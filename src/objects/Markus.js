class Markus extends ObjetEnnemi
{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y)
    {
        super(scene, x, y, "markus_animes");

        this.body.allowGravity=true;
        this.setCollideWorldBounds(true);

        this.setDisplaySize(1024,300);
        this.setOrigin(0,0);

        this.displayWidth = this.body.width/1.9;
        this.displayHeight = this.body.height/1.7;

        this.setBodySize(this.body.width/8,this.body.height/2);
        this.setOffset(0,150);

        scene.time.addEvent({ delay: 1000, callback: this.test, callbackScope: this, loop: true });

        scene.time.addEvent({ delay: 8000, callback: this.mort, callbackScope: this, loop: true });

        this.dir = 1;
        this.isAlive = true;
        this.scene = scene;

        this.anims.create(
            {
                key: 'markus',
                frames: this.anims.generateFrameNumbers('markus_animes', { start: 0, end: 16}),
                frameRate: 12,
                // repeat: -1
            });
        this.anims.create({
            key: 'stance',
            frames: [ { key: 'markus_animes', frame: 0 } ],
            frameRate: 12
        });

        let me=this;
    }

    test()
    {
        this.vivant();
        this.pos();

        if(this.isAlive)
        {
            if (this.scene.player.x > this.x - 50 && this.scene.player.x < this.x + 500)
            {
                this.anims.play('markus');
            }
            else
            {
                this.anims.play('stance');
            }
        }
    }

    vivant()
    {
        if (this.body.touching.up && this.isAlive)
        {
            this.isAlive = false;
        }
    }

    mort()
    {
        if(this.isAlive===false)
        {
            this.isAlive=true;
        }
    }

    pos(){
        if (this.x < this.scene.player.x)
        {
            this.dir = 1;
        }
        else if (this.x > this.scene.player.x)
        {
            this.dir = -1;
        }
    }

}