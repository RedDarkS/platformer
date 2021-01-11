class Tableau03 extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
    }
    create() {
        super.create();

        //un groupe d'étoiles
        this.stars=this.physics.add.group();
        this.stars.create(100,0,"star");
        this.stars.create(200,0,"star");
        this.stars.create(300,0,"star");
        this.stars.create(400,0,"star");
        this.stars.create(500,0,"star");
        this.stars.create(600,0,"star");
        this.stars.create(700,0,"star");
        this.stars.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
            child.setBounce(0.9);
        });
        //si le joueur touche une étoile dans le groupe...
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        //des plateformes dans un groupe
        this.platforms = this.physics.add.group();
        this.platforms.create(200, 150, 'ground')
        this.platforms.create(300, 250, 'ground')
        this.platforms.create(500, 350, 'ground')

        this.platforms.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setVelocityX(100);
            child.setBounceX(1);
            child.setCollideWorldBounds(true);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });

        //le joueur rebondit sur les plateformes
        this.physics.add.collider(this.player, this.platforms);
        //les étoiles rebondissent sur les plateformes
        this.physics.add.collider(this.platforms, this.stars);

    }

    update() {
        super.update();
    }

}

