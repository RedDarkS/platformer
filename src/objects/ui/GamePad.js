/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GamePad extends GameKeyboard
{
    constructor(scene, x, y,size=100) 
    {
        super(scene, x, y)
        scene.add.existing(this);

        this.size=size;
        let w=this.size;
        let dragW=this.size/2;
        let pad2=scene.add.container();

        let circle=scene.add.circle(0,0,this.size/2,0xffffff,0.1)
        let circleDrag=scene.add.circle(0,0,dragW/2,0xffffff,0.3)
        this.add(pad2);
        pad2.add(circle);
        pad2.add(circleDrag);
        pad2.x=w/2;
        pad2.y=w/2;

        circleDrag.setInteractive();
        scene.input.setDraggable(circleDrag, true);

        circleDrag.on('drag', (pointer, dragX, dragY) => 
        {
            circleDrag.x = dragX
            circleDrag.y = dragY
            circleDrag.x=Phaser.Math.Clamp(dragX,-w/2,w/2);
            circleDrag.y=Phaser.Math.Clamp(dragY,-w/2,w/2);
            if(dragX < -w / 4)
            {
                Tableau.current.player.directionX=-1;
            }else if(dragX > w / 4)
            {
                Tableau.current.player.directionX=1;
            }else
            {
                Tableau.current.player.directionX=0;
            }
            if(dragY < -w / 4)
            {
                Tableau.current.player.directionY=-1;
            }else if(dragY > w / 4)
            {
                Tableau.current.player.directionY=1;
            }else
            {
                Tableau.current.player.directionY=0;
            }

        });
        circleDrag.on('dragend', (pointer, dragX, dragY) => 
        {
            circleDrag.x = 0;
            circleDrag.y = 0;
            Tableau.current.player.directionX=0;
            Tableau.current.player.directionY=0;
        });

    }


}