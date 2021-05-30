/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene
{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) 
    {
        super(key);
    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload()
    {
        //TODO import des différents sprites
        //SPRITES
        this.load.image('star', 'assets/coeur.png');
        this.load.image('blood', 'assets/blood.png');

        //SPRITES ENTITES
        this.load.spritesheet('player_animes','assets/animes.png', {frameWidth: 400, frameHeight: 345});
        this.load.spritesheet('markus_animes','assets/anime Markus.png', {frameWidth: 1064, frameHeight: 300});

        this.load.spritesheet('torche', 'assets/torche-sheet.png', {frameHeight : 64, frameWidth : 64});
        this.load.image('Ennemi1', 'assets/ennemi1.png');
        this.load.image('pic', 'assets/pic.png');

        //des petits sons pour le lol

        //TODO import et gestion des sons

        this.load.audio('aigle', 'assets/son/cri-aigle-royal.wav');
        this.load.audio('feu', 'assets/son/sf_feu_cheminee.mp3');
        this.load.audio('collect', 'assets/son/fairy-arcade-sparkle.wav');
        this.load.audio('mortEnnemy', 'assets/son/human-fighter-pain-scream.wav');
        this.load.audio('planche', 'assets/son/fast-creaking-floorboard.wav');
        this.load.audio('brisable', 'assets/son/wood-plank-break.wav');
        this.load.audio('recharging', 'assets/son/player-recharging.wav');
        this.load.audio('run', 'assets/son/run.wav');
    }

    create()
    {
        Tableau.current=this;

        this.isMobile=this.game.device.os.android || this.game.device.os.iOS;

        this.sys.scene.scale.lockOrientation("landscape")
        // console.log("On est sur "+this.constructor.name+" / "+this.scene.key);

        //set up musique

        this.aigle = this.sound.add('aigle');
        this.mortEnnemy = this.sound.add('mortEnnemy');
        this.collect = this.sound.add('collect');
        this.planche = this.sound.add('planche');
        this.brisable = this.sound.add('brisable');
        this.recharging = this.sound.add('recharging');
        this.run = this.sound.add('run');

        this.aigleConfig = {
            mute : false,
            volume : 0.4,
            rate : 1,
            detune : 0,
            seek : 0,
            loop : false,
            delay : 0
        }
        this.runConfig = {
            mute : false,
            volume : 0.05,
            rate : 1,
            detune : 0,
            seek : 0,
            loop : true,
            delay : 0
        }

        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        // this.sky = this.add.image(0, 0, 'sky').setOrigin(0,0);
        // this.sky.displayWidth = 14*64;
        // this.sky.setScrollFactor(0,0);

        /**
         * Le joueur
         * @type {Player}
         */
        this.player=new Player(this,10,(448*2)-128);

        this.player.setMaxVelocity(600, 800);

        this.blood = this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood")
        this.blood.displayWidth = 64;
        this.blood.displayHeight = 64;
        this.blood.visible = false;

    }
    update()
    {
        super.update();
        this.player.move();
    }

    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    saigne(object, onComplete)
    {
        let me=this;
        me.blood.visible=true;

        me.blood.setDepth(10);

        me.blood.rotation = Phaser.Math.Between(0,6);
        me.blood.x=object.x;
        me.blood.y=object.y;
        me.tweens.add({
            targets:me.blood,
            duration:200,
            displayHeight:
            {
                from:40,
                to:70,
            },
            displayWidth:{
                from:40,
                to:70,
            },
            onComplete: function ()
            {
                me.blood.visible=false;
                onComplete();
            }
        })
    }

    ramasserEtoile (player, star)
    {
        star.disableBody(true, true);

        ui.gagne(1);

        //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
        let totalActive = 0;
        for(let child of this.children.getChildren())
        {
            if(child.texture && child.texture.key === "star")
            {
                if(child.active)
                {
                    totalActive++;
                }
            }
        }
        // if(totalActive === 0)
        // {
        //     this.win();
        // }
    }

    hitPic ()
    {
        // this.physics.pause();
        Tableau.current.cameras.main.fadeOut(2000,0,0,0);
        Tableau.current.player.setTint(0xff0000);
        Tableau.current.scene.restart()
    }

    hitMonster(player, monster)
    {
        let me=this;
        if (monster.isDead !== true) { //si notre monstre n'est pas déjà mort
            if (
                // si le player descend
                player.body.velocity.y > 0
                // et si le bas du player est plus haut que le monstre
                && player.getBounds().bottom < monster.getBounds().top + 30
            ) {
                me.mortEnnemy.play(me.aigleConfig);

                monster.isDead = true; //ok le monstre est mort
                monster.disableBody(true, true);//plus de collisions
                this.saigne(monster, function () {
                    //à la fin de la petite anim...ben il se passe rien :)
                })
            }
            else
            {
                // this.playerDie();
                if(Tableau.current.player.isDead === false)
                {
                    Tableau.current.player.isDead = true;
                    Tableau.current.player.visible = false;
                    //ça saigne...
                    me.saigne(me.player, function ()
                    {
                        //à la fin de la petite anim, on relance le jeu
                        me.blood.visible = false;
                        me.player.anims.play('turn');
                        Tableau.current.player.isDead = false;
                        me.scene.restart();
                    })
                }
            }

        }

    }

    playerDie()
    {
        let me=this;
        if(me.player.isDead === false)
        {
            me.player.isDead = true;
            me.player.visible = false;
            //ça saigne...
            me.saigne(me.player, function () {
                //à la fin de la petite anim, on relance le jeu
                me.blood.visible = false;
                me.player.anims.play('turn');
                me.player.isDead = false;
                me.scene.restart();
            })
        }
    }

    variaLight(light)
    {
        light.intensity = light.intensity + Phaser.Math.FloatBetween(-0.1, 0.08);
        light.intensity = Phaser.Math.Clamp(light.intensity, 0.2, 0.4);
    }

    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy()
    {
        this.player.stop();
        this.scene.stop();
    }

    //TODO condition de victoire
    /**
     * Quand on a gagné
     */
    win()
    {
        Tableau.suivant();
    }

    /**
     * Va au tableau suivant
     */
    static suivant()
    {
        let ceSeraLaSuivante = false;
        let nextScene = null;

        if(Tableau.current)
        {
            for(let sc of game.scene.scenes)
            {
                if(sc.scene.key !== "ui")
                {
                    if(!nextScene)
                    {
                        if(ceSeraLaSuivante)
                        {
                            nextScene=sc;
                        }
                        if(sc.scene.key === Tableau.current.scene.key)
                        {
                            ceSeraLaSuivante=true;
                        }
                    }
                }
            }
        }
        if(!nextScene)
        {
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }

    static goTableau(tableau)
    {
        if(Tableau.current)
        {
            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }

    recharger()
    {
        localStorage.setItem('cP', null);
        this.scene.restart();
    }
}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current = null;