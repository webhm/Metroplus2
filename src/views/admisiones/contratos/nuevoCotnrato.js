import Auth from '../../../models/auth';
import Encrypt from '../../../models/encrypt';
import HeadPublic from '../../layout/header-public';
import m from 'mithril';

const Uploads = {
    files: [],
    detalle: [],
    error: "",
    showFor: "",
    uploadService: (e) => {
        let postData = new FormData($('#uploadForm')[0]);
        fetch('https://api.hospitalmetropolitano.org/t/v1/procesos/ad/uploads?id=' + NuevoContrato.id, {
            method: "POST",
            body: postData,
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('data = ', data);
            alert('Proceso realizado con éxito');
            m.route.set('/admisiones/contratos/status/?id=' + NuevoContrato.id + '&track=view');
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

                ])




            ]),


        ];



    },
};



const DestinoFinal = {
    view: (_data) => {



        if (_data.attrs.destino_final == 'ALMACENAR') {
            return m("input", {
                "class": "form-control tx-semibold tx-15",
                "type": "text",
                "placeholder": "Destino Final",
                oninput: (e) => {
                    NuevoContrato.data.destino_final = e.target.value;

                }
            })
        } else if (_data.attrs.destino_final == 'ENTR_NUEVA_AREA') {
            return m("input", {
                "class": "form-control tx-semibold tx-15",
                "type": "text",
                "placeholder": "Nueva Área",
                oninput: (e) => {
                    NuevoContrato.data.destino_final = e.target.value;

                }
            })
        } else if (_data.attrs.destino_final == 'PRO_LEGAL') {
            return m('h4.tx-semibold', {
                oncreate: () => {
                    NuevoContrato.data.destino_final = 'PRO_LEGAL';
                }
            }, 'Legalización');
        } else if (_data.attrs.destino_final == 'RET_COLABORADOR') {
            return m('h4.tx-semibold', {
                oncreate: () => {
                    NuevoContrato.data.destino_final = 'RET_COLABORADOR';
                }
            }, 'Entrega Colaborador');
        } else if (_data.attrs.destino_final == 'ENV_GES_AMB') {
            return m('h4.tx-semibold', {
                oncreate: () => {
                    NuevoContrato.data.destino_final = 'ENV_GES_AMB';
                }
            }, 'Envío a Gestor Ambiental');
        } else {
            return m('select.tx-semibold', {
                onchange: (e) => {
                    NuevoContrato.data.destino_final = e.target.value;
                },
                class: "custom-select"
            }, m('option', 'Seleccione...'), ['SISTEMAS', 'MANTENIMIENTO', 'INGENIERIA CLINICA'].map(x =>
                m('option', x)
            ))
        }
    }

};


