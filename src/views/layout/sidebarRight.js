    import Auth from '../../models/auth';

    const vRol = {

        view: () => {


            if (Auth.rol == 1) {
                return "Administrador";
            }

            if (Auth.rol == 2) {
                return "Coordinador";
            }

            if (Auth.rol == 3) {
                return "Gestionador";
            }

            if (Auth.rol == 4) {
                return "Operador";
            }

            if (Auth.rol == 4) {
                return "Usuario";
            }


        },
    };

    const SidebarRight = {
        view: () => {
            return [
                m("div.navbar-right", [

                    m('div.dropdown.dropdown-profile', [
                        m("a.dropdown-link.tx-semibold[href='/salir'][title='Salir']",
                            m("div.avatar.avatar-sm",
                                m("i[data-feather='log-out']"),
                            )
                        )
                    ]),

                    m("div.dropdown.dropdown-profile", [

                        m("a.dropdown-link[href=''][data-toggle='dropdown'][data-display='static']",
                            m("div.avatar.avatar-sm",
                                m("i[data-feather='user']"),
                            )
                        ),
                        m("div.dropdown-menu.dropdown-menu-right.tx-13", [
                            m("div.tx-18.tx-semibold.mg-b-0",
                                (Auth.user.user !== undefined) ? Auth.user.user.toUpperCase() : ""
                            ),
                            m("p.mg-b-25.tx-12.tx-color-03", [
                                m(vRol)
                            ]),
                            m("div.dropdown-divider"),
                            m('button', {
                                class: "dropdown-item tx-16 ",
                                onclick: (e) => {
                                    m.route.set('/salir');
                                }
                            }, [
                                m("i[data-feather='log-out']"),
                                "Salir"
                            ]),




                        ])
                    ])
                ])

            ];
        },
    };




    export default SidebarRight;