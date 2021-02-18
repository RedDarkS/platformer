class Niveau1 extends Tableau
{
    preload() 
    {
        super.preload();
        this.load.image('Tengu', 'assets/Tengu.png');
        this.load.image('FallenAngel', 'assets/FallenAngel.png');
        this.load.image('Genbu', 'assets/Genbu.png');
        this.load.image('Soul', 'assets/Soul.png');
        this.load.image('Thug', 'assets/Thug.png');
        
        //d'autres trucs pour le décors
        this.load.image('ground', 'assets/platform.png');
        this.load.image('sky-2', 'assets/sky-2.jpg');
        this.load.image('premierPlan', 'assets/premier-plan.png');
        this.load.image('secondPlan', 'assets/second-plan.png');
        this.load.image('dernierPlan', 'assets/dernier-plan.png');
    }
    create() 
    {
        super.create();

        //on définit la taille du tableau
        let largeurDuTableau  = 6*896;
        let hauteurDuTableau = 1*448;

        //on gère la caméra
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        //des étoiles, une en fait...
        this.star1 = this.physics.add.sprite(5370,100,"star");
        this.star1.setDisplaySize(40,40);
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0);

        //quand le joueur touche une étoile on appelle la fonction ramasserEtoile
        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);

        // LES MONSTRES //
        //haut bas
        this.cruch1 = new cruchMonstre(this,1120,100);
        this.cruch2 = new cruchMonstre(this,1568,100);

        //trajectoire cheloue
        this.eF = new testMonstre(this,3808,100);

        //horizontale
        this.razMoquette = new testMonstre2(this,2616,465);

        //Z
        this.Zed = new testMonstre3(this,4704,100);

        //faux cercle
        this.fauxCercle = new circleMonster(this,2912,100);

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky = this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'dernierPlan'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra

        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'secondPlan'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        //this.sky2.alpha=0.2;
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;

        this.sky = this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'premierPlan'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);

        //le sol
        // this.sol = this.physics.add.sprite(0,417, null);
        // this.sol.setDisplaySize(4000,30)//taille de l'objet
        // this.sol.setOrigin(0,0);//pour positionner plus facilement
        // this.sol.body.allowGravity=0; //la gravité n'a pas d'effet ici
        // this.sol.setImmovable(true); //ne bouge pas quand on rentre dedans
        // this.physics.add.collider(this.player, this.sol);//le joueur rebondit dessus
        // this.physics.add.collider(this.star1, this.sol);//l'étoile1 rebondit dessus

        // this.physics.add.collider(this.cruch, this.sol);
        // this.physics.add.collider(this.eF, this.sol);
        // this.physics.add.collider(this.razMoquette, this.sol);
        // this.physics.add.collider(this.Zed, this.sol);
        // this.physics.add.collider(this.fauxCercle, this.sol);

        //fait passer les éléments devant le ciel
        this.star1.setDepth(10);
        this.player.setDepth(10);
        //this.sol.setDepth(10);

        this.cruch1.setDepth(10);
        this.cruch2.setDepth(10);
        this.eF.setDepth(10);
        this.razMoquette.setDepth(10);
        this.Zed.setDepth(10);
        this.fauxCercle.setDepth(10);
        
    }

    update()
        {
            super.update();
            //le ciel se déplace moins vite que la caméra pour donner un effet paralax
            this.sky.tilePositionX = this.cameras.main.scrollX * 0.6;
            this.sky.tilePositionY = this.cameras.main.scrollY * 0.2;

            //le deuxième ciel se déplace moins vite pour accentuer l'effet
            this.sky2.tilePositionX = this.cameras.main.scrollX * 0.3 + 500;
            this.sky2.tilePositionY = this.cameras.main.scrollY * 0.1 + 30;
        }
}