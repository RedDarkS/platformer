class Tableau06 extends Tableau
{

    preload() 
    {
        super.preload();
        this.load.image('monster-violet', 'assets/monster-violet.png');

    }
    create() 
    {
        super.create();
        //étoiles
        this.stars = this.physics.add.group();
        
        this.stars.create(600 ,0,"star");

        this.stars.children.iterate(function (child) 
        {
            child.setBounce(1);
            child.setGravity(1);
            child.setCollideWorldBounds(true);
            child.setVelocity( 0,Phaser.Math.Between(-100, 100));
            child.setMaxVelocity(0,500);
        });
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        //notre monstre
        this.monstre = this.physics.add.sprite(300,this.sys.canvas.height - 70,"monster-violet");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitMonster, null, this);



    }

}

