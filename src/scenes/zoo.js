class zoo extends Tableau
{
    preload() 
    {
        super.preload();
        this.load.image('Tengu', 'assets/Tengu.png');
        this.load.image('FallenAngel', 'assets/FallenAngel.png');
        this.load.image('Genbu', 'assets/Genbu.png');
        this.load.image('Soul', 'assets/Soul.png');
        this.load.image('Thug', 'assets/Thug.png');

        //des petits sons pour le lol
        this.load.audio('hanna_lapin', 'assets/son/hanna_lapin.mp3');
        
    }
    create() 
    {
        super.create();

        this.hannaLapin = this.sound.add("hanna_lapin");

        //des étoiles
        this.star1 = this.physics.add.sprite(900,100,"star");
        this.star1.setDisplaySize(80,80);
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0);

        //quand le joueur touche une étoile on appelle la fonction ramasserEtoile
        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);

        //haut bas
        //new cruchMonstre(this,400,100);

        //trajectoire cheloue
        //new testMonstre(this,300,100);

        //horizontale
        //new testMonstre2(this,500,463);

        //Z
        //new testMonstre3(this,600,100);

        //faux cercle
        new circleMonster(this,500,100);
        
    }
}