class Niveau1 extends Tableau
{
    preload()
    {
        super.preload();

        //d'autres trucs pour le décors
        this.load.image('secondPlan', 'assets/second-plan.png');
        this.load.image('dernierPlan', 'assets/dernier-plan.png');
        this.load.image('sky-2', 'assets/sky-2.jpg');

        this.load.image('star', 'assets/Coffre.png');
        this.load.image('pixel', 'assets/pixel.png');
        this.load.image('planche', 'assets/planche.png');

        this.load.image('tiles', 'assets/tileSheet_32-32.png');
        this.load.tilemapTiledJSON('map', 'assets/tiledmap/niveau1_32-32.json');
    }

    create()
    {
        super.create();

        let ici = this;

        this.player.on(MyEvents.SAUTE, function(){
            console.log("saut");
        });

        this.player.on(MyEvents.GRIMPE, function(){
            console.log("grimpe");
        });

        //on définit la taille du tableau
        let largeurDuTableau = 281 * 64 * 2;
        let hauteurDuTableau = 47 * 64 * 2;

        // let largeurDuTableau=this.map.widthInPixels;
        // let hauteurDuTableau=this.map.heightInPixels;

        //on gère la caméra
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.1, 0.2, -200, 50);

        this.cameras.main.setZoom(0.75);

        this.initDecor();

        //Player

        const spawnPoint = this.map.findObject("point", obj => obj.name === "Player");

        // this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front");
        this.player.setPosition(spawnPoint.x, spawnPoint.y);

        var part = this.add.particles('player_animes');

