class Player extends Phaser.Physics.Arcade.Sprite
{
    get isRunning() {
        return this._isRunning;
    }

    set isRunning(value) {
        this._isRunning = value;
    }
    get isDead() {
        return this._isDead;
    }

    set isDead(value) {
        this._isDead = value;
    }
    get isEsc() {
        return this._isEsc;
    }

    set isEsc(value) {
        this._isEsc = value;
    }

    constructor(scene, x, y) 
    {
        super(scene, x, y, "player_animes")
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setGravityY(700)
        this.setFriction(1,1);

        this.setBodySize(this.body.width -250,this.body.height-20);
        this.setOffset(125, 15);

        this.displayWidth = 100;
        this.displayHeight = 80;

        this.light = scene.lights.addLight(x, y, 150, (0, 0, 0), 0.3);
        this.light.color.r = 2;
        this.light.color.g = 2;
        this.light.color.b = 2;

        this.scene = scene;
        this._isEsc = false;
        this._isDead = false;
        this._isRunning = false;
        this.staticY = false;

        this.anims.create(
            {
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_animes', { start: 0, end: 10 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create(
            {
                key: 'turn',
                frames: this.anims.generateFrameNumbers('player_animes', { start: 11, end: 11 }),
                frameRate: 12,
                repeat: -1
        });
        this.anims.create(
            {
                key: 'escalade',
                frames: this.anims.generateFrameNumbers('player_animes', { start: 12, end: 15}),
                frameRate: 6,
                repeat: -1
            });

        this._directionX=0;
        this._directionY=0;
    }

    get directionX()
    {
        return this._directionX;
    }

    get directionY()
    {
        return this._directionY;
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
            case this._directionY < 0 && this.isEsc :
                this.setVelocityY(-300);

                this.anims.play('escalade', true);

                this.emit(MyEvents.GRIMPE);
                this.emit(MyEvents.STOP);
            break;

            case this._directionX < 0 : // va vers la gauche et n'est pas bloqué à gauche
                this.setVelocityX(-400);

                this.anims.play('right', true);
                this.isRunning = this.body.touching.down;

                this.setFlipX(true);
                if(this.isDead !== true)
                {
                    this.emit(MyEvents.COURG);
                }
                break;

            case this._directionX > 0 : // va vers la droite et n'est pas bloqué à droite
                this.setVelocityX(400);

                this.anims.play('right', true);
                this.isRunning = this.body.touching.down;

                this.setFlipX(false);
                if(this.isDead !== true)
                {
                    this.emit(MyEvents.COURD);
                }
                break;

            default:
                this.setVelocityX(0);
                this.staticY = true;

                this.anims.play('turn', true);
                this.isRunning = false;

                this.emit(MyEvents.STOP);
        }

        //saut
        if(this._directionY < 0)
        {
            if(this.body.blocked.down)
            {
                this.setVelocityY(-550);
                this.emit(MyEvents.SAUTE);
            }
        }
    }

}