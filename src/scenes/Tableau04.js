class Tableau04 extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
    }
    create() {
        super.create();
        let largeur=64*2;

        //un groupe pour les étoiles, un groupe pour les plateformes
        this.stars=this.physics.add.group();
        this.platforms = this.physics.add.group();

        for(let i=0; i<7; i++){
            this.platforms.create(i*largeur ,Phaser.Math.Between(100,200),"ground");
            this.stars.create(i*largeur+largeur/2 ,0,"star");
        }
        this.platforms.children.iterate(function (child) {
            child.setDisplaySize (largeur,10);
            child.setOrigin(0,0);
            child.setCollideWorldBounds(true);
            child.setBounce(1);
            child.setImmovable(true)
            child.setMaxVelocity(0,500);
        });
        this.stars.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
            child.setBounce(1);
            child.setGravityY(-200);
            child.setMaxVelocity(0,200);
        });

        //si le joueur touche une étoile dans le groupe...
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        //le joueur rebondit sur les plateformes
        this.physics.add.collider(this.player, this.platforms);
        //les étoiles rebondissent sur les plateformes
        this.physics.add.collider(this.platforms, this.stars);


    }


}

