import m from "mithril";
import HeaderPrivate from "../../layout/header-private";
import Sidebarlab from "../sidebarLab";

class Reloj {
    constructor(id) {
        // Guardar el elemento div en una propiedad de la clase
        this.div = document.getElementById(id);
        // Iniciar el intervalo que actualiza el reloj cada segundo
        this.intervalo = setInterval(() => this.actualizar(), 1000);
    }

    // El método actualizar obtiene la hora actual y la muestra en el div
    actualizar() {
        // Obtener la hora, los minutos y los segundos
        let hora = new Date().getHours();
        let minutos = new Date().getMinutes();
        let segundos = new Date().getSeconds();
        // Añadir un cero delante si son menores de 10
        if (hora < 10) hora = "0" + hora;
        if (minutos < 10) minutos = "0" + minutos;
        if (segundos < 10) segundos = "0" + segundos;
        // Formar el texto del reloj con el formato hh:mm:ss
        let texto = hora + ":" + minutos + ":" + segundos;
        // Mostrar el texto en el div
        this.div.textContent = texto;
    }

    // El método detener limpia el intervalo y detiene el reloj
    detener() {
        clearInterval(this.intervalo);
    }
}

class MenuFlebot {
    view() {
        return [
            m(
                "div.content.content-components",
                m(
                    "div.container", {
                    style: { "max-width": "100%" },
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m(
                            "li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, ["MetroPlus"])
                        ),
                        m(
                            "li.breadcrumb-item.active[aria-current='page']",
                            "Laboratorio"
                        ),
                    ]),
                    m("div.d-flex", [
                        m(
                            "div.flex-grow-1",
                            m("h1.df-title.mg-t-20.mg-b-10", [
                                "Laboratorio: ",
                                m(
                                    "span.tx-40.badge.bg-litecoin.pd-10.tx-white.mg-r-10",
                                    InicioFlebo.idToma
                                ),
                                m("i", {
                                    title: " Editar ",
                                    class: "fas fa-edit tx-40 tx-light",
                                    style: "cursor:pointer",
                                    onclick: () => {
                                        InicioFlebo.showConfigToma = !InicioFlebo.showConfigToma;
                                    },
                                }),
                            ])
                        ),

                        m(
                            "div.d-flex.mg-l-auto",

                            m("div[id='reloj'].df-title.mg-t-20.mg-b-10", {
                                oncreate: () => {
                                    return new Reloj("reloj");
                                },
                            }),
                            m("i", {
                                title: " Editar ",
                                class: "fas fa-clock mg-l-4 mg-t-30 tx-32 tx-light",
                            })
                        ),
                    ]),

                    m(
                        "div.mg-t-20.d.flex", {
                        class: InicioFlebo.showConfigToma == undefined ||
                            InicioFlebo.showConfigToma == false ?
                            "d-none" : "",
                    }, [
                        m("fieldset.form-fieldset", [
                            m("legend.pd-2", "MODIFICAR TOMA:"),
                            m("div.tx-30", [
                                m("div.custom-control.custom-radio", [
                                    m(
                                        "input.custom-control-input[type='radio'][id='customRadio1'][name='customRadio']", {
                                        checked: InicioFlebo.idToma == "TOMA1" ? true : false,
                                        onchange: (event) => {

                                            InicioFlebo.idToma = "TOMA1";
                                            localStorage.setItem("peerId", InicioFlebo.idToma);

                                        },
                                    }
                                    ),
                                    m(
                                        "label.custom-control-label[for='customRadio1']",
                                        "TOMA 1"
                                    ),
                                ]),
                                m("div.custom-control.custom-radio", [
                                    m(
                                        "input.custom-control-input[type='radio'][id='customRadio2'][name='customRadio']", {
                                        checked: InicioFlebo.idToma == "TOMA2" ? true : false,
                                        onchange: (event) => {

                                            InicioFlebo.idToma = "TOMA2";
                                            localStorage.setItem("peerId", InicioFlebo.idToma);

                                        },
                                    }
                                    ),
                                    m(
                                        "label.custom-control-label[for='customRadio2']",
                                        "TOMA  2"
                                    ),
                                ]),
                                m("div.custom-control.custom-radio", [
                                    m(
                                        "input.custom-control-input[type='radio'][id='customRadio3'][name='customRadio']", {
                                        checked: InicioFlebo.idToma == "TOMA3" ? true : false,
                                        onchange: (event) => {

                                            InicioFlebo.idToma = "TOMA3";
                                            localStorage.setItem("peerId", InicioFlebo.idToma);

                                        },
                                    }
                                    ),
                                    m(
                                        "label.custom-control-label[for='customRadio3']",
                                        "TOMA  3"
                                    ),
                                ]),
                                m("div.custom-control.custom-radio", [
                                    m(
                                        "input.custom-control-input[type='radio'][id='customRadio4'][name='customRadio']", {
                                        checked: InicioFlebo.idToma == "TOMA4" ? true : false,
                                        onchange: (event) => {

                                            InicioFlebo.idToma = "TOMA4";
                                            localStorage.setItem("peerId", InicioFlebo.idToma);

                                        },
                                    }
                                    ),
                                    m(
                                        "label.custom-control-label[for='customRadio4']",
                                        "TOMA  4"
                                    ),
                                ]),
                                m("div.custom-control.custom-radio", [
                                    m(
                                        "input.custom-control-input[type='radio'][id='customRadio5'][name='customRadio']", {
                                        checked: InicioFlebo.idToma == "TOMA5" ? true : false,
                                        onchange: (event) => {

                                            InicioFlebo.idToma = "TOMA5";
                                            localStorage.setItem("peerId", InicioFlebo.idToma);

                                        },
                                    }
                                    ),
                                    m(
                                        "label.custom-control-label[for='customRadio5']",
                                        "TOMA 5"
                                    ),
                                ]),
                            ]),
                        ]),
                    ]
                    ),

                    m(
                        "div.row.mg-t-20", {
                        class: InicioFlebo.showConfigToma == undefined ||
                            InicioFlebo.showConfigToma == false ?
                            "" : "d-none",
                    }, [
                        m(
                            "li", {
                            class: "list-item bg-success wd-100p",
                            style: { cursor: "pointer" },
                            onclick: () => {
                                m.route.set("/laboratorio/flebotomista");
                            },
                        }, [
                            m("div", { class: "media" }, [
                                m(
                                    "div.wd-60.tx-center", { class: "pd-10 bg-litecoin" },
                                    m("i", { class: "fas fa-flask tx-30 tx-white" })
                                ),
                                m("div", { class: "media-body mg-l-15" }, [
                                    m(
                                        "p", { class: "tx-40 mg-b-0 tx-white" },
                                        "Pendientes"
                                    ),
                                ]),
                            ]),
                        ]
                        ),
                        m(
                            "li.d-none", {
                            class: "list-item bg-white wd-100p",

                        }, [
                            m("div", { class: "media" }, [
                                m(
                                    "div.wd-60.tx-center", { class: "pd-10 bg-litecoin" },
                                    m("i", { class: "fas fa-file-alt tx-30 tx-white" })
                                ),
                                m("div", { class: "media-body mg-l-15" }, [
                                    m("p", { class: "tx-40 mg-b-0" }, "Gestionados"),
                                ]),
                            ]),
                        ]
                        ),

                        m(
                            "li", {
                            class: "list-item bg-white wd-100p",

                        }, [
                            m("div", { class: "media" }, [
                                m(
                                    "div.wd-60.tx-center", { class: "pd-10 bg-litecoin" },
                                    m("i", { class: "fas fa-user tx-30 tx-white" })
                                ),
                                m("div", { class: "media-body mg-l-15" }, [
                                    m("p", { class: "tx-40 mg-b-0" }, [
                                        "Usuario: mchang "

                                    ]),
                                ]),
                            ]),
                        ]
                        ),
                    ]
                    ),
                ]
                )
            ),
        ];
    }
}

// class InicioFlebo extends App {
class InicioFlebo {
    static isConnect = false;
    static peer = null;
    static otherPeer;
    static peerMessage;
    static showConfigToma = false;
    static idToma = "TOMA1";

    constructor() {

        if (localStorage.getItem("peerId") !== undefined) {
            InicioFlebo.idToma = localStorage.getItem("peerId");
        } else {
            localStorage.setItem("peerId", InicioFlebo.idToma);
        }

    }

    getMenu() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve("hello");
                // las para router
            }, 10);
        });
    }



    vMain() {
        return [m(MenuFlebot)];
    }

    view() {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            this.vMain()





        ];
    }
}

export default InicioFlebo;