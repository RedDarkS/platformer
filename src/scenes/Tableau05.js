class Tableau05 extends Tableau04{

    preload() {
        super.preload();
        this.load.image('sky-2', 'assets/sky-2.jpg');

    }
    create() {
        super.create();

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky.setOrigin(0,0);
        //fait passer les éléments devant le ciel
        this.platforms.setDepth(10)
        this.stars.setDepth(10)
        this.player.setDepth(10)



        //modifie les plateformes
        this.platforms.children.iterate(function (child) {
            child.setDisplaySize(64,32);
            child.setX(child.x+28);
            child.setBounce(1);
        });

        //modifie les étoiles
        let me=this;
        this.stars.children.iterate(function(child){
            me.tweens.add(
                {
                    targets:child,
                    rotation:Phaser.Math.DegToRad(360),
                    duration:1000,
                    repeat:-1
                }
            )
        })

    }
    update(){
        super.update();
        this.sky.tilePositionX++;
    }

}

