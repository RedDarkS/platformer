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

        //des petits sons pour le lol
        this.load.audio('hanna_lapin', 'assets/son/hanna_lapin.mp3');
        
        //d'autres trucs pour le décors
        this.load.image('ground', 'assets/platform.png');
        this.load.image('sky-2', 'assets/sky-2.jpg');
    }
    create() 
    {
        super.create();

        this.hannaLapin = this.sound.add("hanna_lapin");

        //on définit la taille du tableau
        let largeurDuTableau  = 4000;
        let hauteurDuTableau = 600;

        //on gère la caméra
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        //des étoiles, une en fait...
        this.star1 = this.physics.add.sprite(900,100,"star");
        this.star1.setDisplaySize(40,40);
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0);

        //quand le joueur touche une étoile on appelle la fonction ramasserEtoile
        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);

        //haut bas
        this.cruch = new cruchMonstre(this,400,100);

        //trajectoire cheloue
        this.eF = new testMonstre(this,300,100);

        //horizontale
        this.razMoquette = new testMonstre2(this,500,463);

        //Z
        this.Zed = new testMonstre3(this,600,100);

        //faux cercle
        this.fauxCercle = new circleMonster(this,500,100);

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky = this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.alpha=0.2;
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;


        //fait passer les éléments devant le ciel
        this.star1.setDepth(10);
        this.player.setDepth(10);

        this.cruch.setDepth(10);
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