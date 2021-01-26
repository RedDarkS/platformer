class zoo extends Tableau
{
    preload() 
    {
        super.preload();
        this.load.image('monster-violet', 'assets/monster-violet.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');
        this.load.image('spike', 'assets/spike.png');
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
        this.monstre = this.physics.add.sprite(100,this.sys.canvas.height - 70,"monster-violet");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        this.monstre = this.physics.add.sprite(200,this.sys.canvas.height - 70,"monster-violet");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(32,32);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        new cruchMonstre(this,400,100);

        new testMonstre(this,500,100);
        
    }
}