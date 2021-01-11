class Tableau01 extends Tableau00{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
    }
    create() {
        super.create();

        //la plateforme rouge
        let rouge=this.physics.add.sprite(10,200,"ground");
        rouge.setDisplaySize(250,50)//taille de l'objet
        rouge.setTintFill(0xFF0000);//applique une couleur rouge
        rouge.setOrigin(0,0);//pour positionner plus facilement
        rouge.body.allowGravity=0; //la gravité n'a pas d'effet ici
        rouge.setImmovable(true); //ne bouge pas quand on rentre dedans
        this.physics.add.collider(this.player, rouge);//le joueur rebondit dessus
        this.physics.add.collider(this.star1, rouge);//l'étoile1 rebondit dessus
        this.physics.add.collider(this.star2, rouge);//l'étoile2 rebondit dessus
        this.physics.add.collider(this.star3, rouge);//l'étoile3 rebondit dessus

        //autre méthodes

        //un groupe de plateformes statiques
        let groupeVert = this.physics.add.staticGroup();
        groupeVert.create(300, 250, 'ground');
        groupeVert.create(350, 260, 'ground');
        groupeVert.create(400, 270, 'ground');
        groupeVert.create(450, 280, 'ground');
        groupeVert.create(500, 290, 'ground');
        groupeVert.create(700, 300, 'ground');

        //pour chacun des enfants du groupe
        groupeVert.children.iterate(function (child) {
            child.setTintFill(0x00FF00); //applique une couleur verte
            child.setDisplaySize(40,50);//taille de l'objet
            child.setOrigin(0,0);//pour positionner plus facilement
            child.refreshBody();//dit au groupe d'appliquer les changements
        });

        this.physics.add.collider(this.player, groupeVert);//le joueur rebondit sur les plateformes du goupe vert
        this.physics.add.collider(this.star1, groupeVert);//l'étoile1 rebondit sur les plateformes du goupe vert
        this.physics.add.collider(this.star2, groupeVert);//l'étoile1 rebondit sur les plateformes du goupe vert
        this.physics.add.collider(this.star3, groupeVert);//l'étoile1 rebondit sur les plateformes du goupe vert

    }

}

