import SidebarAD from './sidebar';
import Notificaciones from '../../../models/notificaciones';
import m from 'mithril';

function stopwatchModel() {
    return {
        interval: null,
        seconds: 100,
        isPaused: false
    };
}

const actions = {
    showFilter: true,
    showSearch: true,
    show: false,
    increment(model) {
        model.seconds--;
        if (model.seconds == 0) {
            window.location.reload();
        }
        m.redraw();
    },

    start(model) {
        model.interval = setInterval(actions.increment, 1000, model);
    },
    stop(model) {
        model.interval = clearInterval(model.interval);
    },
    reset(model) {
        model.seconds = 100;
    },
    toggle(model) {
        if (model.isPaused) {
            actions.start(model);
        } else {
            actions.stop(model);
        }
        model.isPaused = !model.isPaused;
    }
};

function Stopwatch() {
    const model = stopwatchModel();
    actions.start(model);
    return {
        view() {
            return [
                m("div.mg-b-0", [
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                        m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                            "Actualización en:"
                        ),

                    ]),
                    m("div.d-flex.justify-content-between.mg-b-5", [
                        m("h5.tx-normal.tx-rubik.mg-b-0",
                            model.seconds + "s."
                        ),
                        m("h5.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                            m("small.pd-2.tx-15",
                                (model.isPaused ? [m("i.fas.fa-play.pd-2", {
                                    title: "Start",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }
                                })] : [m("i.fas.fa-pause.pd-2", {
                                    title: "Pause",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }

                                })]),


                            ),



                        ),


                    ]),
                    m("div.progress.ht-4.mg-b-0.op-5",
                        m(".progress-bar.bg-primary.[role='progressbar'][aria-valuenow='" + model.seconds + "'][aria-valuemin='0'][aria-valuemax='60']", {
                            oncreate: (el) => {
                                el.dom.style.width = "100%";

                            },
                            onupdate: (el) => {
                                el.dom.style.width = model.seconds + "%";

                            },

                        })
                    )
                ]),

            ];



        },
        onremove() {
            actions.stop(model);
        },

    };
};


const tableContratosAd = {
    oncreate: () => {
        ContratosAd.loadContratosAd();
        if (ContratosAd.searchField.length !== 0) {
            var table = $('#table-ContratosAd').DataTable();
            table.search(ContratosAd.searchField).draw();
        }

    },

    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [



                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Todos los Contratos:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (ContratosAd.idFiltro == 1) {
                                            el.dom.innerHTML = 'Contratos Digitalizados de Hoy';
                                        }
                                        if (ContratosAd.idFiltro == 2) {
                                            el.dom.innerHTML = 'Contratos Digitalizados entre fechas';
                                        }


                                    },
                                    onupdate: (el) => {
                                        if (ContratosAd.idFiltro == 1) {
                                            el.dom.innerHTML = 'Contratos Digitalizados de Hoy';
                                        }
                                        if (ContratosAd.idFiltro == 2) {
                                            el.dom.innerHTML = 'Contratos Digitalizados entre fechas';
                                        }

                                    }
                                }

                            )

                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (ContratosAd.idFiltro == 1 ? 'd-none' : 'd-flex')
                            }, [
                                m("div.link-03", {
                                        title: "Desde"
                                    },
                                    m(".tx-10.pd-r-0", {
                                        style: { "padding-top": "10px" }
                                    }, 'Desde:')
                                ),
                                m("div.link-03", {
                                        style: { "cursor": "pointer" },
                                        title: "Desde"
                                    },
                                    m("input.tx-light.pd-4[type='date'][id='desde']", {
                                        oncreate: (el) => {
                                            el.dom.value = (ContratosAd.idFiltro !== 1 ? moment(moment(ContratosAd.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            ContratosAd.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            ContratosAd.loader = true;
                                            ContratosAd.pedidos = [];
                                            ContratosAd.fetch();
                                            m.route.set("/laboratorio/Contratos Digitalizados?idFiltro=" + ContratosAd.idFiltro + "&fechaDesde=" + ContratosAd.fechaDesde + "&fechaHasta=" + ContratosAd.fechaHasta);
                                        },
                                        style: {
                                            "border": "transparent"
                                        }
                                    })
                                ),
                                m("div.link-03", {
                                        title: "Hasta"
                                    },
                                    m(".tx-10.pd-r-0", {
                                        style: { "padding-top": "10px" }
                                    }, 'Hasta:')
                                ),
                                m("div.link-03", {
                                        style: { "cursor": "pointer" },
                                        title: "Hasta"
                                    },
                                    m("input.tx-light.pd-4[type='date'][id='hasta']", {
                                        oncreate: (el) => {
                                            el.dom.value = (ContratosAd.idFiltro !== 1 ? moment(moment(ContratosAd.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            ContratosAd.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            ContratosAd.loader = true;
                                            ContratosAd.pedidos = [];
                                            ContratosAd.fetch();
                                            m.route.set("/laboratorio/ContratosAd?idFiltro=" + ContratosAd.idFiltro + "&fechaDesde=" + ContratosAd.fechaDesde + "&fechaHasta=" + ContratosAd.fechaHasta);
                                        },
                                        style: {
                                            "border": "transparent"
                                        }
                                    })
                                )
                            ]),
                            m("div.dropdown.dropleft", [
                                m("div.link-03.lh-0.mg-l-5[id='dropdownMenuButton'][data-toggle='dropdown'][aria-haspopup='true'][aria-expanded='false']", {
                                        style: { "cursor": "pointer" },
                                        title: "Filtrar"
                                    },
                                    m("i.fas.fa-filter.tx-18.pd-5")
                                ),
                                m(".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']", [
                                    m("h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                        "FILTROS:"
                                    ),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/admisiones/contratos/?idFiltro=1" }, [
                                        "Contratos Digitalizados de Hoy"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/contabilidad/proceso/tarjeta-roja/Contratos Digitalizados/?idFiltro=2&fechaDesde=" + ContratosAd.fechaDesde + "&fechaHasta=" + ContratosAd.fechaHasta }, [
                                        "Contratos Digitalizados entre fechas"
                                    ]),


                                ])
                            ])
                        ])
                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (ContratosAd.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function(e) { ContratosAd.searchField = e.target.value; },
                                value: ContratosAd.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-ContratosAd'][width='100%']"),


                ])
            ])
        ]);
    }
};

