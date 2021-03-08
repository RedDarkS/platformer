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
        let largeurDuTableau  = 896*2;
        let hauteurDuTableau = 448*2;

        //on gère la caméra
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        this.initDecor();
        this.initProfondeur();

        //ETOILES

        // c'est un peu plus compliqué, mais ça permet de maîtriser plus de choses...
        this.stars = this.physics.add.group({
            allowGravity: true,
            immovable: false,
            bounceY:0
        });
        this.starsObjects = this.map.getObjectLayer('stars')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.starsObjects.forEach(starObject => {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let star = this.stars.create(starObject.x+32, starObject.y-64, 'star');
            this.physics.add.collider(this.stars, this.platforms);
            this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        });

        //MONSTRES

        let monstersContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('mob_crush')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new cruchMonstre(this,monsterObject.x+256,monsterObject.y);
            monstersContainer.add(monster);
        });
        
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
        
        //TILED

        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('tileSheet', 'tiles');

        this.platforms = this.map.createStaticLayer('level', this.tileset, 0, 0);

        this.platforms.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.platforms);
    }

    initProfondeur()
    {
        this.player.setDepth(10);
    }
}