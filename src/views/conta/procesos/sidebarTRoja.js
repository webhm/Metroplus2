const MenuSidebar = {
    menu: [{
        idModulo: 32,
        label: "Nueva Tarjeta Roja",
        href: "contabilidad/proceso/tarjeta-roja/nueva"
    }, {
        idModulo: 33,
        label: "Autorizaciones",
        href: "contabilidad/proceso/tarjeta-roja/autorizaciones"
    }],
    view: () => {

        if (MenuSidebar.menu.length !== 0) {
            return [

                MenuSidebar.menu.map(function (_v, _i, _contentData) {
                    return [

                        m(m.route.Link, { href: "/" + _v.href, class: ((SidebarTRoja.page == _v.idModulo) ? "active" : "") }, [
                            _v.label
                        ]),



                    ]

                })
            ]
        }



    },

};




const SidebarTRoja = {
    page: "",
    setPage: (page) => {
        SidebarTRoja.page = page;
    },
    view: () => {
        return [
            m(".sidebar.sidebar-fixed.sidebar-components[id='sidebarMenu']", [
                m("div.sidebar-header", [
                    m("a[href=''][id='mainMenuOpen']",
                        m("i[data-feather='menu']")
                    ),
                    m("h5",
                        "Menu"
                    ),
                    m("a[href=''][id='sidebarMenuClose']",
                        m("i[data-feather='x']")
                    )
                ]),
                m("div.sidebar-body",
                    m("ul.sidebar-nav", [
                        m("li.nav-label.mg-b-15",
                            "Contabilidad por Procesos"
                        ),
                        m("li.nav-item.show", [
                            m(m.route.Link, { href: "/contabilidad", class: "nav-link with-sub" }, [
                                m("i[data-feather='layout']"),
                                " Tarjeta Roja "
                            ]),

                            m("nav.nav", [

                                m(MenuSidebar)

                            ])
                        ]),

                    ])
                )
            ])
        ];
    },

};

export default SidebarTRoja;