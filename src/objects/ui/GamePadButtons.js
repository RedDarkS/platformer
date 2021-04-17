/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
 class GamePadButtons extends GameKeyboard
 {
    constructor(scene, x, y,size= 100)
    {
        super(scene, x, y)
        scene.add.existing(this);

        this.size = size;
        let w = this.size/2;
        let pad2 = scene.add.container();

        //cercle d'affichage des boutons
        let btnUP = scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();
        let btnLEFT = scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();
        let btnRIGHT = scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();
        let btnDOWN = scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();

        let btnA = scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();

        this.add(btnUP);
        this.add(btnLEFT);
        this.add(btnRIGHT);
        this.add(btnDOWN);

        this.add(btnA);

        btnUP.x = w*1;
        btnLEFT.x = w*0;
        btnRIGHT.x = w*2;
        btnLEFT.y = w;
        btnRIGHT.y = w;
        btnDOWN.x = w;
        btnDOWN.y = w*2;

        btnA.x = scene.sys.canvas.width * -1 + w * 4;
        btnA.y = w*1;


        btnLEFT.on('pointerdown',function()
        {
            Tableau.current.player.directionX=-1;
        });
        btnRIGHT.on('pointerdown',function()
        {
            Tableau.current.player.directionX=1;
        });
        btnUP.on('pointerdown',function()
        {
            Tableau.current.player.directionY=-1;
        });
        btnDOWN.on('pointerdown',function()
        {
            Tableau.current.player.directionY=1;
        });



        btnLEFT.on('pointerup',function()
        {
            Tableau.current.player.directionX=0;
        });
        btnRIGHT.on('pointerup',function()
        {
            Tableau.current.player.directionX=0;
        });
        btnUP.on('pointerup',function()
        {
            Tableau.current.player.directionY=-0;
        });
        btnDOWN.on('pointerup',function()
        {
            Tableau.current.player.directionY=0;
        });


        btnA.on('pointerdown',function()
        {
            Tableau.current.player.directionY=-1;
        });
        btnA.on('pointerup',function()
        {
            Tableau.current.player.directionY=0;
        });

    }

} 