const ContratosAd = {
    notificaciones: [],
    pedidos: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    error: "",
    oninit: (_data) => {

        SidebarAD.page = "";

        if (ContratosAd.pedidos.length == 0) {

            moment.lang("es", {
                months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
                    "_"
                ),
                monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
                    "_"
                ),
                weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split(
                    "_"
                ),
                weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
                weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
            });



            ContratosAd.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
            ContratosAd.fechaHasta = moment().format('DD-MM-YYYY');
            ContratosAd.loader = true;
            ContratosAd.pedidos = [];
            ContratosAd.fetch();

        }

    },
    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-TR');
    },
    loadContratosAd: () => {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-ContratosAd").DataTable({
            data: ContratosAd.pedidos,
            dom: 'ltp',
            responsive: true,
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Todavía no tienes resultados disponibles.",
                sEmptyTable: "Ningún dato disponible en esta tabla",
                sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                sInfoPostFix: "",
                sUrl: "",
                sInfoThousands: ",",
                sLoadingRecords: "Cargando...",
                oPaginate: {
                    sFirst: "Primero",
                    sLast: "Último",
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
                oAria: {
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente",
                },
            },
            cache: false,
            order: [
                [0, "Desc"]
            ],
            destroy: true,
            columns: [{
                    title: "N°:",
                },
                {
                    title: "Fecha:",
                },
                {
                    title: "HC y Nro. de Admisión:",
                },
                {
                    title: "Usuario:",
                },
                {
                    title: "Status:",
                },
                {
                    title: "Opciones:",
                },


            ],
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: true,
                    aTargets: [0],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.fecha;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return ' Nhc:' + full.nhc + ' Adm:' + full.adm;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.usuario;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return 'OPCIONES';

                    },
                    visible: false,
                    aTargets: [4],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return 'OPCIONES';

                    },
                    visible: true,
                    aTargets: [5],
                    orderable: false,
                },


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                m.mount(nRow, {
                    view: () => {
                        return [
                            m("td", {
                                class: 'bg-primary'
                            }, [

                                m("span.badge.badge-pill.badge-primary.wd-100p.mg-b-1",
                                    iDisplayIndexFull + 1
                                )


                            ]),
                            m("td", { "style": {} },
                                aData.fecha
                            ),
                            m("td", { "style": {} },
                                m("span.tx-semibold.tx-dark.tx-15.wd-100p.mg-b-1",
                                    aData.nhc + " Adm: " + aData.adm
                                ),
                            ),
                            m("td", { "style": {} }, [

                                    m("span.tx-semibold.tx-dark.tx-15.wd-100p.mg-b-1",
                                        aData.usuario
                                    ),
                                ]

                            ),
                            m("td.tx-center", {
                                    onclick: () => {
                                        m.route.set("/admisiones/contratos/status/", {
                                            id: aData.id,
                                            track: "view",
                                        });
                                    },
                                    "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }
                                },
                                " Ver Detalle "
                            )
                        ];
                    },
                });
            },
            drawCallback: function(settings) {

                ContratosAd.loader = false;


            },
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });

        $('#searchField').keyup(function(e) {

            table.search($('#searchField').val()).draw();
        });

        return table;
    },
    fetch: () => {

        let _queryString = '';

        if (ContratosAd.idFiltro == 1) {
            _queryString = '?idFiltro=' + ContratosAd.idFiltro;
        } else {
            _queryString = '?idFiltro=' + ContratosAd.idFiltro + '&fechaDesde=' + ContratosAd.fechaDesde + '&fechaHasta=' + ContratosAd.fechaHasta;
        }

        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/ad" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                ContratosAd.loader = false;
                ContratosAd.pedidos = result.data;
            })
            .catch(function(e) {
                setTimeout(function() { ContratosAd.fetch(); }, 2000);
            });


    },

    reloadData: () => {
        var table = $('#table-ContratosAd').DataTable();
        table.clear();
        table.rows.add(ContratosAd.pedidos).draw();
    },
    view: (_data) => {

        return ContratosAd.loader ? [
            m(SidebarAD, { oncreate: SidebarAD.setPage(33) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admisiones "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones/contratos" }, [
                                " Contratos Digitalizados "
                            ])

                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Contratos Digitalizados:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("div.table-loader.wd-100p", [
                                    m("div.placeholder-paragraph", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ]


                            ),


                        ])
                    ]),






                ])
            ),
        ] : ContratosAd.error.length !== 0 ? [
            m(SidebarAD, { oncreate: SidebarAD.setPage(33) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admisiones "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones/contratos" }, [
                                " Contratos Digitalizados "
                            ])

                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Contratos Digitalizados:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m('p', 'No existe información.')
                    ]),





                ])
            ),

        ] : !ContratosAd.loader && ContratosAd.pedidos.length !== 0 ? [
            m(SidebarAD, { oncreate: SidebarAD.setPage(33) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admisiones "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones/contratos" }, [
                                " Contratos Digitalizados "
                            ])

                        ),

                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Contratos Digitalizados:"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Contratos Digitalizados:"
                    ),
                    m(tableContratosAd)





                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Contratos Digitalizados"
                ),
                m("div.mg-t-10.bg-white", {

                    },

                    m("div.mg-t-10.bg-white",
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                " Contratos Digitalizados "
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    ContratosAd.pedidos.length
                                ),
                                m("div.tx-18", [

                                    m("divv.lh-0.tx-gray-300", 'Contrato(s)')
                                ])

                            ]),

                        ])
                    ),
                    m("div.pd-20",
                        m(Stopwatch)
                    )
                ),

            ])

        ] : !ContratosAd.loader && ContratosAd.pedidos.length == 0 ? [
            m(SidebarAD, { oncreate: SidebarAD.setPage(33) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admisiones "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones/contratos" }, [
                                " Contratos Digitalizados "
                            ])

                        ),

                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Contratos Digitalizados:"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Contratos Digitalizados"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m(".alert.alert-danger[role='alert']",
                                "No existe información disponible."
                            )


                        ])
                    ]),






                ])
            ),
        ] : [
            m(SidebarAD, { oncreate: SidebarAD.setPage(33) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admisiones "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones/contratos" }, [
                                " Contratos Digitalizados "
                            ])

                        ),

                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Contratos Digitalizados:"
                        ),


                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Contratos Digitalizados"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("p", " Error interno."

                            ),


                        ])
                    ]),






                ])
            ),
        ];


    },

};


export default ContratosAd;