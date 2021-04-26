/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
 class GameKeyboard extends Phaser.GameObjects.Container
 {
    constructor(scene, x, y) 
    {
        super(scene, x, y)
        scene.add.existing(this);

        this.cursors = scene.input.keyboard.createCursorKeys();

        scene.input.keyboard.on('keydown', function(kevent)
        {
            //console.log(kevent.key);
            switch (kevent.key)
            {
                case "ArrowRight":
                    Tableau.current.player.directionX=1;
                    break;

                case "ArrowLeft":
                    Tableau.current.player.directionX=-1;
                    break;

                case "ArrowUp":
                    Tableau.current.player.directionY=-1;
                    break;

                case "ArrowDown":
                    Tableau.current.player.directionY=1;
                    break;

                case "Control":
                    localStorage.setItem('cP', null);
                    break;
            }
        });
        scene.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.key)
            {
                case "ArrowRight":
                    Tableau.current.player.directionX=0;
                    break;

                case "ArrowLeft":
                    Tableau.current.player.directionX=0;
                    break;

                case "ArrowUp":
                    Tableau.current.player.directionY=0;
                    break;

                case "ArrowDown":
                    Tableau.current.player.directionY=0;
                    break;
            }
        });



    }


} 