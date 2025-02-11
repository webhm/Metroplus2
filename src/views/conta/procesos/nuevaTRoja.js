import HeadPublic from '../../layout/header-public';
import m from 'mithril';

const Uploads = {
    files: [],
    detalle: [],
    error: "",
    showFor: "",
    uploadService: (e) => {


        let postData = new FormData($('#uploadForm')[0]);


        fetch('https://api.hospitalmetropolitano.org/t/v1/procesos/tr/uploads?idTR=' + NuevaTRoja.id, {
            method: "POST",
            body: postData,
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('data = ', data);
            alert('Proceso realizado con éxito');
            alert('Tarjeta Roja N°: HM-' + NuevaTRoja.id);
            m.route.set('/contabilidad/proceso/tarjeta-roja/status/?tr=' + NuevaTRoja.id + '&track=view');
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
                    NuevaTRoja.data.destino_final = e.target.value;

                }
            })
        } else if (_data.attrs.destino_final == 'ENTR_NUEVA_AREA') {
            return m("input", {
                "class": "form-control tx-semibold tx-15",
                "type": "text",
                "placeholder": "Nueva Área",
                oninput: (e) => {
                    NuevaTRoja.data.destino_final = e.target.value;

                }
            })
        } else if (_data.attrs.destino_final == 'PRO_LEGAL') {
            return m('h4.tx-semibold', {
                oncreate: () => {
                    NuevaTRoja.data.destino_final = 'PRO_LEGAL';
                }
            }, 'Legalización');
        } else if (_data.attrs.destino_final == 'RET_COLABORADOR') {
            return m('h4.tx-semibold', {
                oncreate: () => {
                    NuevaTRoja.data.destino_final = 'RET_COLABORADOR';
                }
            }, 'Entrega Colaborador');
        } else if (_data.attrs.destino_final == 'ENV_GES_AMB') {
            return m('h4.tx-semibold', {
                oncreate: () => {
                    NuevaTRoja.data.destino_final = 'ENV_GES_AMB';
                }
            }, 'Envío a Gestor Ambiental');
        } else {
            return m('select.tx-semibold', {
                onchange: (e) => {
                    NuevaTRoja.data.destino_final = e.target.value;
                },
                class: "custom-select"
            }, m('option', 'Seleccione...'), ['SISTEMAS', 'MANTENIMIENTO', 'INGENIERIA CLINICA'].map(x =>
                m('option', x)
            ))
        }
    }

};


