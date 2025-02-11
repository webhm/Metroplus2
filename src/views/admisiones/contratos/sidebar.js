const MenuSidebar = {
    menu: [{
        idModulo: 32,
        label: "Nueva Contrato",
        href: "admisiones/contratos/nuevo"
    }, {
        idModulo: 33,
        label: "Contratos Digitalizados",
        href: "admisiones/contratos"
    }],
    view: () => {

        if (MenuSidebar.menu.length !== 0) {
            return [

                MenuSidebar.menu.map(function(_v, _i, _contentData) {
                    return [

                        m(m.route.Link, { href: "/" + _v.href, class: ((SidebarContratos.page == _v.idModulo) ? "active" : "") }, [
                            _v.label
                        ]),



                    ]

                })
            ]
        }



    },

};




const SidebarContratos = {
    page: "",
    setPage: (page) => {
        SidebarContratos.page = page;
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
                            "Contratos Digitalizados"
                        ),
                        m("li.nav-item.show", [
                            m(m.route.Link, { href: "/admisiones", class: "nav-link with-sub" }, [
                                m("i[data-feather='layout']"),
                                " Admisiones "
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

export default SidebarContratos;