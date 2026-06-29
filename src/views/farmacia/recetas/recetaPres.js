import HeaderPrivate from '../../layout/header-private';
import SidebarFarma from '../sidebarFarma';
import App from '../../app';
import m from 'mithril';
import RecetaFarmacias from './recetas';




const Observaciones = {
    observaciones: "",
    data: [],
    obs: "",
    show: false,
    loadObservaciones: () => {
        // MOMMENT
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
            order: false,
            destroy: true,

            columns: false,
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return "";
                    },
                    visible: true,
                    width: "100%",
                    aTargets: [0],
                    orderable: false,
                },

            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
            drawCallback: function(settings) {
                settings.aoData.map(function(_v, _i) {
                    m.mount(_v.anCells[0], {
                        view: function() {
                            return m("div.demo-static-toast",
                                m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", {
                                    "style": { "max-width": "none" }
                                }, [
                                    m("div.toast-header.bg-primary", [
                                        m("small.tx-white.tx-5.mg-b-0.mg-r-auto",
                                            "Observación:"
                                        ),
                                        m("small.tx-white",
                                            moment.unix(_v._aData.timestamp).format("DD-MM-YYYY HH:mm")
                                        ),
                                    ]),
                                    m("div.toast-body.small",
                                        _v._aData.message
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
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/obs-farmacia/" + RecetaFarmacia.numeroDoc,
            })
            .then(function(result) {
                Observaciones.data = result.data;
                Observaciones.loadObservaciones();
            })
            .catch(function(e) {})
    },

    sendObs: () => {
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/obs-farmacia/" + RecetaFarmacia.numeroDoc,
                body: {
                    message: Observaciones.observaciones
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    Observaciones.observaciones = "";
                    Observaciones.fetch();
                    alert('Observación registrada con éxito.')
                }
            })
            .catch(function(e) {

            })


    },
};

const Medicamentos = {

    view: () => {

        if (RecetaFarmacia.medicamentos.length !== 0) {

            return [
                m("thead",
                    m("tr", [
                        m("th",
                            "MEDICACIÓN"
                        ),
                        m("th",
                            "CANT:"
                        ),
                        m("th",
                            "DESP:"
                        ),


                    ])
                ),
                m("tbody", [
                    RecetaFarmacia.medicamentos.map(function(_val, _i, _contentData) {


                        if (_val.DESP.includes('SI')) {
                            return [
                                m("tr", [

                                    m("td.tx-semibold.tx-normal", [
                                        _val.MEDICACION,
                                        m('br'),
                                        m('hr'),

                                    ]),

                                    m("td.tx-semibold.tx-normal",
                                        _val.OBS + '\n' + _val.CANT),
                                    m("td.tx-semibold.tx-normal.bg-danger.tx-white",
                                        _val.DESP),





                                ]),

                            ]

                        } else {
                            return [
                                m("tr", [
                                    m("td.tx-semibold.tx-normal", [
                                        _val.MEDICACION,
                                        m('br'),
                                        (_val.OBS !== null ? m('.d-inline', 'Observaciones:') : ''),
                                        (_val.OBS !== null ? m('br') : ''),
                                        (_val.OBS !== null ? m('.d-inline', _val.OBS) : ''),
                                    ]),
                                    m("td.tx-color-03.tx-normal",
                                        _val.CANT),
                                    m("td.tx-color-03.tx-normal",
                                        _val.DESP),





                                ]),
                            ]
                        }


                    })
                ])
            ];

        }


    }
}

const FOR005 = {
    secs: [],
    nombres: "",
    show: false,
    view: () => {
        let evolucion_medica_texto = "";
        let prescripciones_texto = "";
        let urlFor = "";
        let page = 0;

        if (Formulario.num == 0) {
            setTimeout(function() {
                Formulario.num = Formulario.data.length;
                Formulario.parseFetch();
                m.redraw.sync();
            }, 2000);
        }

        return FOR005.secs.length == 0 ? [
            m(
                "div.pd-10.wd-100p",
                m("div.d-inline.tx-secondary.tx-12", {
                    oncreate: (el) => {
                        el.dom.innerHTML =
                            "Procesando " +
                            Formulario.data.length +
                            " formulario(s) encontrado(s)...";
                    },
                }),
                m("div.placeholder-paragraph", [m("div.line"), m("div.line")])
            ),
        ] : [
            FOR005.secs.map(function(_v, _i, _contentData) {
                if (_v.name == "prescripciones_texto") {
                    prescripciones_texto = _v.answer;
                }

                if (_v.name == "evolucion_medica_texto") {
                    evolucion_medica_texto = _v.answer;
                }

                if (_v.name == "cd_documento_clinico") {
                    urlFor =
                        "http://172.16.253.102/mvpep/api/clinical-documents/" +
                        _v.answer +
                        ".pdf?company=1&department=75";
                }

                if (_v.name == "Logotipo_archivo") {
                    return [
                        m("div.d-inline.tx-secondary.tx-12", {
                            oncreate: (el) => {
                                el.dom.innerHTML =
                                    Formulario.data.length + " formulario(s) encontrado(s).";
                            },
                        }),
                        m(
                            "table.table.table-bordered.wd-100p", {
                                style: {
                                    zoom: Formulario.zoom,
                                },
                            }, [
                                m("thead", [
                                    m(
                                        "tr",
                                        m("th[colspan='12'][scope='col']", [
                                            m("i.tx-light.fas.fa-file-alt.mg-r-2."),
                                            m("div.p-0", " SNS - MSP / HCU-form.005 / 2008 "),
                                        ])
                                    ),
                                    m("tr", [
                                        m(
                                            "th[colspan='10'][scope='col']",
                                            m(
                                                "div.m-0.p-0",
                                                m("img", {
                                                    width: "100rem",
                                                    src: "data:image/png;base64," + _v.answer,
                                                })
                                            )
                                        ),
                                        m(
                                            "th.tx-right[colspan='2'][scope='col']",
                                            m(
                                                "a.tx-right.tx-semibold", {
                                                    href: urlFor,
                                                    target: "_blank",
                                                },
                                                m("i.fas.fa-print.mg-r-2"),
                                                " Imprirmir  "
                                            )
                                        ),
                                    ]),
                                ]),
                                m("tbody", [
                                    m("tr", [
                                        m(
                                            "th[colspan='3'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.tx-bold.text-center.", "ESTABLECIMIENTO")
                                        ),
                                        m(
                                            "th[colspan='3'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.tx-bold.text-center.", "NOMBRE")
                                        ),
                                        m(
                                            "th[colspan='3'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.tx-bold.text-center.", "APELLIDO")
                                        ),
                                        m(
                                            "th[colspan='1'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.tx-bold.text-center.", "SEXO (M-F)")
                                        ),
                                        m(
                                            "th[colspan='1][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.tx-bold.text-center.", "NHCL.")
                                        ),
                                        m(
                                            "th[colspan='1'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.tx-bold.text-center.", "ADM.")
                                        ),
                                    ]),
                                    m("tr", [
                                        m(
                                            "th.text-center[colspan='3'][scope='row']",
                                            m("div.m-0.p-0.text-center", "HOSPITAL METROPOLITANO")
                                        ),
                                        m(
                                            "td.text-center[colspan='3']",
                                            m("div.m-0.p-0.text-center", FOR005.nombres)
                                        ),
                                        m(
                                            "td.text-center[colspan='3']",
                                            m(
                                                "div.m-0.p-0.text-center",
                                                FOR005.apellidos_paciente
                                            )
                                        ),
                                        m(
                                            "td.text-center[colspan='1']",
                                            m("div.m-0.p-0.text-center", FOR005.sexo)
                                        ),
                                        m(
                                            "td.text-center[colspan='1']",
                                            m("div.m-0.p-0.text-center", FOR005.nhcl)
                                        ),
                                        m(
                                            "td.text-center[colspan='1']",
                                            m("div.m-0.p-0.text-center", FOR005.numero_admision)
                                        ),
                                    ]),
                                    m("tr", [
                                        m(
                                            "th[colspan='1'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.m-0.p-0.tx-bold.text-center.", "EDAD")
                                        ),
                                        m(
                                            "th[colspan='1'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m(
                                                "div.m-0.p-0.tx-bold.text-center.",
                                                "IDENTIFICACION"
                                            )
                                        ),
                                        m(
                                            "th[colspan='1'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m(
                                                "div.m-0.p-0.tx-bold.text-center.",
                                                "FECHA ADMISION"
                                            )
                                        ),
                                        m(
                                            "th[colspan='1'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.m-0.p-0.tx-bold.text-center.", "FECHA ALTA")
                                        ),
                                        m(
                                            "th[colspan='4'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.m-0.p-0.tx-bold.text-center.", "UBICACION")
                                        ),
                                        m(
                                            "th[colspan='4'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m(
                                                "div.m-0.p-0.tx-bold.text-center.",
                                                "MEDICO TRATANTE"
                                            )
                                        ),
                                    ]),
                                    m("tr", [
                                        m(
                                            "td.text-center[colspan='1'][scope='row']",
                                            m(
                                                "div.m-0.p-0.text-center",
                                                FOR005.edad || FOR005.edad_paciente
                                            )
                                        ),
                                        m(
                                            "td.text-center[colspan='1']",
                                            m("div.m-0.p-0.text-center", FOR005.identificacion)
                                        ),
                                        m(
                                            "td.text-center[colspan='1']",
                                            m("div.m-0.p-0.text-center", FOR005.fecha_admision)
                                        ),
                                        m(
                                            "td.text-center[colspan='1']",
                                            m("div.m-0.p-0.text-center", FOR005.fecha_admision)
                                        ),
                                        m(
                                            "td.text-center[colspan='4']",
                                            m("div.m-0.p-0.text-center", FOR005.ubicacion)
                                        ),
                                        m(
                                            "td.text-center[colspan='4']",
                                            m("div.m-0.p-0.text-center", FOR005.medico_tratante)
                                        ),
                                    ]),
                                    m("tr", [
                                        m(
                                            "th[colspan='6'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#eef9c8",
                                                },
                                            },
                                            m("div.m-0.p-0.tx-bold.text-center.", "1.- EVOLUCIÓN")
                                        ),
                                        m(
                                            "th[colspan='5'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#eef9c8",
                                                },
                                            },
                                            m(
                                                "div.m-0.p-0.tx-bold.text-center.",
                                                "2.- PRESCRIPCIONES"
                                            )
                                        ),
                                        m(
                                            "th[colspan='1'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#eef9c8",
                                                },
                                            },
                                            m("div.m-0.p-0.tx-bold.text-center.", [
                                                "FIRMAR AL PIE DE",
                                                m("br"),
                                                "CADA PRESCRIPCIÓN",
                                            ])
                                        ),
                                    ]),
                                    m("tr", [
                                        m(
                                            "th[colspan='1'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.m-0.p-0.tx-bold.text-center.", [
                                                "FECHA",
                                                m("br"),
                                                "día/mes/año",
                                            ])
                                        ),
                                        m(
                                            "th[colspan='1'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.m-0.p-0.tx-bold.text-center.", "HORA")
                                        ),
                                        m(
                                            "th[colspan='4'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m(
                                                "div.m-0.p-0.tx-bold.text-center.",
                                                "NOTAS DE EVOLUCIÓN"
                                            )
                                        ),
                                        m(
                                            "th[colspan='4'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.m-0.p-0.tx-bold.text-center.", [
                                                "FARMACOTERAPIA E INDICACIONES",
                                                m("br"),
                                                "(PARA ENFERMERÍA Y OTRO PERSONAL)",
                                            ])
                                        ),
                                        m(
                                            "th[colspan='2'][scope='row']", {
                                                style: {
                                                    padding: "0",
                                                    "background-color": "#edfbf5",
                                                },
                                            },
                                            m("div.m-0.p-0.tx-bold.text-center.", [
                                                "ADMINISTR.",
                                                m("br"),
                                                "FÁRMACOS INSUMOS",
                                            ])
                                        ),
                                    ]),
                                    m("tr", [
                                        m(
                                            "td[colspan='6'][scope='row']", { style: { padding: "0", width: "50%" } },
                                            m(
                                                "div.m-0.p-2.tx-bold.text-justify",
                                                evolucion_medica_texto !== null &&
                                                evolucion_medica_texto.length !== 0 ?
                                                m.trust(
                                                    evolucion_medica_texto.replace(
                                                        /(\r\n|\r|\n)/g,
                                                        "<br/>"
                                                    )
                                                ) :
                                                ""
                                            )
                                        ),
                                        m(
                                            "td[colspan='6'][scope='row']", { style: { padding: "0", width: "50%" } },
                                            m(
                                                "div.m-0.p-2.text-justify",
                                                prescripciones_texto !== null &&
                                                prescripciones_texto.length !== 0 ?
                                                m.trust(
                                                    prescripciones_texto.replace(
                                                        /(\r\n|\r|\n)/g,
                                                        "<br/>"
                                                    )
                                                ) :
                                                ""
                                            )
                                        ),
                                    ]),
                                ]),
                            ]
                        ),
                    ];
                }
            }),
        ];
    },
};

