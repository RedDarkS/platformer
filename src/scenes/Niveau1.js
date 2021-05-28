class Niveau1 extends Tableau
{
    preload()
    {
        super.preload();

        //d'autres trucs pour le décors
        this.load.image('sky-2', 'assets/sky-2.jpg');

        this.load.image('star', 'assets/Coffre.png');
        this.load.image('pixel', 'assets/pixel.png');
        this.load.image('particD', 'assets/part_course_droite.png');
        this.load.image('particG', 'assets/part_course_gauche.png');

        this.load.image('planche', 'assets/planche.png');
        this.load.image('brisable', 'assets/brisable.png');
        this.load.image('priseD', 'assets/prise_droite.png');
        this.load.image('priseG', 'assets/prise_gauche.png');

        this.load.image('tiles', ['assets/tileSheet_32-32.png','assets/NormalMap.png']);
        // this.load.image('tiles', 'assets/tileSheet_32-32.png');
        this.load.tilemapTiledJSON('map', 'assets/tiledmap/niveau1_32-32.json');
    }

    create()
    {
        super.create();

        let ici = this;

        // this.player.on(MyEvents.SAUTE, function(){
        //     ici.jump.play();
        // });

        // this.player.once(MyEvents.GRIMPE, function(){
        //
        // });

        this.player.once(MyEvents.AIGLE, function()
        {
            ici.aigle.play(ici.aigleConfig);
        });

        //on définit la taille du tableau
        let largeurDuTableau = 281 * 64 * 2;
        let hauteurDuTableau = 47 * 64 * 2;

        //on gère la caméra
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.1, 0.2, -200, 50);

        this.cameras.main.setZoom(0.75);

        //ambiance atmosphérique

        this.lights.enable();
        this.lights.setAmbientColor(0x777777);

        this.initDecor();

        //Player

        const spawnPoint = this.map.findObject("point", obj => obj.name === "Player");

        // this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front");
        this.player.setPosition(spawnPoint.x, spawnPoint.y);

        var part = this.add.particles('particD');

        var emmiterPlayerD = part.createEmitter({
            frequency: 50,
            lifespan: 300,
            quantity: 1,
            angle: { min: -20, max: 10 },
            speed: 2,
            scale: { start: 0.2, end: 0.05 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });

        var part2 = this.add.particles('particG');

        var emmiterPlayerG = part2.createEmitter({
            frequency: 50,
            lifespan: 300,
            quantity: 1,
            angle: { min: -20, max: 10 },
            speed: 2,
            scale: { start: 0.2, end: 0.05 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });

        this.player.on(MyEvents.COURD, function(){
            emmiterPlayerD.startFollow(ici.player);
            emmiterPlayerD.setLifespan(300);
            emmiterPlayerD.setAlpha({ start: 0.05, end: 0.00001});

            ici.player.isEsc = false;
        });

        this.player.on(MyEvents.COURG, function(){
            emmiterPlayerG.startFollow(ici.player);
            emmiterPlayerG.setLifespan(300);
            emmiterPlayerG.setAlpha({ start: 0.05, end: 0.00001});

            ici.player.isEsc = false;
        });

        this.player.on(MyEvents.STOP, function(){
            setTimeout(function(){
                emmiterPlayerD.setLifespan(0);
                emmiterPlayerD.setAlpha(0);

                emmiterPlayerG.setLifespan(0);
                emmiterPlayerG.setAlpha(0);

                ici.player.isEsc = false;
                },1);
        });

        //ETOILES

        this.starList = [];

        this.starsFxContainer = this.add.container();
        this.starsFxContainer.x = 16;
        this.starsFxContainer.y = -16;

        this.stars = this.physics.add.group({
            allowGravity: false,
            immovable: false,
            bounceY: 0
        });
        this.starsObjects = this.map.getObjectLayer('stars')['objects'];

        this.starsObjects.forEach(starObject =>
        {
            let star = new Collectible(
                ici,
                starObject.x,
                starObject.y,
                'star'
            ).setOrigin(0, 1);

            this.physics.add.overlap(this.player, star, function()
            {
                setTimeout(function()
                {
                    star.pick();
                    ici.collect.play(ici.aigleConfig);
                },20);
            });

            star.once(MyEvents.ACTIVE, function()
            {
                star.halo.destroy();
                star.flameche.on = false;
                star.disableBody(true, true);
                setTimeout(function()
                {
                    star.emmiter.on = false;
                },300);
            });

            this.starList.push(star);
            this.stars.add(star);
        });
        this.physics.add.overlap(this.stars, this.platforms);

        //Chevaliers

        this.monstersContainer = this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('chevalier')['objects'];

        this.MonstersObjects.forEach(monsterObject =>
        {
            let monster = new Chevalier(this, monsterObject.x, monsterObject.y);
            this.monstersContainer.add(monster);

            this.physics.add.overlap(this.player, monster, this.hitMonster);
        });

        //Markus

        this.markusContainer = this.add.container();
        this.markusObjects = this.map.getObjectLayer('boss')['objects'];

        this.markusObjects.forEach(markusObjects =>
        {
            let markus = new Markus(
                this,
                markusObjects.x,
                markusObjects.y - 96
            );
            this.markusContainer.add(markus);
            this.physics.add.collider(markus, this.platforms);

            this.physics.add.overlap(this.player, markus, this.hitMonster);
        });

        //Pic

        this.picContainer = this.add.container();
        this.picObjects = this.map.getObjectLayer('pic')['objects'];

        this.picObjects.forEach(picObjects =>
        {
            let pic = new Pic(
                this,
                picObjects.x + 16,
                picObjects.y,
            );
            this.picContainer.add(pic);

            this.physics.add.overlap(this.player, pic, this.hitPic);
        });

        //Torches
        this.torcheList = [];

        this.torchesContainer = this.add.container();
        this.torcheObjects = this.map.getObjectLayer('torches')['objects'];

        this.torcheObjects.forEach(torcheObject =>
        {
            let torche = new Torche(
                this,
                torcheObject.x +16,
                torcheObject.y - 48
            );

            this.torchesContainer.add(torche);
            this.torcheList.push(torche);
        });

        //Planches
        this.plancheList = [];

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
                plancheObjects.x,
                plancheObjects.y
            ).setOrigin(0, 1);

            this.planches.add(planche);
            this.plancheList.push(planche);

            this.physics.add.overlap(this.player, planche, function()
            {
                if(ici.planche.isPlaying !== true)
                {
                    ici.planche.play();
                }
                setTimeout(function()
                {
                        planche.fall();
                    },750);
            });
        });
        this.physics.add.collider(this.player, this.planches);

        //brisables

        this.brisableList = [];

        this.brisables = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY: 0
        });
        this.brisableObject = this.map.getObjectLayer('brisables')['objects'];

        this.brisableObject.forEach(brisableObject => {
            let bri = new Brisable(
                this,
                brisableObject.x + 10,
                brisableObject.y,
                'brisable',
            ).setOrigin(0, 1);
            this.brisables.add(bri);
            this.brisableList.push(bri);

            this.physics.add.overlap(this.player, bri, function()
            {
                if(ici.brisable.isPlaying !== true)
                {
                    ici.brisable.play();
                }
                bri.break();
            });

            bri.once(MyEvents.BREAK, function()
            {
                bri.disableBody(true, true);
                setTimeout(function()
                {
                    bri.mimiter.on = false;
                },2000);
            });
        });
        this.physics.add.collider(this.player, this.brisables);

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

            this.playerPos = ckp.loadPos();

            if(this.playerPos)
            {
                ici.player.setPosition(this.playerPos.x, this.playerPos.y - 64);
            }

            // ckp.setVisible(false);
        })

        //Cam

        this.eventCam = this.map.getObjectLayer('event camera')['objects'];
        this.eventCam.forEach(eventCamObject => {
            let eventC = new EventCam(
                this,
                eventCamObject.x,
                eventCamObject.y - 10,
                eventCamObject.properties[0].value,
                'pixel'
            );
            this.physics.add.overlap(this.player, eventC, function()
            {
                eventC.change();
            });
            eventC.once(MyEvents.EXCENTREE, function(){
                ici.cameras.main.setFollowOffset(-200,50);
            });
            eventC.once(MyEvents.CENTREE, function(){
                ici.cameras.main.setFollowOffset(0,50);
            });

            eventC.setVisible(false);
        })

        //Ambiance

        this.eventAmb = this.map.getObjectLayer('ambiance')['objects'];
        this.eventAmb.forEach(eventAmbObject => {
            let eventA = new EventAmbiance(
                this,
                eventAmbObject.x,
                eventAmbObject.y - 10,
                eventAmbObject.properties[0].value,
                'pixel'
            );
            this.physics.add.overlap(this.player, eventA, function()
            {
                eventA.change();
            });
            eventA.on(MyEvents.EXTERIEUR, function()
            {
                ici.lights.setAmbientColor(0xBBBBBB);
            });
            eventA.on(MyEvents.INTERIEUR, function()
            {
                ici.lights.setAmbientColor(0x777777);
            });

            eventA.setVisible(false);
        })

        //rectangles

        this.rectList = [];

        this.recContainer = this.add.container();
        this.recObjects = this.map.getObjectLayer('rectangles')['objects'];

        this.recObjects.forEach(recObjects =>
        {
            let rec = new Rectangle(
                ici,
                recObjects.x,
                recObjects.y,
                recObjects.width,
                recObjects.height
            ).setOrigin(0,0);

            this.recContainer.add(rec);
            this.rectList.push(rec);

            this.physics.add.overlap(this.player, rec, function()
            {
                rec.isActive = true;
            });
        });

        //prise escalade Droite

        this.priseDContainer = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY: 0
        });
        this.priseDObject = this.map.getObjectLayer('esc droite')['objects'];

        this.priseDObject.forEach(priseDObject =>
        {
            let prise = new PriseEsc(
                ici,
                priseDObject.x,
                priseDObject.y - 32,
                "priseD"
            ).setOrigin(0,0);

            this.priseDContainer.add(prise);

            this.physics.add.overlap(this.player, prise, function()
            {
                ici.player.isEsc = true;
            });
        });

        //prise escalade Gauche

        this.priseGContainer = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY: 0
        });
        this.priseGObject = this.map.getObjectLayer('esc gauche')['objects'];

        this.priseGObject.forEach(priseGObject =>
        {
            let prise = new PriseEsc(
                ici,
                priseGObject.x + 32,
                priseGObject.y - 32,
                "priseG"
            ).setOrigin(0,0);

            this.priseGContainer.add(prise);

            this.physics.add.overlap(this.player, prise, function()
            {
                ici.player.isEsc = true;
            });
        });

        this.initProfondeur();
    }

    /**
     * Fonction initialisant les éléments du background et les platformes
     */
    initDecor()
    {
        //TODO mettre en place le décor final

        this.sky = this.add.sprite(-150, -95,  'sky-2');
        this.sky.setOrigin(0, 0);
        this.sky.displayHeight = this.sky.height*0.55;
        this.sky.displayWidth = this.sky.width*0.65;
        this.sky.setScrollFactor(0, 0);

        // this.dernierPlan = this.add.tileSprite(
        //     -192,
        //     -128,
        //     this.sys.canvas.width * 2,
        //     this.sys.canvas.height * 2,
        //     'dernierPlan'
        // );
        // this.dernierPlan.setOrigin(0, 0);
        // this.dernierPlan.setScrollFactor(0);

        // this.secondPlan = this.add.tileSprite(
        //     -192,
        //     -128,
        //     this.sys.canvas.width * 2,
        //     this.sys.canvas.height * 2,
        //     'secondPlan'
        // );
        // this.secondPlan.setScrollFactor(0);
        // this.secondPlan.setOrigin(0, 0);

        //TILED

        this.map = this.make.tilemap({key: 'map'});
        this.tileset = this.map.addTilesetImage('tileSheet_32-32', 'tiles');

        this.doubleDerriere = this.map.createLayer('double derriere', this.tileset, 0, 0).setPipeline('Light2D');
        this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0).setPipeline('Light2D');
        this.platforms = this.map.createLayer('level', this.tileset, 0, 0).setPipeline('Light2D');
        this.devant = this.map.createLayer('devant', this.tileset, 0, 0).setPipeline('Light2D');
        this.nature = this.map.createLayer('nature', this.tileset, 0, 0).setPipeline('Light2D');

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
        this.nature.setDepth(z--);
        this.devant.setDepth(z--);

        this.blood.setDepth(z--);

        this.player.setDepth(z--);

        this.priseDContainer.setDepth(z--);
        this.priseGContainer.setDepth(z--);

        this.planches.setDepth(z--);
        this.brisables.setDepth(z--);
        this.picContainer.setDepth(z--);
        this.platforms.setDepth(z--);

        this.monstersContainer.setDepth(z--);
        this.markusContainer.setDepth(z--);

        this.stars.setDepth(z--);
        this.starsFxContainer.setDepth(z--);

        this.torchesContainer.setDepth(z--);
        this.recContainer.setDepth(z--);

        // this.derriere.setDepth(z--);
        // this.doubleDerriere.setDepth(z--);

        //derrière
    }

    optimizeDisplay()
    {
        this.rectList.forEach(rec =>
        {
            if(rec.isActive)
            {
                if (Phaser.Geom.Rectangle.Overlaps(rec.getBounds(), this.player.getBounds() ))//le joueur est en contact avec le rectancle
                {
                    this.torcheList.forEach(torch =>
                    {
                        if (Phaser.Geom.Rectangle.Overlaps(rec.getBounds(), torch.getBounds() ))
                        {
                            torch.isActive = true;
                        }
                    });
                    this.starList.forEach(star =>
                    {
                        if (Phaser.Geom.Rectangle.Overlaps(rec.getBounds(), star.getBounds() ))
                        {
                            star.isActive = true;
                        }
                    });
                    this.plancheList.forEach(planche =>
                    {
                        if (Phaser.Geom.Rectangle.Overlaps(rec.getBounds(), planche.getBounds() ))
                        {
                            planche.isActive = true;
                        }
                    });
                    this.brisableList.forEach(bri =>
                    {
                        if (Phaser.Geom.Rectangle.Overlaps(rec.getBounds(), bri.getBounds() ))
                        {
                            bri.isActive = true;
                        }
                    });
                }
                else// le joueur n'est pas en contact avec le rectangle
                {
                    this.torcheList.forEach(torch =>
                    {
                        if (Phaser.Geom.Rectangle.Overlaps(rec.getBounds(), torch.getBounds() ))
                        {
                            torch.isActive = false;
                        }
                    });
                    this.starList.forEach(star =>
                    {
                        if (Phaser.Geom.Rectangle.Overlaps(rec.getBounds(), star.getBounds() ))
                        {
                            star.isActive = false;
                        }
                    });
                    this.plancheList.forEach(planche =>
                    {
                        if (Phaser.Geom.Rectangle.Overlaps(rec.getBounds(), planche.getBounds() ))
                        {
                            planche.isActive = false;
                        }
                    });
                    this.brisableList.forEach(bri =>
                    {
                        if (Phaser.Geom.Rectangle.Overlaps(rec.getBounds(), bri.getBounds() ))
                        {
                            bri.isActive = false;
                        }
                    });

                    rec.isActive = false;
                }
            }
        });

    }

    update()
    {
        super.update();
        // le fond se déplace moins vite que la caméra pour donner un effet paralax
        // this.sky.tilePositionX = this.cameras.main.scrollX * 0.1;
        this.sky.tilePositionY = this.cameras.main.scrollY * 0.1;

        //le second plan se déplace moins vite pour accentuer l'effet
        this.derriere.tilePositionX = this.cameras.main.scrollX * 0.15;
        this.derriere.tilePositionY = this.cameras.main.scrollY * 0.1;

        //le premier plan se déplace moins vite pour accentuer l'effet
        // this.plafond.tilePositionX = this.cameras.main.scrollX * 0.2;
        // this.plafond.tilePositionY = this.cameras.main.scrollY * 0.1;

        for (let i = 0; i < this.torcheList.length; i++)
        {
            this.variaLight(this.torcheList[i].light);
        }

        if(this.player.x > 22912)//&& this.player.y > 1152
        {
            this.player.emit(MyEvents.AIGLE);
        }

        this.player.light.x = this.player.x;
        this.player.light.y = this.player.y;

        this.optimizeDisplay();


    }

}