const NuevaTRoja = {
    id: null,
    data: [],
    activos: [],
    examenes: [],
    error: '',
    numeroNuevaTRoja: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    autorizado: false,
    user: '',
    pass: '',
    loaderFirma: false,
    oninit: () => {
        NuevaTRoja.fetch();

    },
    fetch: () => {
        NuevaTRoja.activos = [];
        NuevaTRoja.loader = true;
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    NuevaTRoja.loader = false;
                    NuevaTRoja.activos = result.data;
                } else {
                    NuevaTRoja.error = result.message;
                }

            })
            .catch(function(e) {
                NuevaTRoja.fetch();
            })

    },
    sendDataTR: () => {



        if (NuevaTRoja.data.accion_sugerida == undefined || NuevaTRoja.data.accion_sugerida.length == 0) {
            alert('Todos los campos son obligatorios (accion_sugerida).');
            throw 'Todos los campos son obligatorios (accion_sugerida).';
        }

        if (NuevaTRoja.data.categoria == undefined || NuevaTRoja.data.categoria.length == 0) {
            alert('Todos los campos son obligatorios (categoria).');
            throw 'Todos los campos son obligatorios (categoria).';
        }

        if (NuevaTRoja.data.marca == undefined || NuevaTRoja.data.marca.length == 0) {
            alert('Todos los campos son obligatorios (marca).');
            throw 'Todos los campos son obligatorios (marca).';
        }

        if (NuevaTRoja.data.modelo == undefined || NuevaTRoja.data.modelo.length == 0) {
            alert('Todos los campos son obligatorios (modelo).');
            throw 'Todos los campos son obligatorios (modelo).';
        }

        if (NuevaTRoja.data.motivo_baja == undefined || NuevaTRoja.data.motivo_baja.length == 0) {
            alert('Todos los campos son obligatorios (motivo_baja).');
            throw 'Todos los campos son obligatorios (motivo_baja).';
        }

        if (NuevaTRoja.data.nombre == undefined || NuevaTRoja.data.nombre.length == 0) {
            alert('Todos los campos son obligatorios (nombre).');
            throw 'Todos los campos son obligatorios (nombre).';
        }

        if (NuevaTRoja.data.serie == undefined || NuevaTRoja.data.serie.length == 0) {
            alert('Todos los campos son obligatorios (serie).');
            throw 'Todos los campos son obligatorios (serie).';
        }


        if (NuevaTRoja.data.act_fijo == undefined || NuevaTRoja.data.act_fijo.length == 0) {
            alert('Todos los campos son obligatorios (activo fijo).');
            alert('Todos los campos son obligatorios (activo fijo).');
        }


        if (NuevaTRoja.data.inf_tec == undefined || NuevaTRoja.data.inf_tec.length == 0) {
            alert('Todos los campos son obligatorios (informe técnico).');
            alert('Todos los campos son obligatorios (informe técnico).');
        }

        if (NuevaTRoja.data.sub_categoria == undefined || NuevaTRoja.data.sub_categoria.length == 0) {
            alert('Todos los campos son obligatorios (sub_categoria).');
            throw 'Todos los campos son obligatorios (sub_categoria).';
        }

        if (NuevaTRoja.data.destino_final == undefined || NuevaTRoja.data.destino_final.length == 0) {
            alert('Todos los campos son obligatorios (destino_final).');
            throw 'Todos los campos son obligatorios (destino_final).';
        }


        if (NuevaTRoja.data.usuario == undefined || NuevaTRoja.data.usuario.length == 0) {
            alert('No existe firma de responsabilidad.');
            throw 'No existe firma de responsabilidad';
        }

        if (Uploads.files !== undefined && Uploads.files == 0) {
            alert('Es necesario adjuntar la documentación requerida.');
            throw 'Es necesario adjuntar la documentación requerida.';
        }

        NuevaTRoja.loader = true;

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr/nueva",
                body: {
                    fecha: moment().format('DD-MM-YYYY'),
                    accion_sugerida: NuevaTRoja.data.accion_sugerida,
                    categoria: NuevaTRoja.data.categoria,
                    area: NuevaTRoja.data.area,
                    marca: NuevaTRoja.data.marca,
                    modelo: NuevaTRoja.data.modelo,
                    motivo_baja: NuevaTRoja.data.motivo_baja,
                    nombre: NuevaTRoja.data.nombre,
                    serie: NuevaTRoja.data.serie,
                    sub_categoria: NuevaTRoja.data.sub_categoria,
                    usuario: NuevaTRoja.data.usuario,
                    email: NuevaTRoja.data.email,
                    destino_final: NuevaTRoja.data.destino_final,
                    centro_costo: NuevaTRoja.data.centro_costo,
                    inf_tec: NuevaTRoja.data.inf_tec,
                    act_fijo: NuevaTRoja.data.act_fijo
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    NuevaTRoja.id = result.idTR;
                    setTimeout(() => {
                        Uploads.uploadService();
                    }, 2000);
                } else {
                    NuevaTRoja.error = result.message;
                }
            })
            .catch(function(e) {
                NuevaTRoja.fetch();
            })

    },
    firmarTR: () => {

        NuevaTRoja.loaderFirma = true;

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr/login-user",
                body: {
                    user: NuevaTRoja.user,
                    pass: NuevaTRoja.pass,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                NuevaTRoja.loaderFirma = false;

                if (result.status && result.data.length !== 0) {
                    alert('Usuario autenticado con éxito.');
                    NuevaTRoja.data.usuario = result.data.NOMBRE + ' - ' + result.data.CARGO + ' - ' + result.data.AREA + ' - ' + result.data.CENTRO_COSTO;
                    NuevaTRoja.data.email = result.data.EMAIL;
                    NuevaTRoja.data.centro_costo = result.data.CENTRO_COSTO;
                } else {
                    alert(result.message);
                }
            })
            .catch(function(e) {
                NuevaTRoja.firmarTR();
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
                        "Nueva Tarjeta Roja: "
                    ),



                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [


                            (NuevaTRoja.loader ? [

                                m("div.pd-t-10", [
                                    m("div.placeholder-paragraph.wd-100p", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ])

                            ] : [

                            ]),

                            (NuevaTRoja.activos.length !== 0 ? [

                                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", {
                                    class: (NuevaTRoja.loader ? 'd-none' : '')
                                }, [
                                    m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [


                                        m("span.pd-6.wd-100p.wd-md-20p", {
                                            class: "badge badge-danger mg-b-2 mg-r-2",
                                        }, [
                                            m("i.fas.fa-file-alt.mg-r-5"),
                                        ], "FOR TARJETA ROJA"),


                                        m('div.table-responsive', [

                                            m('form', {}, [
                                                m("table.table.table-bordered.table-sm.tx-12", [
                                                    m("thead",

                                                        m("tr.bg-litecoin.op-9.tx-white", [
                                                            m("th[scope='col'][colspan='10']",
                                                                "DATOS SOLICITUD:"
                                                            ),

                                                        ])
                                                    ),
                                                    m("tbody", [
                                                        m("tr", [

                                                            m("th.tx-semibold.tx-14[colspan='4'][width='20%']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Fecha de Solicitud:"
                                                            ),
                                                            m("td[colspan='6']", {
                                                                    style: { "background-color": "#eaeff5" }
                                                                },

                                                                m("input", { value: moment().format("dddd, DD-MM-Y"), "class": "form-control tx-semibold tx-15 tx-danger", "type": "text", "disabled": "disabled" })


                                                            ),

                                                        ]),

                                                        m("tr", [

                                                            m("th.tx-semibold.tx-14[colspan='4']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Categoría:"
                                                            ),
                                                            m("td[colspan='6']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },
                                                                m('select.tx-semibold', {
                                                                    onchange: (e) => {
                                                                        NuevaTRoja.data.categoria = e.target.options[e.target.options.selectedIndex].value;
                                                                        NuevaTRoja.data.id_categoria = e.target.options[e.target.options.selectedIndex].id;
                                                                    },
                                                                    class: "custom-select"
                                                                }, m('option', 'Seleccione...'), NuevaTRoja.activos.activos.map(x =>
                                                                    m('option', {
                                                                        id: x.cod_class,
                                                                        value: x.class,
                                                                    }, x.class)
                                                                ))
                                                            )


                                                        ]),
                                                        m("tr", [

                                                            m("th.tx-semibold.tx-14[colspan='4']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Sub. Categoría:"
                                                            ),
                                                            m("td[colspan='6']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },
                                                                m('select.tx-semibold', {
                                                                    onchange: (e) => {
                                                                        NuevaTRoja.data.id_sub_categoria = e.target.options[e.target.options.selectedIndex].id;
                                                                        NuevaTRoja.data.sub_categoria = e.target.options[e.target.options.selectedIndex].value;
                                                                        NuevaTRoja.data.area = e.target.options[e.target.options.selectedIndex].dataset.area;
                                                                    },
                                                                    class: "custom-select"
                                                                }, m('option', 'Seleccione...'), NuevaTRoja.activos.subActivos.map(x =>
                                                                    (x.cod_class == NuevaTRoja.data.id_categoria ? [
                                                                        m('option', {
                                                                                'value': x.class,
                                                                                'id': x.cod_class,
                                                                                'data-area': x.area
                                                                            },
                                                                            x.class
                                                                        )
                                                                    ] : [])
                                                                ))
                                                            )


                                                        ]),


                                                    ]),
                                                    m("thead",

                                                        m("tr.bg-litecoin.op-9.tx-white", [
                                                            m("th[scope='col'][colspan='10']",
                                                                "DATOS DEL EQUIPO:"
                                                            ),

                                                        ])
                                                    ),
                                                    m("tbody", [
                                                        m("tr", [
                                                            m("th.tx-semibold.tx-14[colspan='1']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Nombre:"
                                                            ),
                                                            m("td[colspan='9']", {
                                                                    style: { "background-color": "#eaeff5" }
                                                                },
                                                                m("input", {
                                                                    "class": "form-control tx-semibold tx-14",
                                                                    "type": "text",
                                                                    "placeholder": "Nombre",
                                                                    oninput: (e) => {
                                                                        NuevaTRoja.data.nombre = e.target.value;
                                                                    }
                                                                })
                                                            )
                                                        ]),
                                                        m("tr", [
                                                            m("th.tx-semibold.tx-14[colspan='1']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Marca:"
                                                            ),
                                                            m("td[colspan='9']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },
                                                                m("input", {
                                                                    "class": "form-control tx-semibold tx-14",
                                                                    "type": "text",
                                                                    "placeholder": "Marca",
                                                                    oninput: (e) => {
                                                                        NuevaTRoja.data.marca = e.target.value;
                                                                    }
                                                                })

                                                            ),
                                                        ]),
                                                        m("tr", [
                                                            m("th.tx-semibold.tx-14[colspan='1']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Modelo:"
                                                            ),
                                                            m("td[colspan='9']", {
                                                                    style: { "background-color": "#eaeff5" }
                                                                },
                                                                m("input", {
                                                                    "class": "form-control tx-semibold tx-14",
                                                                    "type": "text",
                                                                    "placeholder": "Modelo",
                                                                    oninput: (e) => {
                                                                        NuevaTRoja.data.modelo = e.target.value;
                                                                    }
                                                                })
                                                            )


                                                        ]),

                                                        m("tr", [

                                                            m("th.tx-semibold.tx-14[colspan='1']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Serie:"
                                                            ),
                                                            m("td[colspan='9']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },
                                                                m("input", {
                                                                    "class": "form-control tx-semibold tx-14",
                                                                    "type": "text",
                                                                    "placeholder": "Serie",
                                                                    oninput: (e) => {
                                                                        NuevaTRoja.data.serie = e.target.value;
                                                                    }
                                                                })

                                                            ),



                                                        ]),
                                                        m("tr", [

                                                            m("th.tx-semibold.tx-14[colspan='1']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "N° de Informe Técnico:"
                                                            ),
                                                            m("td[colspan='9']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },
                                                                m("input", {
                                                                    "class": "form-control tx-semibold tx-14",
                                                                    "type": "text",
                                                                    "placeholder": "N° de Informe Técnico:",
                                                                    oninput: (e) => {
                                                                        NuevaTRoja.data.inf_tec = e.target.value;
                                                                    }
                                                                })

                                                            ),



                                                        ]),
                                                        m("tr", [
                                                            m("th.tx-semibold.tx-14[colspan='1']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "N° de Activo Fijo:"
                                                            ),
                                                            m("td[colspan='9']", {
                                                                    style: { "background-color": "#eaeff5" }
                                                                },
                                                                m("input", {
                                                                    "class": "form-control tx-semibold tx-14",
                                                                    "type": "text",
                                                                    "placeholder": "N° de Activo Fijo",
                                                                    oninput: (e) => {
                                                                        NuevaTRoja.data.act_fijo = e.target.value;
                                                                    }
                                                                })
                                                            ),
                                                        ]),
                                                        m("tr.bg-litecoin.op-9.tx-white", [
                                                            m("th[scope='col'][colspan='10']",
                                                                "MOTIVO DE SOLICITUD:"
                                                            )
                                                        ]),
                                                        m("tr", [
                                                            m("th.tx-semibold.tx-14[colspan='3']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Motivo de Solicitud:"
                                                            ),
                                                            m("td[colspan='7']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            }, [
                                                                m('select.tx-semibold', {
                                                                    onchange: (e) => {
                                                                        NuevaTRoja.data.id_motivo_baja = e.target.options[e.target.options.selectedIndex].id;
                                                                        NuevaTRoja.data.motivo_baja = e.target.options[e.target.options.selectedIndex].value;
                                                                        console.log('data => ', NuevaTRoja.data);
                                                                    },
                                                                    class: "custom-select"
                                                                }, m('option', 'Seleccione...'), [
                                                                    { label: 'NO SE UTILIZA', value: 'NO_SE_UTILIZA' },
                                                                    { label: 'RENOVACIÓN', value: 'RENOVACION' },
                                                                    { label: 'RENOVACIÓN EQUIPO DE COMPUTO', value: 'RENOVACION_EQ_COMPUTO' },
                                                                    { label: 'DAÑO', value: 'DAÑO' },
                                                                    { label: 'PERDIDA', value: 'PERDIDA' }
                                                                ].map(x =>
                                                                    m('option', {
                                                                        id: x.value,
                                                                        value: x.label
                                                                    }, x.label)
                                                                ))
                                                            ]),


                                                        ]),

                                                        m("tr.bg-litecoin.op-9.tx-white.", [
                                                            m("th[scope='col'][colspan='10']",
                                                                "ACCIÓN SUGERIDA:"
                                                            ),

                                                        ]),
                                                        m("tr", [
                                                            m("th.tx-semibold.tx-14[colspan='3']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Acción Sugerida:"
                                                            ),
                                                            m("td[colspan='7']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            }, [
                                                                m('select.tx-semibold', {
                                                                    onchange: (e) => {
                                                                        NuevaTRoja.data.accion_sugerida = e.target.value;
                                                                    },
                                                                    class: "custom-select"
                                                                }, m('option', 'Seleccione...'), NuevaTRoja.activos.motivos.map(x =>
                                                                    (x.motivo_baja == NuevaTRoja.data.id_motivo_baja ? [m('option', {
                                                                        value: x.accion_sugerida
                                                                    }, x.accion_sugerida.replace('_', ' '))] : [])
                                                                ))
                                                            ]),


                                                        ]),
                                                        m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                                            m("th[scope='col'][colspan='10']",
                                                                "OBSERVACIÓN:"
                                                            ),

                                                        ]),
                                                        m("tr", [
                                                            m("th.tx-semibold.tx-14[colspan='3']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Observación:"
                                                            ),
                                                            m("td[colspan='7']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },
                                                                m('div.tx-justify', {}, NuevaTRoja.activos.motivos.map(x =>
                                                                    (x.motivo_baja == NuevaTRoja.data.id_motivo_baja && x.accion_sugerida == NuevaTRoja.data.accion_sugerida ? [
                                                                        m('p.tx-15.tx-semibold.tx-danger', x.obs)
                                                                    ] : [])
                                                                ))
                                                            ),
                                                        ]),

                                                        m("tr", [
                                                            m("th.tx-semibold.tx-14[colspan='3']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Destino Final:"
                                                            ),
                                                            m("td[colspan='7']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },

                                                                m('div', {}, NuevaTRoja.activos.motivos.map(x =>
                                                                    (x.motivo_baja == NuevaTRoja.data.id_motivo_baja && x.accion_sugerida == NuevaTRoja.data.accion_sugerida ? [

                                                                        m(DestinoFinal, { destino_final: x.destino_final })
                                                                    ] : [

                                                                    ])
                                                                ))

                                                            ),


                                                        ]),
                                                        m("tr", [

                                                            m("th.tx-semibold.tx-14[colspan='4']", {
                                                                    style: { "background-color": "#a8bed6" }
                                                                },
                                                                "Responsable:"
                                                            ),
                                                            m("td[colspan='6']", {
                                                                    style: { "background-color": "#eaeff5" }
                                                                },
                                                                m('p.mg-b-0', '*Ingrese Usuario y Contraseña de Directorio Activo (AD), THConmigo etc.'),
                                                                (NuevaTRoja.data.usuario !== undefined ? [
                                                                    m("div.input-group", [

                                                                        m("textarea[rows='3']", {
                                                                                "class": "form-control tx-semibold tx-14",
                                                                                "disabled": "disabled",
                                                                            },
                                                                            NuevaTRoja.data.usuario
                                                                        ),

                                                                    ]),
                                                                    m("div.input-group.mg-t-5",
                                                                        m("button.btn.btn-primary.btn-block.tx-semibold[type='button']", {
                                                                                onclick: (e) => {
                                                                                    NuevaTRoja.sendDataTR();


                                                                                }
                                                                            },
                                                                            "Enviar"
                                                                        )
                                                                    )
                                                                ] : [
                                                                    m("div",
                                                                        (NuevaTRoja.autorizado ? [

                                                                            m("div.pd-t-10", {
                                                                                class: NuevaTRoja.loaderFirma ? '' : 'd-none'
                                                                            }, [
                                                                                m("div.placeholder-paragraph.wd-100p.pd-5", [
                                                                                    m("div.line"),
                                                                                ])
                                                                            ]),
                                                                            m("div.input-group", {
                                                                                class: NuevaTRoja.loaderFirma ? 'd-none' : ''
                                                                            }, [
                                                                                m("input.form-control[type='text'][placeholder='Usuario'][autofocus='true']", {
                                                                                    oninput: (e) => {
                                                                                        NuevaTRoja.user = e.target.value;
                                                                                    }
                                                                                }),
                                                                                m("input.form-control[type='password'][placeholder='Contraseña']", {
                                                                                    oninput: (e) => {
                                                                                        NuevaTRoja.pass = e.target.value;
                                                                                    }
                                                                                }),
                                                                                m("div.input-group.mg-t-5",
                                                                                    m("button.btn.btn-primary.btn-block[type='button']", {
                                                                                            onclick: (e) => {
                                                                                                if (NuevaTRoja.user.length !== 0 && NuevaTRoja.pass.length !== 0) {
                                                                                                    NuevaTRoja.firmarTR();
                                                                                                } else {
                                                                                                    alert('Usuario y Contraseña son obligatorios.');
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        "Validar"
                                                                                    )
                                                                                )
                                                                            ]),

                                                                        ] : [
                                                                            m("button.btn.btn-xs.btn-block.btn-outline-light[type='button']", {
                                                                                    onclick: (e) => {
                                                                                        NuevaTRoja.autorizado = true;
                                                                                    }
                                                                                },
                                                                                m("i.fas.fa-edit.pd-1.mg-r-2"),
                                                                                "Firma de Responsabilidad"
                                                                            ),
                                                                        ])


                                                                    )
                                                                ])






                                                            ),

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
                    "Nueva Tarjeta Roja"
                ),
                m("div.mg-t-10.mg-b-10.bg-white", {

                    },

                    m('a', {
                        href: '/contabilidad/proceso/tarjeta-roja/consultar'
                    }, [
                        m("div.mg-t-10.bg-white",
                            m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                                m("h6.lh-5.mg-b-5",
                                    "Consultar Status"
                                ),

                            ]),
                            m("div.card-body.pd-0", [
                                m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                    m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                        m('i.fas.fa-search.tx-40.tx-success')
                                    ),
                                    m("div", [

                                        m("divv.lh-0.tx-gray-300", 'Tarjeta Roja')
                                    ])

                                ]),

                            ])
                        )

                    ]),
                    m('a', {
                        href: '/contabilidad/proceso/tarjeta-roja/nueva'

                    }, [
                        m("div.mg-t-10.bg-white",
                            m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                                m("h6.lh-5.mg-b-5",
                                    "Nueva Tarjeta"
                                ),

                            ]),
                            m("div.card-body.pd-0", [
                                m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                    m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                        m('i.fas.fa-file.tx-40.tx-primary')
                                    ),
                                    m("div", [

                                        m("divv.lh-0.tx-gray-300", 'Tarjeta Roja')
                                    ])

                                ]),

                            ])
                        )

                    ]),
                    m('a', {
                        href: '/contabilidad/proceso/tarjeta-roja/autorizaciones'

                    }, [
                        m("div.mg-t-10.bg-white",
                            m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                                m("h6.lh-5.mg-b-5",
                                    "Autorizaciones"
                                ),

                            ]),
                            m("div.card-body.pd-0", [
                                m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                    m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                        m('i.fas.fa-check.tx-40.tx-primary')
                                    ),
                                    m("div", [

                                        m("divv.lh-0.tx-gray-300", 'Tarjeta Roja')
                                    ])

                                ]),

                            ])
                        )

                    ]),
                    m('br')




                ),

            ])

        ];



    }

};


export default NuevaTRoja;