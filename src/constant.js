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
     * Indique que l'on cour
     *
     * @name MyEvent.COUR
     * @type{String}
     * @const
     */
    COUR : "cour",

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
}