const Formulario = {
    zoom: 0,
    adm: 1,
    nhc: 1,
    num: 0,
    data: [],
    error: "",
    parseDoc: (_data) => {
        Object.keys(_data.data).map(function(_v, _i, _contentData) {
            FOR005.secs.push(_data.data[_v]);
        });

        return FOR005.secs.map(function(_v, _i, _contentData) {
            if (_v.name == "nombres") {
                FOR005.nombres = _v.answer;
            }

            if (_v.name == "apellidos_paciente") {
                FOR005.apellidos_paciente = _v.answer;
            }

            if (_v.name == "sexo de paciente") {
                FOR005.sexo = _v.answer;
            }

            if (_v.name == "nhcl") {
                FOR005.nhcl = _v.answer;
            }

            if (_v.name == "numero_admision") {
                FOR005.numero_admision = _v.answer;
            }

            if (_v.name == "edad") {
                FOR005.edad = _v.answer;
            }

            if (_v.name == "edad_paciente") {
                FOR005.edad_paciente = _v.answer;
            }

            if (_v.name == "identificacion_paciente") {
                FOR005.identificacion = _v.answer;
            }

            if (_v.name == "fecha_admision") {
                FOR005.fecha_admision = _v.answer;
            }

            if (_v.name == "ubicacion_atencion") {
                FOR005.ubicacion = _v.answer;
            }

            if (_v.name == "fecha_alta") {
                FOR005.fecha_alta = _v.answer == null ? "" : _v.answer;
            }

            if (_v.name == "medico_tratante") {
                FOR005.medico_tratante = _v.answer;
            }
        });
    },
    parseFetch: () => {
        FOR005.secs = [];

        return Formulario.data.map(function(_v, _i, _contentData) {
            Formulario.parseDoc(Formulario.data[_i]);
        });
    },
    fetch: () => {
        Formulario.data = [];
        Formulario.error = "";
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/formulario?nhcl=" +
                    Formulario.nhc +
                    "&adm=" +
                    Formulario.adm,

                headers: {
                    Authorization: localStorage.accessToken,
                },
            })
            .then(function(result) {
                if (result.length !== 0) {
                    Formulario.data = result;
                    Formulario.num = 0;
                    m.redraw();
                } else {
                    Formulario.error = "El documento solicitado no esta disponible.";
                }
            })
            .catch(function(e) {
                setTimeout(function() {
                    Formulario.fetch();
                }, 5000);
            });
    },

    view: () => {
        return Formulario.error ? [m(".alert.alert-danger[role='alert']", Formulario.error)] :
            Formulario.data.length !== 0 ? [m(FOR005)] : [
                m("div.d-inline.tx-secondary.tx-12", {
                    oncreate: (el) => {
                        el.dom.innerHTML = "Buscando información...";
                    },
                }),
                m(
                    "div.pd-10.wd-100p",
                    m("div.placeholder-paragraph", [m("div.line"), m("div.line")])
                ),
            ];
    },
};

