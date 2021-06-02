class Ui extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
    }

    preload()
    {
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
        this.load.image('star', 'assets/coeur.png');
        this.load.image('up', 'assets/ui/arrowUp.png');
        this.load.image('left', 'assets/ui/arrowLeft.png');
        this.load.image('right', 'assets/ui/arrowRight.png');
    }

    create ()
    {
        this.star = this.add.image(50, 35 , 'star');

        this.halo = this.add.pointlight(50, 35, (30, 144, 255), 50, 0.1, 0.1);
        this.halo.color.r = 30;
        this.halo.color.g = 144;
        this.halo.color.b = 255;

        this.star.setDepth(1);
        this.halo.setDepth(0);

        this.completion=0;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._completionText = this.add.text(65, 18, '', {
            font:'32px "Comic Sans MS"',
            fill: '#fff'
        });

        //met l'ui au dessus du tableau
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            me.gagne(0)
        },100)

        //joystick
        let pad=new GamePadButtons(this,0,0);

        pad.x=this.sys.canvas.width-pad.size-32;
        pad.y=this.sys.canvas.height-pad.size-32;


        let btFs=this.add.image(0,0,'ui/full-screen-icon');
        btFs.setInteractive();
        btFs.on('pointerup', function ()
        {

            if (this.scale.isFullscreen)
            {
                this.scale.stopFullscreen();
            }
            else
            {
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1,1)
        btFs.setDisplaySize(48,48)
        btFs.x=this.sys.canvas.width;
        btFs.y=this.sys.canvas.height;
    }

    reset()
    {
        this.completion = 0;
        this._completionText.setText(' ' + this.completion + ' /100');
    }

    gagne(points)
    {
        this.completion+=points;
        if(this.completion < 0)
        {
            this.completion = 0;
        }
        this._completionText.setText(' ' + this.completion + ' /100');
    }
}
