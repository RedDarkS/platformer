class Rectangle extends Phaser.Physics.Arcade.Sprite
{
    get isActive()
    {
        return this._isActive;
    }

    set isActive(value)
    {
        if(value === this._isActive)//la valeur n'a pas changé donc on ne fait rien
        {
            return;
        }

        if(value)//le joueur est dans le rectangle
        {
            this.alpha = 0;
        }
        else//le joueur n'y est pas
        {
            this.alpha = 1;
        }

        this._isActive = value;
    }

    constructor(scene, x, y, w, h)
    {
        super(scene, x, y);

        this._isActive = true;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity=false;

        this.setDisplaySize(w, h);
    }
}