const Evoluciones = {
    data: [],
    detalle: [],
    error: "",
    showFor: "",

    fetch: () => {
        Evoluciones.data = [];
        Evoluciones.error = "";
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/ev-paciente",
                body: {
                    numeroHistoriaClinica: RecetaFarmacia.numeroHistoriaClinica + "01",
                },
                headers: {
                    Authorization: localStorage.accessToken,
                },
            })
            .then(function(result) {
                if (result.status) {
                    Evoluciones.data = result.data;
                    Formulario.adm = Evoluciones.data[0].ADM;
                    Formulario.nhc = Evoluciones.data[0].NHCL;
                    Formulario.fetch();
                } else {
                    Evoluciones.error = result.message;
                }
            })
            .catch(function(e) {
                setTimeout(function() {
                    Evoluciones.fetch();
                }, 5000);
            });
    },
    view: () => {
        return Evoluciones.error ? [m(".alert.alert-danger[role='alert']", Evoluciones.error)] :
            Evoluciones.data.length !== 0 ? [m(Formulario)] : [
                m(
                    "div.pd-10.wd-100p",
                    m("div.placeholder-paragraph", [m("div.line"), m("div.line")])
                ),
            ];
    },
};

const RecetaFarmacia = {
    data: [],
    medicamentos: [],
    despachoParcial: false,
    despachoTotal: false,
    error: '',
    numeroReceta: '',
    numeroDoc: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    oninit: (_data) => {

        if (_data.attrs.numeroDoc !== undefined) {
            document.title = "Detalle de Prescripción N°: " + _data.attrs.numeroDoc + " | " + App.title;

            if (RecetaFarmacia.data !== undefined && RecetaFarmacia.data.length == 0) {
                RecetaFarmacia.numeroDoc = _data.attrs.numeroDoc;
                RecetaFarmacia.numeroAtencion = _data.attrs.numeroAtencion;
                RecetaFarmacia.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
                RecetaFarmacia.fetch();
            } else {
                if (RecetaFarmacia.numeroDoc !== _data.attrs.numeroDoc) {
                    RecetaFarmacia.numeroDoc = _data.attrs.numeroDoc;
                    RecetaFarmacia.numeroAtencion = _data.attrs.numeroAtencion;
                    RecetaFarmacia.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
                    RecetaFarmacia.fetch();
                    // Receta Detalle 
                }

            }
        }
    },
    fetch: () => {
        RecetaFarmacia.data = [];
        RecetaFarmacia.loader = true;
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/status-receta-prescripcion",
                body: {
                    numeroReceta: RecetaFarmacia.numeroDoc,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {

                    result.data = result.data[0];
                    RecetaFarmacia.loader = false;
                    RecetaFarmacia.data = result.data;
                    RecetaFarmacia.despachoTotal = (RecetaFarmacia.data.STATUS_DESPACHO == 1 ? true : false);
                    RecetaFarmacia.despacho = (RecetaFarmacia.data.STATUS_DESPACHO == 1 ? true : false);
                    RecetaFarmacia.medicamentos = result.data.DATA;
                    Evoluciones.fetch();
                    Observaciones.fetch();
                } else {
                    RecetaFarmacia.error = result.message;
                }

            })
            .catch(function(e) {

            })

    },
    checkDespacho: () => {
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/check-receta",
                body: {
                    numeroAtencion: RecetaFarmacia.numeroAtencion,
                    numeroDoc: RecetaFarmacia.numeroDoc,
                    numeroReceta: RecetaFarmacia.numeroDoc,
                    status: (RecetaFarmacia.despachoTotal == true ? 'TOTAL' : (RecetaFarmacia.despachoParcial == true ? 'PARCIAL' : '')),
                    obs: Observaciones.observaciones
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                RecetaFarmacia.data.FECHA_DESPACHO = result.FECHA_DESPACHO;
            })
            .catch(function(e) {

            })
    },
    view: (_data) => {

        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("farmacia") }),
            m(SidebarFarma, { oncreate: SidebarFarma.setPage(5) }),
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
                            m(m.route.Link, { href: "/farmacia" }, [
                                "Farmacia"
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "DETALLE DE PRESCRIPCIÓN"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Detalle de Prescripción N°: " + RecetaFarmacia.numeroDoc
                    ),


                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("div.table-loader.wd-100p", {
                                    oncreate: (el) => {
                                        if (RecetaFarmacia.loader) {
                                            el.dom.hidden = false;
                                        } else {
                                            el.dom.hidden = true;

                                        }
                                    },
                                    onupdate: (el) => {
                                        if (RecetaFarmacia.loader) {
                                            el.dom.hidden = false;
                                        } else {
                                            el.dom.hidden = true;

                                        }
                                    }

                                }, [
                                    m("div.placeholder-paragraph", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ]


                            ),

                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", {
                                oncreate: (el) => {
                                    if (RecetaFarmacia.loader) {
                                        el.dom.hidden = true;
                                    } else {
                                        el.dom.hidden = false;

                                    }
                                },
                                onupdate: (el) => {
                                    if (RecetaFarmacia.loader) {
                                        el.dom.hidden = true;
                                    } else {
                                        el.dom.hidden = false;

                                    }
                                }
                            }, [


                                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                                    ((RecetaFarmacia.despacho) ? [
                                        m("span.pd-6.wd-100p.wd-md-20p", {
                                            class: "badge badge-success mg-b-2 mg-r-2",
                                        }, [], "Despachado"),

                                    ] : [

                                        m("span.pd-6.wd-100p.wd-md-20p", {
                                            class: "badge badge-light mg-b-2 mg-r-2",
                                        }, [], "Pendiente"),

                                    ]),
                                    m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                                        m("small.pd-2.tx-20",
                                            m("i.fas.fa-times-circle.pd-2", {
                                                    "style": { "cursor": "pointer" },
                                                    title: "Cerrar",
                                                    onclick: () => {


                                                        if (RecetaFarmacias.idFiltro !== undefined && RecetaFarmacias.idFiltro > 1) {
                                                            RecetaFarmacias.pedidos = [];
                                                            m.route.set('/farmacia/recetas-hdia/', {
                                                                idFiltro: RecetaFarmacias.idFiltro,
                                                                fechaDesde: RecetaFarmacias.fechaDesde,
                                                                fechaHasta: RecetaFarmacias.fechaHasta,
                                                            });

                                                        } else {
                                                            RecetaFarmacias.pedidos = [];
                                                            m.route.set('/farmacia/recetas-hdia/', {
                                                                idFiltro: 1,
                                                            });

                                                        }




                                                    }
                                                }

                                            )


                                        ),

                                    ),





                                    m('div.table-responsive', [
                                        m("table.table.table-bordered.table-sm.tx-12", [
                                            m("thead",

                                                m("tr.bg-litecoin.op-9.tx-white", [
                                                    m("th[scope='col'][colspan='9']",
                                                        "DATOS PRESCRIPCIÓN:"
                                                    ),

                                                ])
                                            ),
                                            m("tbody", [
                                                m("tr", [
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "N° de Prescripción:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        RecetaFarmacia.data.CD_DOCUMENTO_CLINICO
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Fecha:"
                                                    ),
                                                    m("td[colspan='2']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        RecetaFarmacia.data.DT_ATENDIMENTO

                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "N° de Atención:"
                                                    ),
                                                    m("td[colspan='3']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        RecetaFarmacia.data.CD_ATENDIMENTO
                                                    ),

                                                ]),


                                            ]),
                                            m("thead",

                                                m("tr.bg-litecoin.op-9.tx-white", [
                                                    m("th[scope='col'][colspan='9']",
                                                        "DATOS DEL PACIENTE:"
                                                    ),

                                                ])
                                            ),
                                            m("tbody", [
                                                m("tr", [
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Apellidos y Nombres:"
                                                    ),
                                                    m("td[colspan='4']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        RecetaFarmacia.data.NM_PACIENTE
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "NHC:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        RecetaFarmacia.data.CD_PACIENTE

                                                    ),

                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Ubicación:"
                                                    ),
                                                    m("td[colspan='2']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        RecetaFarmacia.data.UBICACION
                                                    ),

                                                ]),

                                                m("tr.bg-litecoin.op-9.tx-white", [
                                                    m("th[scope='col'][colspan='9']",
                                                        "MEDICAMENTOS Y OBSERVACIONES:"
                                                    ),

                                                ]),
                                                m("tr", [
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Medicamentos:"
                                                    ),
                                                    m("td.pd-0[colspan='8']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        m(Medicamentos)
                                                    ),


                                                ]),

                                                m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                                    m("th[scope='col'][colspan='9']",
                                                        "DESPACHO Y PRESCRIPCIONES:"
                                                    ),

                                                ]),
                                                m("tr.d-print-none", [

                                                    m("td[colspan='9']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        m("ul.nav.nav-tabs[id='myTab'][role='tablist']", [
                                                            m("li.nav-item.d-none",
                                                                m("a.nav-link[target='_target'][href='" + RecetaFarmacia.data.URL + "']", {
                                                                        style: { "color": "#476ba3" }
                                                                    },
                                                                    m("i.fas.fa-file-alt.pd-1.mg-r-2"),

                                                                    " Ver Prescripción "
                                                                )
                                                            ),
                                                            m(
                                                                "li.nav-item",
                                                                m(
                                                                    "a.nav-link[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']", {
                                                                        style: { color: "#476ba3" },
                                                                    },
                                                                    m(
                                                                        "i.fas.fa-file-alt.pd-1.mg-r-2"
                                                                    ),

                                                                    " HOJA 005"
                                                                )
                                                            ),
                                                            m("li.nav-item",
                                                                m("a.nav-link[id='home-comment'][data-toggle='tab'][href='#comment'][role='tab'][aria-controls='comment']", {
                                                                        style: { "color": "#476ba3" }
                                                                    },
                                                                    m("i.fas.fa-inbox.pd-1.mg-r-2"),

                                                                    " Despacho "
                                                                )
                                                            ),


                                                        ]),
                                                    ),


                                                ]),
                                                m("tr.d-print-none", [

                                                    m("td[colspan='9']", {

                                                        },
                                                        m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                                            m(
                                                                ".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [m(Evoluciones)]
                                                            ),
                                                            m(".tab-pane.fade[id='comment'][role='tabpanel'][aria-labelledby='home-comment']", [
                                                                m("p.mg-5", [
                                                                    m("span.badge.badge-light.wd-100p.tx-14",
                                                                        "Despacho Farmacia",
                                                                    ),
                                                                    m("tr", [

                                                                        m("td.tx-18.tx-medium.text-left", [
                                                                                "¿Confirmar despacho parcial?:",
                                                                                m('br'),
                                                                                "¿Confirmar despacho total?:",
                                                                            ]

                                                                        ),

                                                                        m("td.tx-16.tx-normal",
                                                                            m("div.custom-control.custom-checkbox.tx-16", [
                                                                                m("input.custom-control-input.tx-16[type='checkbox'][id='check_despacho_parcial']", {
                                                                                    checked: RecetaFarmacia.despachoParcial,
                                                                                    onclick: function(e) {
                                                                                        e.preventDefault();
                                                                                        let p = this.checked;
                                                                                        if (p) {
                                                                                            this.checked = true;
                                                                                            RecetaFarmacia.despachoParcial = true;
                                                                                            RecetaFarmacia.checkDespacho();
                                                                                        } else {
                                                                                            this.checked = false;
                                                                                            RecetaFarmacia.despachoParcial = false;
                                                                                            RecetaFarmacia.checkDespacho();
                                                                                        }

                                                                                    },



                                                                                }),
                                                                                m("label.custom-control-label.tx-16[for='check_despacho_parcial']",
                                                                                    (RecetaFarmacia.despachoParcial ? ["SI a las: " + RecetaFarmacia.data.FECHA_DESPACHO] : ["SI"])

                                                                                )
                                                                            ]),
                                                                            m("div.custom-control.custom-checkbox.tx-16", [
                                                                                m("input.custom-control-input.tx-16[type='checkbox'][id='check_despacho_total']", {
                                                                                    checked: RecetaFarmacia.despachoTotal,
                                                                                    onclick: function(e) {
                                                                                        e.preventDefault();
                                                                                        let p = this.checked;
                                                                                        if (p) {
                                                                                            this.checked = true;
                                                                                            RecetaFarmacia.despachoTotal = true;
                                                                                            RecetaFarmacia.checkDespacho();
                                                                                        } else {
                                                                                            this.checked = false;
                                                                                            RecetaFarmacia.despachoTotal = false;
                                                                                            RecetaFarmacia.checkDespacho();
                                                                                        }

                                                                                    },



                                                                                }),
                                                                                m("label.custom-control-label.tx-16[for='check_despacho_total']",
                                                                                    (RecetaFarmacia.despachoTotal ? ["SI a las: " + RecetaFarmacia.data.FECHA_DESPACHO] : ["SI"])

                                                                                )
                                                                            ])
                                                                        ),
                                                                    ]),

                                                                ]),
                                                                m("p.mg-5", [
                                                                    m("span.badge.badge-light.wd-100p.tx-14",
                                                                        "Observaciones",
                                                                    ),
                                                                    m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                                                                        oninput: function(e) { Observaciones.observaciones = e.target.value; },
                                                                        value: Observaciones.observaciones,
                                                                    }),
                                                                    m("div.mg-0.mg-t-5.text-right", [

                                                                        m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                                            onclick: function() {
                                                                                if (Observaciones.observaciones.length !== 0) {
                                                                                    Observaciones.sendObs();
                                                                                } else {
                                                                                    alert("Observaciones es obligatorio.");
                                                                                }
                                                                            },
                                                                        }, [
                                                                            m("i.fas.fa-save.mg-r-5", )
                                                                        ], "Guardar"),


                                                                    ]),
                                                                    m("hr.wd-100p.mg-t-5.mg-b-5"),

                                                                ]),
                                                                m("p.mg-5", [
                                                                    m("span.badge.badge-light.wd-100p.tx-14",
                                                                        "Historial de Observaciones",
                                                                    ),
                                                                    m("table.table.table-sm[id='table-observaciones'][width='100%']")
                                                                ]),
                                                            ]),

                                                        ]),

                                                    ),


                                                ]),
                                                m("tr.d-print-none", [

                                                ]),

                                            ])
                                        ])
                                    ]),


                                ])


                            ])
                        ])
                    ]),



                ])
            ),

        ];



    }

};


export default RecetaFarmacia;