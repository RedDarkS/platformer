/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
 class GameKeyboard extends Phaser.GameObjects.Container
 {
    constructor(scene, x, y) 
    {
        super(scene, x, y)
        scene.add.existing(this);

        this.scene = scene;
        this.cursors = scene.input.keyboard.createCursorKeys();

        scene.input.keyboard.on('keydown', function(kevent)
        {
            //console.log(kevent.key);
            switch (kevent.key)
            {
                case "d":
                    Tableau.current.player.directionX=1;
                    // Tableau.current.arrowRightPressed = true;
                    break;
                case "ArrowRight":
                    Tableau.current.player.directionX = 1;
                    // Tableau.current.arrowRightPressed = true;
                    break;


                case "q":
                    Tableau.current.player.directionX=-1;
                    // Tableau.current.arrowLeftPressed = true;
                    break;
                case "ArrowLeft":
                    Tableau.current.player.directionX = -1;
                    // Tableau.current.arrowLeftPressed = true;
                    break;

                case "z":
                    Tableau.current.player.directionY=-1;
                    break;
                case " ":
                    Tableau.current.player.directionY=-1;
                    break;
                case "ArrowUp":
                    Tableau.current.player.directionY=-1;
                    break;

                case "Control":
                    localStorage.setItem('cP', null);
                    break;

                // case "r":
                //     Tableau.current.recharger();
                //     Tableau.current.recharging.play(Tableau.current.aigleConfig);
                //     break;
            }
        });
        scene.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.key)
            {
                case "d":
                    Tableau.current.player.directionX=0;
                    break;
                case "ArrowRight":
                    Tableau.current.player.directionX=0;
                    break;

                case "q":
                    Tableau.current.player.directionX=0;
                    break;
                case "ArrowLeft":
                    Tableau.current.player.directionX=0;
                    break;

                case "z":
                    Tableau.current.player.directionY=0;
                    break;
                case " ":
                    Tableau.current.player.directionY=0;
                    break;
                case "ArrowUp":
                    Tableau.current.player.directionY=0;
                    break;
            }
        });



    }


} 