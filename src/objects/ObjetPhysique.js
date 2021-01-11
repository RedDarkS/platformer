class ObjetPhysique extends Phaser.Physics.Arcade.Sprite{
    /**
     *
     * @param {Tableau} scene
     * @param {Number} x
     * @param {Number} y
     * @param {string} image
     */
    constructor(scene, x, y,image) {
        super(scene, x, y,image);
        /**
         *
         * @type {Tableau}
         */
        this.scene=scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}