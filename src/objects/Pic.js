class Pic extends ObjetPhysique
{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y)
    {
        super(scene, x, y, "pic");

        //pas de gravité
        this.body.allowGravity = false;

        //gestion de la taille
        this.setDisplaySize(32, 32);

        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width, this.body.height/2);
        this.setOffset(0, 0);
    }
}