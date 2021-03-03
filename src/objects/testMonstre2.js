class testMonstre2 extends ObjetEnnemi
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
        this.setDisplaySize(70,90);

        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width-100,this.body.height-100);
        this.setOffset(50,50);

        //définir les propriété que l'on va utiliser dans notre animation

        // X
        this.originalX=x;
        this.minX=x-200;
        this.maxX=x+200;

        // Y
        this.originalY=y;
        this.minY=y-50;
        this.maxY=height-32;

        // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add({
                targets:this,
                duration:200,
                delay:Math.random()*2000,
                alpha:{
                    startDelay:Math.random()*5000,
                    from:0,
                    to:1,
                },
                onComplete: function () {
                    me.start();
                }
            })

    }

    start(){
        this.scene.tweens.add({
            targets: this,
            //horizontale
            x: {
                from: this.minX,
                to:this.maxX,
                duration: 2500,
                ease: 'linear',
                yoyo: -1,
                repeat:-1,
                flipX:true,
            },
        });
    }

}