class Tableau07 extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');
        this.load.image('ground', 'assets/platform.png');

    }
    create() {
        super.create();
        //quelques étoiles
        let largeur=64*2;
        this.stars=this.physics.add.group();
        for(let posX=largeur/2;posX<largeur*7;posX+=largeur){
            let star=this.stars.create(posX ,100,"star");
            star.body.allowGravity=false;
            star.setCollideWorldBounds(true);
        }
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        //plateformes
        this.platforms=this.physics.add.group();
        for(let i=1 ;i<=3;i++){
            let plateforme=this.platforms.create(largeur*i ,i*64+150,"ground");
            plateforme.setOrigin(0,0);
            plateforme.setDisplaySize(64,8);
            plateforme.body.allowGravity=false;
            plateforme.setBounceX(1);
            plateforme.setCollideWorldBounds(true);
            plateforme.setVelocityX(100)
            plateforme.setImmovable(true);
            plateforme.setFriction(1);
        }

        //le joueur rebondit sur les plateformes
        this.physics.add.collider(this.player,this.platforms);

        //nos monstres volants
        new MonsterFly(this,400,100);
        new MonsterFly(this,600,100);



    }



}

