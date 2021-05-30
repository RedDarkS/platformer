class Chevalier extends ObjetEnnemi
{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y)
    {
        super(scene, x, y, "Ennemi1");

        //pas de gravité
        this.body.allowGravity=false;

        //gestion de la taille
        this.setDisplaySize(40,100);

        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width,this.body.height -100);
        this.setOffset(0,30);

        //définir les propriété que l'on va utiliser dans notre animation

        // X
        this.originalX=x;
        this.minX=x;
        this.maxX=x;

        // Y
        this.originalY=y;
        this.minY=y-35;
        this.maxY=y+50;

        // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        scene.tweens.add(
            {
            targets:this,
            duration:500,
            delay:Math.random()*2000,
            alpha:{
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            },
            onComplete: function ()
            {
                me.start();
            }
        })

    }

    start()
    {
        this.scene.tweens.add({
            targets: this,
            //horizontale
            x: {
                from: this.minX,
                to: this.maxX,
                duration: 1500,
                ease: 'linear',
                yoyo: -1,
                repeat:-1,
                flipX:true,
            },
        });
    }

}