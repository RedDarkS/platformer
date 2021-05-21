window.MyEvents = {

    //TODO constante pour les différents events

    // Actions
    /**
     * Indique que le player a commencé un saut
     *
     * @name MyEvents.SAUTE
     * @type {String}
     * @const
     */
    SAUTE : "saute",

    /**
     * Indique que l'on grimpe
     *
     * @name MyEvent.GRIMPE
     * @type{String}
     * @const
     */
    GRIMPE : "grimpe",

    /**
     * Indique que l'on cour vers la droite
     *
     * @name MyEvent.COURD
     * @type{String}
     * @const
     */
    COURD : "courd",

    /**
     * Indique que l'on cour vers la gauche
     *
     * @name MyEvent.COURG
     * @type{String}
     * @const
     */
    COURG : "courg",

    /**
     * Indique que l'on cour plus
     *
     * @name MyEvent.STOP
     * @type{String}
     * @const
     */
    STOP : "stop",

    //Particules

    /**
     * Indique que l'on désactive les particules
     *
     * @name MyEvent.ACTIVE
     * @type {String}
     * @const
     */
    ACTIVE : "active",

    /**
     * Indique que l'on break une planche
     *
     * @name MyEvent.BREAK
     * @type {String}
     * @const
     */
    BREAK : "break",

    //Camera

    /**
     * Indique que l'on centre la caméra
     *
     * @name MyEvent.CENTREE
     * @type {String}
     * @const
     */
    CENTREE : "centree",

    /**
     * Indique que l'on décale la caméra vers la droite
     *
     * @name MyEvent.EXCENTREE
     * @type {String}
     * @const
     */
    EXCENTREE : "excentree",

    /**
     * Indique que l'on est dedans
     *
     * @name MyEvent.EXCENTREE
     * @type {String}
     * @const
     */
    INTERIEUR : "interieur",

    /**
     * Indique que l'on est dehors
     *
     * @name MyEvent.EXCENTREE
     * @type {String}
     * @const
     */
    EXTERIEUR : "exterieur",
}