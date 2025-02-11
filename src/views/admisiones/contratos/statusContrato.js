import m from 'mithril';
import HeadPublic from '../../layout/header-public';


const Uploads = {
    files: [],
    detalle: [],
    error: "",
    showFor: "",
    uploadService: (e) => {
        let postData = new FormData($('#uploadForm')[0]);

        fetch('https://api.hospitalmetropolitano.org/t/v1/procesos/ad/uploads?idTR=' + StatusContrato.id, {
            method: "POST",
            body: postData,
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('data = ', data);
            alert('Proceso realizado con éxito.')

        }).catch(function(err) {
            console.error(err);
        });

    },

    loadFile: (event) => {

        Array.from(event.target.files).forEach((file) => {
            Uploads.files.push(file);
        })

    },

    view: () => {


        return [
            m("div.mg-t-10.d-flex", {}, [
                Uploads.files.length == 0 ? [
                    m('p', 'No existe archivos.')
                ] : Uploads.files.length > 0 ? [
                    Uploads.files.map(function(_v, _i, _contentData) {

                        return [

                            m("div.col-6.col-sm-4.col-md-3.col-xl-3.mg-b-5.mg-t-5",
                                m("div.card.card-file", [
                                    m("div.dropdown-file", [
                                        m("a.dropdown-link[href=''][data-toggle='dropdown']",
                                            m("svg.feather.feather-more-vertical[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round']", [
                                                m("circle[cx='12'][cy='12'][r='1']"),
                                                m("circle[cx='12'][cy='5'][r='1']"),
                                                m("circle[cx='12'][cy='19'][r='1']")
                                            ])
                                        ),
                                        m("div.dropdown-menu.dropdown-menu-right", [


                                            m("a.dropdown-item.download[href='" + _v.url + "'][target='_blank']", [
                                                m("svg.feather.feather-download[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round']", [
                                                    m("path[d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4']"),
                                                    m("polyline[points='7 10 12 15 17 10']"),
                                                    m("line[x1='12'][y1='15'][x2='12'][y2='3']")
                                                ]),
                                                "Descargar"
                                            ]),

                                        ])
                                    ]),
                                    m("div.card-file-thumb.tx-danger",
                                        m("i.far.fa-file-pdf")
                                    ),
                                    m("div.card-body", [
                                        m(".d-inline.tx-5",
                                            _v.name
                                        ),

                                    ])

                                ])
                            ),



                        ]

                    })


                ] : []
            ]),

            m('form.mg-t-50', {
                enctype: "multipart/form-data",
                id: 'uploadForm',
                onsubmit: (e) => {
                    e.preventDefault();
                    Uploads.uploadService();
                }
            }, [
                m('div.custom-file.mg-b-5', [
                    m("label.custom-file-label[for='uploadFiles']",
                        " Subir Archivos "
                    ),
                    m("input.custom-file-input[autofocus][id='uploadFiles'][name='uploadFiles'][type='file'][multiple='true']", {
                        onchange: (e) => {
                            Uploads.loadFile(e);
                        }
                    }),

                ]),
                m("button.btn.btn-primary.btn-block[type='submit']",
                    "Subir Archivo"
                )


            ]),


        ];



    },
};

const Observaciones = {
    observaciones: "",
    data: [],
    obs: "",
    show: false,
    loadObservaciones: () => {


        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-observaciones").DataTable({
            data: Observaciones.data,
            dom: 'tp',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Sin Notificaciones",
                sEmptyTable: "Sin Notificaciones",
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
            columns: false,
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: true,
                }, {
                    mRender: function(data, type, row, meta) {
                        return "";
                    },
                    visible: true,
                    width: "100%",
                    aTargets: [1],
                    orderable: false,
                },

            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
            drawCallback: function(settings) {
                settings.aoData.map(function(_v, _i) {
                    m.mount(_v.anCells[1], {
                        view: function() {
                            return m("div.demo-static-toast",
                                m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", {
                                    "style": { "max-width": "none" }
                                }, [
                                    m("div.toast-header.bg-primary", [
                                        m("small.tx-white.tx-5.mg-b-0.mg-r-auto",
                                            'Observación'
                                        ),
                                        m("small.tx-white",
                                            moment.unix(_v._aData.timestamp).format("DD-MM-YYYY HH:mm")
                                        ),
                                    ]),
                                    m("div.toast-body.tx-14",
                                        _v._aData.log
                                    )
                                ])
                            )
                        }
                    });


                })
            },
        });


        return table;
    },
    reloadObservaciones: () => {
        var table = $('#table-observaciones').DataTable();
        table.clear();
        table.rows.add(Observaciones.data).draw();
    },
    fetch: () => {
        Observaciones.data = StatusContrato.data.comments;
        Observaciones.loadObservaciones();
    },

};

const DestinoFinal = {
    view: (_data) => {
        if (_data.attrs.destino_final == 'ALMACENAR') {
            return m("input", { "class": "form-control tx-semibold tx-15", "type": "text", "placeholder": "Destino Final" })
        } else {
            return m('select.tx-semibold', {

                class: "custom-select"
            }, m('option', 'Seleccione...'), ['FINANZAS', 'SISTEMAS', 'MANTENIMIENTO', 'INGENIERIA CLINICA'].map(x =>
                m('option', x)
            ))
        }
    }

};



