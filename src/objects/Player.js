class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y) 
    {
        super(scene, x, y, "player_animes")
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setGravityY(700)
        this.setFriction(1,1);

        this.setBodySize(this.body.width - 380,this.body.height -20);
        this.setOffset(190, 10);

        this.displayWidth = 107 * 1.5;
        this.displayHeight = 64 * 1.5;

        this.invul = true;

        this.anims.create(
            {
            key: 'left',
            frames: this.anims.generateFrameNumbers('player_animes', { start: 0, end: 19 }),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create(
            {
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_animes', { start: 0, end: 19 }),
            frameRate: 24,
            repeat: -1
        });
        this.anims.create(
            {
                key: 'turn',
                frames: this.anims.generateFrameNumbers('player_animes', { start: 20, end: 33 }),
                frameRate: 12,
                repeat: -1
        });

        this._directionX=0;
        this._directionY=0;
    }

    set directionX(value)
    {
        this._directionX=value;
    }
    set directionY(value)
    {
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop()
    {
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
        this.emit(MyEvents.STOP);
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move()
    {
        switch (true)
        {
            case this._directionX < 0:
                this.setVelocityX(-400);
                this.anims.play('left', true);
                this.setFlipX(true);
                this.emit(MyEvents.STOP);
                break;

            case this._directionX > 0:
                this.setVelocityX(400);
                this.anims.play('right', true);
                this.setFlipX(false);
                this.emit(MyEvents.COUR);
                break;

            case this._directionX > 0 && this._directionY > 0 :
                this.setVelocityY(-550);
                this.anims.play('turn', true);
                this.emit(MyEvents.STOP);
                break;

            default:
                this.setVelocityX(0);
                this.anims.play('turn', true);
                this.emit(MyEvents.STOP);
        }

        //saut
        // stockage ||this.body.touching.right
        if(this._directionY < 0)
        {
            if(this.body.blocked.down)
            {
                this.setVelocityY(-550);
                this.emit(MyEvents.SAUTE);
            }
            else if(this.body.blocked.right || this.body.blocked.left)
            {
                this.setVelocityY(-300);
                this.emit(MyEvents.GRIMPE);
                this.emit(MyEvents.STOP);
            }
        }
    }

    roulade()
    {
        setTimeout(function(){
            console.log("no body");
            this.invul = false;
        },1);

        setTimeout(function(){
            console.log("body");
            this.invul = true;
        },1000);

        /*
        if(this.body.blocked.right || this.body.touching.right)
        {
            this.x-=5;
        }
         */
    }

    //TODO une roulade

}