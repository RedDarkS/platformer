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

        this.setBodySize(this.body.width/10,this.body.height/2);
        this.setOffset(30,150);

        scene.time.addEvent({ delay: 2000, callback: this.test, callbackScope: this, loop: true });

        scene.time.addEvent({ delay: 8000, callback: this.mort, callbackScope: this, loop: true });

        this.dir = 1;
        this.isAlive = true;
        this.scene = scene;

        this.anims.create(
            {
                key: 'markus',
                frames: this.anims.generateFrameNumbers('markus_animes', { start: 0, end: 17}),
                frameRate: 8,
                // repeat: -1
            });
        this.anims.create({
            key: 'stance',
            frames: [ { key: 'markus_animes', frame: 0 } ],
            frameRate: 12,
        });

        let me=this;

        this.on(MyEvents.MARKUS, function()
        {
            if(me.scene.player.isDead !== true)
            {
                if(this.anims.isPlaying !== true)
                {
                    me.anims.play('markus');
                    me.body.width *= 1.5;
                    me.setOffset(50,150);

                    setTimeout(function()
                    {
                        me.setOffset(100,150);
                    },300);

                    setTimeout(function()
                    {
                        me.setOffset(150,150);
                    },450);

                    setTimeout(function()
                    {
                        me.setOffset(200,150);
                    },600);

                    setTimeout(function()
                    {
                        me.setOffset(400,150);
                    },750);

                    setTimeout(function()
                    {
                        me.setOffset(600,150);
                    },900);

                    setTimeout(function()
                    {
                        me.setOffset(800,150);
                    },1600);

                    setTimeout(function()
                    {
                        me.x += 440;
                        me.setOffset(30, 150);
                        me.body.width /= 1.5;
                        me.anims.play('stance');
                    },1990);
                }
            }
        });
    }

    test()
    {
        this.vivant();

        let me=this;

        if(this.isAlive)
        {
            if (this.scene.player.x > this.x - 100 && this.scene.player.x < this.x + 650 && this.scene.player.y > this.y - 100)
            {
                this.emit(MyEvents.MARKUS);
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

}