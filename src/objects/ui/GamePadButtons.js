/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
 class GamePadButtons extends GameKeyboard
 {
    constructor(scene, x, y,size= 100)
    {
        super(scene, x, y)
        scene.add.existing(this);

        if(this.scene.sys.game.device.os.desktop !== true && this.scene.sys.game.device.os.linux !== true && this.scene.sys.game.device.os.macOS !== true)
        {
            this.size = size;
            let w = this.size/2;

            this._newGame = this.add.text(750, 12, 'New Game', {
                font:'32px "Comic Sans MS"',
                fill: '#fff'
            });

            //cercle d'affichage des boutons

            let CbtnLEFT = scene.add.circle(-50,0,w/1.5,0xffffff,0.3);
            let btnLEFT = scene.add.sprite(0, 0, 'left', 0.3).setDisplaySize(22,38).setInteractive();
            let CbtnRIGHT = scene.add.circle(0,0,w/1.5,0xffffff,0.3);
            let btnRIGHT = scene.add.sprite(0, 0, 'right', 0.3).setDisplaySize(22,38).setInteractive();

            let CbtnA = scene.add.circle(0,0,w/1.5,0xffffff,0.3).setInteractive();
            let btnA = scene.add.sprite(0, 0, 'up', 0.3).setDisplaySize(38,22).setInteractive();

            let btnB = scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();

            this.add(CbtnLEFT);
            this.add(CbtnRIGHT);

            this.add(btnLEFT);
            this.add(btnRIGHT);

            this.add(CbtnA);
            this.add(btnA);
            this.add(btnB);

            CbtnLEFT.x = 0;
            CbtnRIGHT.x = w*1.9;
            CbtnLEFT.y = w;
            CbtnRIGHT.y = w;

            btnLEFT.x = 0;
            btnRIGHT.x = w*1.9;
            btnLEFT.y = w;
            btnRIGHT.y = w;

            CbtnA.x = scene.sys.canvas.width * -1 + w * 4;
            CbtnA.y = w;
            btnA.x = scene.sys.canvas.width * -1 + w * 4;
            btnA.y = w;

            btnB.x = scene.sys.canvas.width * -1 + w * 19;
            btnB.y = w*-5;


            btnLEFT.on('pointerdown',function()
            {
                Tableau.current.player.directionX=-1;
            });
            btnRIGHT.on('pointerdown',function()
            {
                Tableau.current.player.directionX=1;
            });
            // btnUP.on('pointerdown',function()
            // {
            //     Tableau.current.player.directionY=-1;
            // });
            // btnDOWN.on('pointerdown',function()
            // {
            //     Tableau.current.player.directionY=1;
            // });



            btnLEFT.on('pointerup',function()
            {
                Tableau.current.player.directionX=0;
            });
            btnRIGHT.on('pointerup',function()
            {
                Tableau.current.player.directionX=0;
            });
            // btnUP.on('pointerup',function()
            // {
            //     Tableau.current.player.directionY=-0;
            // });
            // btnDOWN.on('pointerup',function()
            // {
            //     Tableau.current.player.directionY=0;
            // });


            btnA.on('pointerdown',function()
            {
                Tableau.current.player.directionY=-1;
            });
            btnA.on('pointerup',function()
            {
                Tableau.current.player.directionY=0;
            });
            btnB.on('pointerdown',function()
            {
                Tableau.current.newGame();
            });
            // btnB.on('pointerup',function()
            // {
            //     Tableau.current.player.directionY=-0;
            // });
        }

    }

} 