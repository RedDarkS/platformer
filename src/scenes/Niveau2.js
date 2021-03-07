class Niveau2 extends Tableau
{
    preload() 
    {
        super.preload();
        
        //d'autres trucs pour le décors
        this.load.image('plafond', 'assets/plafond.png');
        this.load.image('secondPlan', 'assets/second-plan.png');
        this.load.image('dernierPlan', 'assets/dernier-plan.png');

        this.load.image('tiles', 'assets/tileSheet.png');
        this.load.tilemapTiledJSON('map', 'assets/tiledmap/testTiled.json');
    }
    create() 
    {
        super.create();

        //on définit la taille du tableau
        let largeurDuTableau  = 896;
        let hauteurDuTableau = 448;

        this.initDecor();
        this.initProfondeur();

        //des étoiles, une en fait...
        this.starFin = this.physics.add.sprite((896)-6,100,"star");
        this.starFin.setDisplaySize(60,60);
        this.starFin.setCollideWorldBounds(true);
        this.starFin.setBounce(0);

        //quand le joueur touche une étoile on appelle la fonction ramasserEtoile
        this.physics.add.overlap(this.player, this.starFin, this.ramasserEtoile, null, this);

        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('tileSheet', 'tiles');
        this.platforms = this.map.createStaticLayer('level', this.tileset, 0, 0);
        this.platforms.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.starFin, this.platforms);
        
    }

    update()
    {
         super.update();
        // //le fond se déplace moins vite que la caméra pour donner un effet paralax
        // this.dernierPlan.tilePositionX = this.cameras.main.scrollX * 0.4;
        // this.dernierPlan.tilePositionY = this.cameras.main.scrollY * 0.15;

        //le second plan se déplace moins vite pour accentuer l'effet
        this.secondPlan.tilePositionX = this.cameras.main.scrollX * 0.2;
        this.secondPlan.tilePositionY = this.cameras.main.scrollY * 0.1;

        //le premier plan se déplace moins vite pour accentuer l'effet
        this.plafond.tilePositionX = this.cameras.main.scrollX * 0.3;
        this.plafond.tilePositionY = this.cameras.main.scrollY * 0.2;
    }

    initDecor()
    {
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
    }

    initProfondeur()
    {
        this.player.setDepth(10);
    }
}