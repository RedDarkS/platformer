class Projectile extends ObjetEnnemi
{
    constructor(scene, x, y)
    {
        super(scene, x, y, "projo");

        this.body.allowGravity=false;
        //this.setVelocityX(160);
        this.body.setSize(15,20);

        this.originalX=x;
        this.minX=x;
        this.maxX=x+100;

        this.x = this.minX;
    }

}