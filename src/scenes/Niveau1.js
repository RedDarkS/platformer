class Niveau1 extends Tableau
{
    preload() 
    {
        super.preload();
        this.load.image('Tengu', 'assets/Tengu.png');
        this.load.image('FallenAngel', 'assets/FallenAngel.png');
        this.load.image('Genbu', 'assets/Genbu.png');
        this.load.image('Soul', 'assets/Soul.png');
        this.load.image('Ennemi1', 'assets/ennemi1.png');
        
        //d'autres trucs pour le décors
        this.load.image('plafond', 'assets/plafond.png');
        this.load.image('sol', 'assets/sol.png');
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
        this.starFin = this.physics.add.sprite((6*896)-6,100,"star");
        this.starFin.setDisplaySize(30,30);
        this.starFin.setCollideWorldBounds(true);
        this.starFin.setBounce(0);

        //quand le joueur touche une étoile on appelle la fonction ramasserEtoile
        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);

        // LES MONSTRES //
        //haut bas
        this.cruch1 = new cruchMonstre(this,896+224, 100);
        this.cruch2 = new cruchMonstre(this,(2*896)-224, 100);

        //trajectoire cheloue
        this.eF = new testMonstre(this,(4*896)+224, 100);

        //horizontale
        this.razMoquette = new testMonstre2(this,(2*896)+224, 437);

        //Z
        this.Zed = new testMonstre3(this,(5*896)+224, 100);

        //faux cercle
        this.fauxCercle = new circleMonster(this,(3*896)+224, 100);

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.dernierPlan = this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'dernierPlan'
        );
        this.dernierPlan.setOrigin(0,0);
        this.dernierPlan.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra

        //on ajoute une deuxième couche de ciel
        this.secondPlan=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'secondPlan'
        );
        this.secondPlan.setScrollFactor(0);
        this.secondPlan.setOrigin(0,0);
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;

        this.plafond=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            0,
            'plafond'
        );
        this.plafond.setOrigin(0,0);
        this.plafond.setScrollFactor(0);

        //le sol
        this.bas=this.add.tileSprite(
            0,
            417,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sol'
        );
        this.bas.setOrigin(0, 0);
        this.bas.setScrollFactor(0);
        
        //le sol physique
        this.sol = this.physics.add.sprite(0,417,null);
        this.sol.setDisplaySize(4000,30);//taille de l'objet
        this.sol.setOrigin(0,0);//pour positionner plus facilement
        this.sol.body.allowGravity = 0; //la gravité n'a pas d'effet ici
        this.sol.setImmovable(true); //ne bouge pas quand on rentre dedans

        this.physics.add.collider(this.player, this.sol);//le joueur rebondit dessus
        this.physics.add.collider(this.starFin, this.sol);//l'étoile1 rebondit dessus

        //this.physics.add.collider(this.cruch, this.sol);
        //this.physics.add.collider(this.eF, this.sol);
        //this.physics.add.collider(this.razMoquette, this.sol);
        //this.physics.add.collider(this.Zed, this.sol);
        //this.physics.add.collider(this.fauxCercle, this.sol);

        //fait passer les éléments devant le ciel
        this.starFin.setDepth(10);
        this.player.setDepth(10);
        this.bas.setDepth(10);

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
            //le fond se déplace moins vite que la caméra pour donner un effet paralax
            this.dernierPlan.tilePositionX = this.cameras.main.scrollX * 0.4;
            this.dernierPlan.tilePositionY = this.cameras.main.scrollY * 0.15;

            //le second plan se déplace moins vite pour accentuer l'effet
            this.secondPlan.tilePositionX = this.cameras.main.scrollX * 0.3;
            this.secondPlan.tilePositionY = this.cameras.main.scrollY * 0.1;

            //le premier plan se déplace moins vite pour accentuer l'effet
            this.plafond.tilePositionX = this.cameras.main.scrollX * 0.2;
            this.plafond.tilePositionY = this.cameras.main.scrollY * 0.05;

            this.bas.tilePositionX = this.cameras.main.scrollX * 0.2;
            this.bas.tilePositionY = this.cameras.main.scrollY * 0.05;
        }
}