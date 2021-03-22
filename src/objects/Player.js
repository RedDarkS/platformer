class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y) 
    {
        super(scene, x, y, "player_plus")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0);
        this.setGravityY(600)
        this.setFriction(1,1);

        this.setBodySize(this.body.width - 350,this.body.height -20);
        this.setOffset(150, 10);

        this.displayWidth = 107;
        this.displayHeight = 64;

        this.anims.create(
            {
            key: 'left',
            frames: this.anims.generateFrameNumbers('player_plus', { start: 0, end: 20 }),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create(
            {
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_plus', { start: 0, end: 20 }),
            frameRate: 24,
            repeat: -1
        });
        this.anims.create(
            {
            key: 'turn',
            frames: [ { key: 'player_plus', frame: 7 } ],
            frameRate: 24
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
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move()
    {

        switch (true)
        {
            case this._directionX < 0:
                this.setVelocityX(-450);
                this.anims.play('left', true);
                this.setFlipX(true);
                break;

            case this._directionX > 0:
                this.setVelocityX(450);
                this.anims.play('right', true);
                this.setFlipX(false);
                break;

            default:
                this.setVelocityX(0);
                this.anims.play('turn');
        }

        if(this._directionY < 0)
        {
            if(this.body.blocked.down || this.body.touching.down)
            {
                this.setVelocityY(-550);
            }
        }


    }


}