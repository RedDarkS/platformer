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

        this.load.audio('hanna_lapin', 'assets/son/hanna_lapin.mp3');
        this.load.audio('reve_bleu', 'assets/son/reve_bleu.mp3');
        
    }
    create() 
    {
        super.create();

        //des étoiles
        this.star1 = this.physics.add.sprite(900,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0);

        //quand le joueur touche une étoile on appelle la fonction ramasserEtoile
        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);

        //nos monstres
        /*
        this.monstre = this.physics.add.sprite(100,this.sys.canvas.height - 70,"monster-violet");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        //mob plus petit
        this.monstre = this.physics.add.sprite(200,this.sys.canvas.height - 70,"monster-violet");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(32,32);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
        */

        //haut bas
        new cruchMonstre(this,400,100);

        //trajectoire cheloue
        new testMonstre(this,300,100);

        //diagonale
        new testMonstre2(this,500,463);
        
        //this.sound.play('reve_bleu');


        //Z
        new testMonstre3(this,600,100);

        //diagonale
        new circleMonster(this,500,100);
        
    }
}