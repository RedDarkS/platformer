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
        this.load.image('rect', 'assets/skin_rec.png');

        //SPRITES ENTITES
        this.load.spritesheet('player_animes','assets/animes.png', {frameWidth: 400, frameHeight: 345});

        this.load.spritesheet('torche', 'assets/torche-sheet.png', {frameHeight : 64, frameWidth : 64});
        this.load.image('Ennemi1', 'assets/ennemi1.png');

        //des petits sons pour le lol

        //TODO import et gestion des sons

        this.load.audio('mort', 'assets/son/mort.wav');
    }

    create()
    {
        Tableau.current=this;

        this.isMobile=this.game.device.os.android || this.game.device.os.iOS;

        this.sys.scene.scale.lockOrientation("landscape")
        console.log("On est sur "+this.constructor.name+" / "+this.scene.key);

        //set up musique

        this.mort = this.sound.add('mort');
        // this.reveBleu = this.sound.add('reve_bleu');
        //
        // var musicConfig = {
        //     mute : false,
        //     volume : 1,
        //     rate : 1,
        //     detune : 0,
        //     seek : 0,
        //     loop : true,
        //     delay : 0
        // }
        //
        // this.reveBleu.play(musicConfig);
        
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

    // ramasserEtoile (player, star)
    // {
    //     star.disableBody(true, true);
    //
    //     star.emit(MyEvents.ACTIVE);
    //
    //     ui.gagne(0.5);
    //
    //     //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
    //     let totalActive = 0;
    //     for(let child of this.children.getChildren())
    //     {
    //         if(child.texture && child.texture.key === "star")
    //         {
    //             if(child.active)
    //             {
    //                 totalActive++;
    //             }
    //         }
    //     }
    //     // if(totalActive === 0)
    //     // {
    //     //     this.win();
    //     // }
    // }

    /**
     * Aïeee ça fait mal
     * @param player
     * @param spike
     */
    hitSpike (player, spike)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.restart();
    }

    /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     */
    hitMonster(player, monster)
    {
        let me=this;
        // console.log(me.player.invul);

        if(me.player.invul === true)
        {
            if(monster.isDead !== true){ //si notre monstre n'est pas déjà mort
                if(
                    // si le player descend
                    player.body.velocity.y > 0
                    // et si le bas du player est plus haut que le monstre
                    && player.getBounds().bottom < monster.getBounds().top+30

                )
                {
                    ui.gagne(1);
                    monster.isDead=true; //ok le monstre est mort
                    monster.visible=false;
                    this.saigne(monster,function()
                    {
                        //à la fin de la petite anim...ben il se passe rien :)
                    })
                    //notre joueur rebondit sur le monstre
                    player.directionY=500;
                }
                else
                {
                    //le joueur est mort
                    if(!me.player.isDead)
                    {
                        this.mort.play();

                        me.player.isDead=true;
                        me.player.visible=false;
                        //ça saigne...
                        me.saigne(me.player,function() {
                            //à la fin de la petite anim, on relance le jeu
                            me.blood.visible=false;
                            me.player.anims.play('turn');
                            me.player.isDead=false;
                            me.scene.restart();
                        })
                    }
                }
            }
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

    recharger(){
        this.scene.restart();
    }
}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current = null;