        var emmiterPlayer = part.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 300,
            frequence: 500,
            scale: { start: 0.2, end: 0.1 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });

        this.player.on(MyEvents.COUR, function(){
            emmiterPlayer.startFollow(ici.player);
            emmiterPlayer.setLifespan(300);
            emmiterPlayer.setAlpha({ start: 0.05, end: 0.00001});
        });

        this.player.on(MyEvents.STOP, function(){
            setTimeout(function(){
                emmiterPlayer.setLifespan(0);
                emmiterPlayer.setAlpha(0);
                },1);
        });

        //ETOILES

        this.stars = this.physics.add.group({
            allowGravity: false,
            immovable: false,
            bounceY: 0
        });
        this.starsObjects = this.map.getObjectLayer('stars')['objects'];

        this.starsObjects.forEach(starObject => {
            let star = this.stars.create(starObject.x, starObject.y, 'star').setOrigin(0, 1);
        });
        this.physics.add.overlap(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        this.starsFxContainer = this.add.container();
        this.starsFxContainer.x = 16;
        this.starsFxContainer.y = -16;

        this.stars.children.iterate(function (etoile) {
            let particles = ici.add.particles("pixel");
            let emmiter = particles.createEmitter({
                frequency: 10,
                lifespan: 1000,
                quantity: 5,
                x: {min: -64, max: 64},
                y: {min: -64, max: 64},
                tint: [0xFFFF00],
                rotate: {min: 0, max: 360},
                scale: {start: 0.2, end: 0.1},
                alpha: {start: 1, end: 0},
                blendMode: Phaser.BlendModes.ADD,
                speed: 20
            });

            etoile.once(MyEvents.ACTIVE, function () {
                emmiter.startFollow(etoile);
                setTimeout(function(){emmiter.stopFollow();},300);
            });

            ici.starsFxContainer.add(particles);
        });

        //Monstres

        this.monstersContainer = this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('mob')['objects'];

        this.MonstersObjects.forEach(monsterObject => {
            let monster = new Chevalier(this, monsterObject.x, monsterObject.y);
            this.monstersContainer.add(monster);
        });

        //Torches

        this.torchesContainer = this.add.container();
        this.torcheObjects = this.map.getObjectLayer('torches')['objects'];

        this.torcheObjects.forEach(torcheObject => {
            let torche = new Torche(this, torcheObject.x +16, torcheObject.y - 48);
            this.torchesContainer.add(torche);
        });

        //Planches

        this.planches = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY: 0
        });
        this.plancheObjects = this.map.getObjectLayer('planches')['objects'];

        this.plancheObjects.forEach(plancheObjects => {
            let planche = new Planche(
                this,
                plancheObjects.x,
                plancheObjects.y - 20,
                'planche',
            ).setOrigin(0, 1);
            this.planches.add(planche);

            this.physics.add.overlap(this.player, planche, function() {
                setTimeout(function(){
                        planche.fall();
                    },300);
            });
        });
        this.physics.add.collider(this.player, this.planches);


        //TODO particules + destruction/chute au bout de x secondes

        //Les Checkpoints

        this.checkPointsObjects = this.map.getObjectLayer('ckps')['objects'];
        this.checkPointsObjects.forEach(checkPointsObject => {
            let ckp = new checkPoint(
                this,
                checkPointsObject.x,
                checkPointsObject.y - 8,
                'pixel',
                checkPointsObject.properties[0].value
            );
            this.physics.add.overlap(this.player, ckp, function()
            {
                ckp.savePos();
            });

            let playerPos = ckp.loadPos();

            if(playerPos)
            {
                ici.player.setPosition(playerPos.x, playerPos.y - 64);
            }
            //console.log(playerPos);
        })

        //Les event

        this.eventCam = this.map.getObjectLayer('event camera')['objects'];
        this.eventCam.forEach(eventCam => {
            let eventC = new EventCam(
                this,
                ici.player,
                eventCam.x,
                eventCam.y - 10,
                eventCam.properties[0].value
            );
            this.physics.add.overlap(this.player, eventC, function()
            {
                console.log("contact")
                eventC.change();
            });
        })

        this.initProfondeur();
    }

    /**
     * Fonction initialisant les éléments du background et les platformes
     */
    initDecor()
    {
        //TODO mettre en place le décor final

        this.sky = this.add.tileSprite(
            -192,
            -128,
            this.sys.canvas.width * 2,
            this.sys.canvas.height * 2,
            'sky-2'
        );
        this.sky.setOrigin(0, 0);
        this.sky.setScrollFactor(0);

        this.dernierPlan = this.add.tileSprite(
            -192,
            -128,
            this.sys.canvas.width * 2,
            this.sys.canvas.height * 2,
            'dernierPlan'
        );
        this.dernierPlan.setOrigin(0, 0);
        this.dernierPlan.setScrollFactor(0);

        //on ajoute une deuxième couche de ciel
        this.secondPlan = this.add.tileSprite(
            -192,
            -128,
            this.sys.canvas.width * 2,
            this.sys.canvas.height * 2,
            'secondPlan'
        );
        this.secondPlan.setScrollFactor(0);
        this.secondPlan.setOrigin(0, 0);

        //TILED

        this.map = this.make.tilemap({key: 'map'});
        this.tileset = this.map.addTilesetImage('tileSheet_32-32', 'tiles');

        this.platforms = this.map.createLayer('level', this.tileset, 0, 0);
        this.devant = this.map.createLayer('devant', this.tileset, 0, 0);

        this.platforms.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.player, this.platforms);

    }

    /**
     * Fonction pour définir la profondeur à laquelle se trouve chaque élément
     */
    initProfondeur()
    {
        let z = 1000; //niveau Z qui a chaque fois est décrémenté.
        //devant
        this.devant.setDepth(z--);
        this.blood.setDepth(z--);
        this.platforms.setDepth(z--);
        this.planches.setDepth(z--);

        this.player.setDepth(z--);

        this.monstersContainer.setDepth(z--);
        this.stars.setDepth(z--);

        this.starsFxContainer.setDepth(z--);
        this.torchesContainer.setDepth(z--);
        //derrière
    }

    update()
    {
        super.update();
        // le fond se déplace moins vite que la caméra pour donner un effet paralax
        this.dernierPlan.tilePositionX = this.cameras.main.scrollX * 0.1;
        this.dernierPlan.tilePositionY = this.cameras.main.scrollY * 0.1;

        //le second plan se déplace moins vite pour accentuer l'effet
        this.secondPlan.tilePositionX = this.cameras.main.scrollX * 0.15;
        this.secondPlan.tilePositionY = this.cameras.main.scrollY * 0.05;

        //le premier plan se déplace moins vite pour accentuer l'effet
        // this.plafond.tilePositionX = this.cameras.main.scrollX * 0.2;
        // this.plafond.tilePositionY = this.cameras.main.scrollY * 0.1;
    }

}
