class Tableau02 extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
    }
    create() {
        super.create();

        //un groupe d'étoiles
        this.stars=this.physics.add.group();
        this.stars.create(100,0,"star").setCollideWorldBounds(true).setBounce(0.4);
        this.stars.create(200,0,"star").setCollideWorldBounds(true).setBounce(0.5);
        this.stars.create(300,0,"star").setCollideWorldBounds(true).setBounce(0.6);
        this.stars.create(400,0,"star").setCollideWorldBounds(true).setBounce(0.7);
        this.stars.create(500,0,"star").setCollideWorldBounds(true).setBounce(0.8);
        this.stars.create(600,0,"star").setCollideWorldBounds(true).setBounce(0.9);
        this.stars.create(700,0,"star").setCollideWorldBounds(true).setBounce(1);
        //si le joueur touche une étoile dans le groupe...
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        //des plateformes
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.physics.add.collider(this.player, this.platforms);

        //les étoiles rebondissent sur les plateformes
        this.physics.add.collider(this.platforms, this.stars);

    }

}

