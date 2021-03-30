class Niveau2 extends Tableau
{
    preload()
    {
        super.preload();

        //d'autres trucs pour le décors
        this.load.image('plafond', 'assets/plafond.png');
        this.load.image('secondPlan', 'assets/second-plan.png');
        this.load.image('dernierPlan', 'assets/dernier-plan.png');
        this.load.image('sky-2', 'assets/sky-2.jpg');

        this.load.image('star', 'assets/Coffre.png');
        this.load.image('pixel', 'assets/pixel.png');

        this.load.image('tiles', 'assets/tileSheet.png');
        this.load.tilemapTiledJSON('map', 'assets/tiledmap/testTiled.json');
    }

    create()
    {
        super.create();

        let ici = this;

        //on définit la taille du tableau
        let largeurDuTableau = 896 * 2;
        let hauteurDuTableau = 448 * 2;

        // let largeurDuTableau=this.map.widthInPixels;
        // let hauteurDuTableau=this.map.heightInPixels;

        //on gère la caméra
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        this.initDecor();

        //ETOILES
        /**
         *
         * @type {Phaser.Physics.Arcade.Group}
         */
        this.stars = this.physics.add.group({
            allowGravity: false,
            immovable: false,
            bounceY: 0
        });
        this.starsObjects = this.map.getObjectLayer('stars')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.starsObjects.forEach(starObject => {
            console.log(starObject);
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let star = this.stars.create(starObject.x, starObject.y, 'star').setOrigin(0, 1);
        });
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        const spawnPoint = this.map.findObject("point", obj => obj.name === "Player");

        //Joueur au spawn
        // this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front");
        this.player.setPosition(spawnPoint.x, spawnPoint.y);

        //Particules étoiles

        this.starsFxContainer = this.add.container();
        this.starsFxContainer.x = 16;
        this.starsFxContainer.y = -16;
        this.stars.children.iterate(function (etoile) {
            let particles = ici.add.particles("pixel");
            let emmiter = particles.createEmitter({
                frequency: 100,
                lifespan: 2000,
                quantity: 5,
                x: {min: -32, max: 32},
                y: {min: -32, max: 32},
                tint: [0xFF0000, 0x00FF00, 0x0000FF, 0x8800FF],
                rotate: {min: 0, max: 360},
                scale: {start: 0.2, end: 0.1},
                alpha: {start: 1, end: 0},
                blendMode: Phaser.BlendModes.ADD,
                speed: 40
            });
            let immiter = particles.createEmitter({
                frequency: 100,
                lifespan: 6000,
                quantity: 2,
                x: {min: 32, max: 32},
                y: {min: -32, max: -32},
                tint: [0xFF0000, 0x00FF00, 0x0000FF, 0x8800FF],
                rotate: {min: 0, max: 180},
                scale: {start: 0.3, end: 0.1},
                alpha: {start: 1, end: 0},
                blendMode: Phaser.BlendModes.HARD_LIGHT,
                speed: 40
            })
            etoile.on("disabled", function () {
                emmiter.on = false;
                immiter.on = false;
            })
            emmiter.startFollow(etoile);
            immiter.startFollow(etoile);
            ici.starsFxContainer.add(particles);

        });

        //MONSTRES

        this.monstersContainer = this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('mob_crush')['objects'];
        this.MonstersObjects.forEach(monsterObject => {
            let monster = new Chevalier(this, monsterObject.x, monsterObject.y);
            this.monstersContainer.add(monster);
        });

        //TORCHES

        this.torchesContainer = this.add.container();
        this.torcheObjects = this.map.getObjectLayer('torches')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        this.torcheObjects.forEach(torcheObject => {
            let torche = new Torche(this, torcheObject.x, torcheObject.y - 30);
            this.torchesContainer.add(torche);
        });

        //Checkpoints

        let playerPos;
        this.checkPoint = this.physics.add.group({
            allowGravity: false,
            immovable:false
        });

        this.checkPointsObjects = this.map.getObjectLayer('ckps')['objects'];
        this.checkPointsObjects.forEach(checkPointsObject => {
            console.log(checkPointsObject.properties[0].value);
            let cP = new checkPoint(
                this,
                checkPointsObject.x,
                checkPointsObject.y,
                'pixel',
                checkPointsObject.properties[0].value
            );
            this.physics.add.overlap(this.player, cP, function()
            {
                cP.savePos();
            });

            let playerPos = cP.loadPos();

            if(playerPos)
            {
                ici.player.setPosition(playerPos.x, playerPos.y - 64);
            }
            console.log(playerPos);

        })

        this.initProfondeur();
    }

    /*optimizeDisplay()
    {
        //return;
        let world = this.cameras.main.worldView; // le rectangle de la caméra, (les coordonnées de la zone visible)

        // on va activer / désactiver les particules de lave
        for (let particule of this.torchesContainer.getAll())
        { // parcours toutes les particules de lave
            if (Phaser.Geom.Rectangle.Overlaps(world, particule.rectangle))
            {
                //si le rectangle de la particule est dans le rectangle de la caméra
                if (!particule.visible)
                {
                    //on active les particules
                    particule.resume();
                    particule.visible = true;
                }
            }
            else {
                //si le rectangle de la particule n'est PAS dans le rectangle de la caméra
                if (particule.visible)
                {
                    //on désactive les particules
                    particule.pause();
                    particule.visible = false;
                }
            }
        }
    }*/

    initDecor()
    {
        this.sky = this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky.setOrigin(0, 0);
        this.sky.setScrollFactor(0);

        this.dernierPlan = this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'dernierPlan'
        );
        this.dernierPlan.setOrigin(0, 0);
        this.dernierPlan.setScrollFactor(0);

        //on ajoute une deuxième couche de ciel
        this.secondPlan = this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'secondPlan'
        );
        this.secondPlan.setScrollFactor(0);
        this.secondPlan.setOrigin(0, 0);

        this.plafond = this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            0,
            'plafond'
        );
        this.plafond.setOrigin(0, 0);
        this.plafond.setScrollFactor(0);

        //TILED

        this.map = this.make.tilemap({key: 'map'});
        this.tileset = this.map.addTilesetImage('tileSheet', 'tiles');

        this.platforms = this.map.createLayer('level', this.tileset, 0, 0);

        this.platforms.setCollisionByProperty({collides: true});
        //this.platforms.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.platforms);

    }

    initProfondeur()
    {
        let z = 1000; //niveau Z qui a chaque fois est décrémenté.
        //devant
        this.blood.setDepth(z--);
        this.platforms.setDepth(z--);

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
        this.plafond.tilePositionX = this.cameras.main.scrollX * 0.2;
        this.plafond.tilePositionY = this.cameras.main.scrollY * 0.1;

        //optimisation
        //teste si la caméra a bougé
        /*let actualPosition = JSON.stringify(this.cameras.main.worldView);
        if (
            !this.previousPosition
            || this.previousPosition !== actualPosition
        ) {
            this.previousPosition = actualPosition;
            this.optimizeDisplay();
        }*/
    }

}