const NuevoContrato = {
    id: null,
    data: [],
    activos: [],
    examenes: [],
    error: '',
    numeroNuevoContrato: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    autorizado: false,
    user: '',
    pass: '',
    loaderFirma: false,
    oninit: () => {
        NuevoContrato.fetch();

    },

    fetchPaciente: (_nhc) => {

        NuevoContrato.data.pte = 'Procesando...';

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/buscar-paciente",
                body: {
                    pte: _nhc,
                    tipoBusqueda: 'nhc'
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(res) {
                if (res.status) {
                    NuevoContrato.data.pte = res.data[0].APELLIDOS + ' ' + res.data[0].NOMBRES
                }
            })
            .catch(function(e) {
                alert(e)
            })

    },
    fetch: () => {
        NuevoContrato.activos = [];
        NuevoContrato.loader = true;
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    NuevoContrato.loader = false;
                    NuevoContrato.activos = result.data;
                } else {
                    NuevoContrato.error = result.message;
                }

            })
            .catch(function(e) {
                NuevoContrato.fetch();
            })

    },
    sendContrato: () => {


        NuevoContrato.loader = true;

        let _user = Encrypt.getDataUser();
        Auth.user = _user.user;

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/ad/nuevo-contrato",
                body: {
                    fecha: moment().format('DD-MM-YYYY'),
                    nhc: NuevoContrato.data.nhc,
                    adm: NuevoContrato.data.adm,
                    pte: NuevoContrato.data.pte,
                    user: (Auth.user.user !== undefined ? Auth.user.user.toLowerCase() : "")

                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    NuevoContrato.id = result.id;
                    setTimeout(() => {
                        Uploads.uploadService();
                    }, 2000);
                } else {
                    NuevoContrato.error = result.message;
                }
            })
            .catch(function(e) {
                NuevoContrato.fetch();
            })

    },
    firmarTR: () => {

        NuevoContrato.loaderFirma = true;

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr/login-user",
                body: {
                    user: NuevoContrato.user,
                    pass: NuevoContrato.pass,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                NuevoContrato.loaderFirma = false;

                if (result.status && result.data.length !== 0) {
                    alert('Usuario autenticado con éxito.');
                    NuevoContrato.data.usuario = result.data.NOMBRE + ' - ' + result.data.CARGO + ' - ' + result.data.AREA + ' - ' + result.data.CENTRO_COSTO;
                    NuevoContrato.data.email = result.data.EMAIL;
                    NuevoContrato.data.centro_costo = result.data.CENTRO_COSTO;
                } else {
                    alert(result.message);
                }
            })
            .catch(function(e) {
                NuevoContrato.firmarTR();
            })
    },
    view: (_data) => {

        return [
            m(HeadPublic),
            m("div.content.content-components", {},
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [

                    m("h1.df-title.mg-b-10",
                        "Nuevo Contrato: "
                    ),

                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [


                            (NuevoContrato.loader ? [

                                m("div.pd-t-10", [
                                    m("div.placeholder-paragraph.wd-100p", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ])

                            ] : [

                            ]),

                            (NuevoContrato.activos.length !== 0 ? [

                                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", {
                                    class: (NuevoContrato.loader ? 'd-none' : '')
                                }, [
                                    m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [



                                        m('div.table-responsive', [

                                            m('form', {}, [
                                                m("table.table.table-bordered.table-sm.tx-12", [

                                                    m("thead",

                                                        m("tr.bg-litecoin.op-9.tx-white", [
                                                            m("th[scope='col'][colspan='10']",
                                                                "DATOS DEL PACIENTE:"
                                                            ),

                                                        ])
                                                    ),
                                                    m("tbody", [
                                                        m("tr", [
                                                            m("th.tx-semibold.tx-14[colspan='1'][width='20%']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Historia Clínica:"
                                                            ),
                                                            m("td[colspan='9']", {
                                                                    style: { "background-color": "#eaeff5" }
                                                                },
                                                                m("input", {
                                                                    "class": "form-control tx-semibold tx-14",
                                                                    "type": "number",
                                                                    "placeholder": "Historia Clínica",
                                                                    onkeypress: (e) => {
                                                                        if (e.keyCode == 13) {
                                                                            NuevoContrato.fetchPaciente(NuevoContrato.data.nhc);
                                                                        }
                                                                    },
                                                                    oninput: (e) => {
                                                                        NuevoContrato.data.nhc = e.target.value;
                                                                    }

                                                                })
                                                            )
                                                        ]),
                                                        m("tr", [
                                                            m("th.tx-semibold.tx-14[colspan='1'][width='20%']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Nro. de Admisión:"
                                                            ),
                                                            m("td[colspan='9']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },
                                                                m("input", {
                                                                    "class": "form-control tx-semibold tx-14",
                                                                    "type": "number",
                                                                    "placeholder": "Nro. de Admisión",
                                                                    onkeypress: (e) => {
                                                                        if (e.keyCode == 13) {
                                                                            NuevoContrato.fetchPaciente(NuevoContrato.data.nhc);
                                                                        }
                                                                    },
                                                                    oninput: (e) => {
                                                                        NuevoContrato.data.adm = e.target.value;
                                                                    }
                                                                })

                                                            ),
                                                        ]),
                                                        m("tr", [
                                                            m("th.tx-semibold.tx-14[colspan='1']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Paciente:"
                                                            ),
                                                            m("td[colspan='9']", {
                                                                    style: { "background-color": "#eaeff5" }
                                                                },
                                                                m("input", {
                                                                    "class": "form-control tx-semibold tx-14",
                                                                    "type": "text",
                                                                    "placeholder": "Paciente",
                                                                    'disabled': 'disabled',
                                                                    value: (NuevoContrato.data !== undefined && NuevoContrato.data.pte !== undefined ? NuevoContrato.data.pte : '')

                                                                })
                                                            )


                                                        ]),




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

                                                                            " Adjuntos "
                                                                        )
                                                                    ),


                                                                ]),
                                                            ),


                                                        ]),
                                                        m("tr.d-print-none", [

                                                            m("td[colspan='9']", {

                                                                },
                                                                m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                                                    m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                                                                        m(Uploads),
                                                                    ]),


                                                                ])
                                                            ),


                                                        ]),
                                                        m("tr.d-print-none", [

                                                        ]),
                                                        m("tr", [


                                                            m("td[colspan='10']", {
                                                                    style: { "background-color": "#eaeff5" }
                                                                },
                                                                m("div.input-group.mg-t-5",
                                                                    m("button.btn.btn-primary.btn-xs.btn-block.tx-semibold[type='button']", {
                                                                            onclick: (e) => {
                                                                                NuevoContrato.sendContrato();


                                                                            }
                                                                        },
                                                                        "Subir Contrato"
                                                                    )
                                                                )





                                                            ),

                                                        ]),

                                                    ])
                                                ])
                                            ])

                                        ]),


                                    ])

                                ])

                            ] : [

                            ]),






                        ])
                    ]),



                ])
            ),
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

            ])

        ];



    }

};


export default NuevoContrato;