const StatusContrato = {
    id: '',
    data: [],
    activos: [],
    examenes: [],
    error: '',
    numeroStatusContrato: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    autorizado: false,
    oninit: (_data) => {


        StatusContrato.id = _data.attrs.id;

        StatusContrato.fetch();


    },
    fetch: () => {
        StatusContrato.activos = [];
        StatusContrato.loader = true;
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/ad",
                body: {
                    id: StatusContrato.id,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    StatusContrato.loader = false;
                    StatusContrato.data = result.data;
                    if (StatusContrato.data.files !== false) {
                        Uploads.files = StatusContrato.data.files;
                    }
                    setTimeout(function() { Observaciones.fetch(); }, 100);
                } else {
                    StatusContrato.error = result.message;
                }
            })
            .catch(function(e) {
                StatusContrato.fetch();
            })

    },

    view: (_data) => {

        return [
            m(HeadPublic),
            m("div.section-nav", [
                m("label.nav-label",
                    "Nuevo Contrato"
                ),
                m("div.mg-t-10.mg-b-10.bg-white", {

                    },

                    m('a', {
                        href: '/admisiones/contratos'
                    }, [
                        m("div.mg-t-10.bg-white",
                            m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                                m("h6.lh-5.mg-b-5",
                                    "Consultar Contratos"
                                ),

                            ]),
                            m("div.card-body.pd-0", [
                                m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                    m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                        m('i.fas.fa-search.tx-40.tx-success')
                                    ),
                                    m("div", [

                                        m("divv.lh-0.tx-gray-300", 'Contratos')
                                    ])

                                ]),

                            ])
                        )

                    ]),
                    m('a', {
                        href: '/admisiones/contratos/nuevo'

                    }, [
                        m("div.mg-t-10.bg-white",
                            m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                                m("h6.lh-5.mg-b-5",
                                    "Nuevo Contrato"
                                ),

                            ]),
                            m("div.card-body.pd-0", [
                                m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                    m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                        m('i.fas.fa-file.tx-40.tx-primary')
                                    ),
                                    m("div", [

                                        m("divv.lh-0.tx-gray-300", 'Contratos')
                                    ])

                                ]),

                            ])
                        )

                    ]),





                ),

            ]),
            m("div.content.content-components", {
                    style: { "margin-left": "0px" }

                },
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [

                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Contrato Digital N°: HM-" + StatusContrato.id
                    ),


                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [



                            (StatusContrato.data.length !== 0 ? [
                                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", {


                                }, [
                                    m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [





                                        m('div.', [
                                            m("table.table.table-bordered.table-sm.tx-12", [
                                                m("thead",

                                                    m("tr.bg-litecoin.op-9.tx-white", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "DATOS:"
                                                        ),

                                                    ])
                                                ),
                                                m("tbody", [
                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                                style: { "background-color": "#a8bed6", "width": "25%" }
                                                            },
                                                            "Fecha:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                                style: { "background-color": "#eaeff5" }
                                                            },

                                                            m("input.disabled", { value: StatusContrato.data.fecha, "class": "form-control tx-semibold tx-15 tx-danger", "type": "text", "disabled": "disabled" })


                                                        ),

                                                    ]),


                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Historia Clínica:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: StatusContrato.data.nhc
                                                            })
                                                        )


                                                    ]),
                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Nro. de Admisión:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: StatusContrato.data.adm
                                                            })
                                                        )


                                                    ]),
                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Paciente:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: StatusContrato.data.pte
                                                            })
                                                        )


                                                    ]),


                                                ]),

                                                m("tbody", [



                                                    // INCLUIR AREA DE DEST Y DESTINO FINAL.
                                                    m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "ADJUNTOS:"
                                                        ),

                                                    ]),
                                                    m("tr.d-print-none", [

                                                        m("td[colspan='10']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },
                                                            m("ul.nav.nav-tabs[id='myTab'][role='tablist']", [
                                                                m("li.nav-item",
                                                                    m("a.nav-link[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']", {
                                                                            style: { "color": "#476ba3" }
                                                                        },
                                                                        m("i.fas.fa-file-alt.pd-1.mg-r-2"),

                                                                        " Adjuntos ",
                                                                        (Uploads.files.length !== 0 ? [
                                                                            m('span.mg-l-5.tx-14.tx-semibold.badge.badge-danger', Uploads.files.length)
                                                                        ] : [])
                                                                    )
                                                                ),
                                                                m("li.nav-item", {},
                                                                    m("a.nav-link[id='home-auth1'][data-toggle='tab'][href='#auth1'][role='tab'][aria-controls='auth1']", {
                                                                            style: { "color": "#476ba3" }
                                                                        },
                                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                                        " Observaciones ",
                                                                        (StatusContrato.data.comments.length !== 0 ? [
                                                                            m('span.mg-l-5.tx-14.tx-semibold.badge.badge-danger', StatusContrato.data.comments.length)
                                                                        ] : [])
                                                                    )
                                                                )


                                                            ]),
                                                        ),


                                                    ]),
                                                    m("tr.d-print-none", [

                                                        m("td[colspan='9']", {

                                                            },
                                                            m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                                                m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                                                                    m(Uploads)
                                                                ]),
                                                                m(".tab-pane.fade[id='auth1'][role='tabpanel'][aria-labelledby='home-auth1']", [

                                                                    m("p.mg-5", [
                                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                                            "Historial de Observaciones",
                                                                        ),
                                                                        m("table.table.table-sm[id='table-observaciones'][width='100%']")
                                                                    ]),
                                                                ]),



                                                            ])
                                                        ),


                                                    ]),
                                                    m("tr.d-print-none", [

                                                    ]),

                                                ])
                                            ])
                                        ]),


                                    ])

                                ])

                            ] : [
                                m("div.pd-t-10", [
                                    m("div.placeholder-paragraph.wd-100p", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ])
                            ])


                        ])
                    ]),



                ])
            ),


        ];



    }

};


export default StatusContrato;