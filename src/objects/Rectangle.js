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
            this.setTint(0xFFFF00);
            this.alpha = 0.2;
        }
        else//le joueur n'y est pas
        {
            this.setTint(0xFF00FF);
            this.alpha = 0.8;
        }

        this._isActive = value;
    }

    constructor(scene, x, y, w, h, image)
    {
        super(scene, x, y, image);

        let ici = this;

        this._isActive = false;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity=false;

        this.setDisplaySize(w, h);
    }

    collisionTorche(torch)
    {
        console.log("torche");
        torch.setTint(0x00FF00);
    }
}