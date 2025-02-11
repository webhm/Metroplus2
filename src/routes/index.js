// Pages here Metroplus v1
import App from '../views/app'
import RedirMV from '../views/redir'
import Salir from '../views/salir'
import Login from '../views/login/login'
import Laboratorio from '../views/laboratorio/laboratorio'
import NotificacionesLab from '../views/laboratorio/notificaciones/notificaciones'
import SubscribirCanal from '../models/subscribirCanal'
import FiltrosLab from '../views/laboratorio/notificaciones/filtros'
import NotificacionesEnviadasLab from '../views/laboratorio/notificaciones/enviadas'
import LaboratorioPedidos from '../views/laboratorio/flebotomista/flebotomista'
import LisaPedidosIngresadosBcoSangre from '../views/bcosangre/lisa/pedidosIngresados'
import LisaPedidoIngresadosBcoSangre from '../views/bcosangre/lisa/pedidoLisa'
import LisaPedidosIngresados from '../views/lisa/pedidosIngresados'
import LisaPedido from '../views/lisa/pedidoLisa'
import LaboratorioFormularios from '../views/laboratorio/formularios/formularios'
import MiPerfil from '../views/perfil/perfil';
import _404 from '../views/404';
import Inicio from '../views/inicio/inicio';
import ReloadNotification from '../views/layout/reload-notificacion';
import Emergencia from '../views/emergencia/emergencia'
import EmergenciaAuxiliarPedidosLaboratorio from '../views/emergencia/auxiliar/pedidos'
import VerPedidoAuxiliarEmergencia from '../views/emergencia/auxiliar/verPedido'
import EmergenciaEnfermeriaPedidosLaboratorio from '../views/emergencia/enfermeria/pedidos'
import VerPedidoEnfermeriaEmergencia from '../views/emergencia/enfermeria/verPedido'
import Farmacia from '../views/farmacia//farmacia'
import Admisiones from '../views/admisiones/admisiones'
import PreAdmisiones from '../views/admisiones/pacientes/preadmisiones'
import Mantenimiento from '../views/mantenimiento/mantenimiento'
import IntegracionHigienizacion from '../views/mantenimiento/higienizacion/higienizacion'
import Hospitalizacion from '../views/hospitalizacion/hospitalizacion'
import Pasaportes from '../views/hospitalizacion/pasaportes/pasaportes'
import ControlCamas from '../views/hospitalizacion/controlCamas/camas'
import NotificacionesPendientesLab from '../views/laboratorio/notificaciones/pendientes'
import NotificacionesErroresLab from '../views/laboratorio/notificaciones/errores'
import TRPedidos from '../views/tr/pedidos/pedidos'
import BSPedidos from '../views/laboratorio/notificaciones/bs'
import NeuroPedidos from '../views/neuro/pedidos/pedidos'
import ImagenPedidos from '../views/imagen/pedidos/pedidos'
import ImagenPedido from '../views/imagen/pedidos/pedido'
import Imagen from '../views/imagen/imagen'
import Neuro from '../views/neuro/neuro'
import NeuroPedido from '../views/neuro/pedidos/pedido'
import TerapiaRespiratoria from '../views/tr/tr'
import TRPedido from '../views/tr/pedidos/pedido'
import HeaderPrivate from '../views/layout/header-private';
import Endoscopia from '../views/endoscopia/endoscopia'
import EndoscopiaPedidos from '../views/endoscopia/pedidos/pedidos'
import EndoPedido from '../views/endoscopia/pedidos/pedido'
import PedidoFlebotomista from '../views/laboratorio/flebotomista/pedidoFlebotomista'
import Etiquetas from '../views/admisiones/etiquetas/etiquetas'
import Recetas from '../views/farmacia/recetas/recetas'
import RecetaFarmacia from '../views/farmacia/recetas/receta'
import EtiCajas from '../views/laboratorio/etiquetas/etiCajas'
import Conta from '../views/conta/conta'
import AgendaImagen from '../views/imagen/agenda/agenImagen'
import TRoja from '../views/conta/procesos/troja'
import NuevaTRoja from '../views/conta/procesos/nuevaTRoja'
import NSSImagen from '../views/imagen/nss/nss'
import HeaderCalendar from '../views/layout/header-calendar'
import DetalleCita from '../views/imagen/agenda/detalleCita'
import NuevaCita from '../views/imagen/agenda/nuevaCita'
import AuthTR from '../views/conta/procesos/autorizarTR'
import AutorizacionesTR from '../views/conta/procesos/autorizacionesTR'
import StatusTR from '../views/conta/procesos/statusTR'
import InicioTR from '../views/conta/procesos/inicioTR'
import ConsultarTr from '../views/conta/procesos/consultarTR'
import HeadPublic from '../views/layout/header-public'
import TerapiaFisica from '../views/tf/tf'
import Cardio from '../views/cardio/cardio'
import PedidosTF from '../views/tf/pedidos/pedidos'
import PedidosCardio from '../views/cardio/pedidos/pedidos'
import BcoSangre from '../views/bcosangre/bcosangre'
import PedidosBcoSangre from '../views/bcosangre/pedidos/pedidos'
import PedidoTF from '../views/tf/pedidos/pedido'
import NotificacionesPorEnviarLab from '../views/laboratorio/notificaciones/porenviar'
import BcoPedido from '../views/bcosangre/pedidos/pedido'
import InicioFlebo from '../views/laboratorio/flebotomista/inicioFlebo'
import ContratosAd from '../views/admisiones/contratos/contratos'
import NuevoContrato from '../views/admisiones/contratos/nuevoCotnrato'
import StatusContrato from '../views/admisiones/contratos/statusContrato'



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

// Routes here
const Routes = {
    '/': App,
    '/subscribir/notificaciones': SubscribirCanal, //SubscribirCanal
    '/redir/mv/:idAtencion': RedirMV, //RedirMV
    '/inicio': Inicio,
    '/laboratorio': Laboratorio, //Laboratorio
    '/laboratorio/lisa/pedidos/ingresados': {
        oninit: (_data) => {

            App.isAuth('laboratorio', 16);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && (_data.attrs.fechaDesde == undefined || _data.attrs.fechaHasta == undefined)) {
                return m.route.set('/laboratorio/lisa/pedidos/ingresados/', { idFiltro: 1 })
            }

            LisaPedidosIngresados.idFiltro = _data.attrs.idFiltro;

            if (LisaPedidosIngresados.idFiltro === 1 && LisaPedidosIngresados.pedidos.length == 0) {
                LisaPedidosIngresados.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                LisaPedidosIngresados.fechaHasta = moment().format('DD-MM-YYYY');
                LisaPedidosIngresados.loader = true;
                LisaPedidosIngresados.pedidos = [];
                LisaPedidosIngresados.fetchPedidosIngresados();
            }

            if (LisaPedidosIngresados.idFiltro !== 1 && LisaPedidosIngresados.pedidos.length == 0) {
                LisaPedidosIngresados.fechaDesde = _data.attrs.fechaDesde;
                LisaPedidosIngresados.fechaHasta = _data.attrs.fechaHasta;
                LisaPedidosIngresados.loader = true;
                LisaPedidosIngresados.pedidos = [];
                LisaPedidosIngresados.fetchPedidosIngresados();
            }

        },
        onremove: (_data) => {
            LisaPedidosIngresados.loader = true;
            LisaPedidosIngresados.pedidos = [];
        },
        onupdate: (_data) => {

            LisaPedidosIngresados.idFiltro = _data.attrs.idFiltro;

            if (LisaPedidosIngresados.idFiltro === 1 && LisaPedidosIngresados.pedidos.length == 0) {
                LisaPedidosIngresados.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                LisaPedidosIngresados.fechaHasta = moment().format('DD-MM-YYYY');
                LisaPedidosIngresados.loader = true;
                LisaPedidosIngresados.pedidos = [];
                LisaPedidosIngresados.fetchPedidosIngresados();
            }

            if (LisaPedidosIngresados.idFiltro !== 1 && LisaPedidosIngresados.pedidos.length == 0) {
                LisaPedidosIngresados.fechaDesde = _data.attrs.fechaDesde;
                LisaPedidosIngresados.fechaHasta = _data.attrs.fechaHasta;
                LisaPedidosIngresados.loader = true;
                LisaPedidosIngresados.pedidos = [];
                LisaPedidosIngresados.fetchPedidosIngresados();
            }

        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
                m(LisaPedidosIngresados),
            ];
        },

    }, //Laboratorio Lisa Pedidos Ingresados
    '/laboratorio/lisa/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined && _data.idTimeRecord !== undefined) {
                return LisaPedido;
            } else {
                return m.route.SKIP;
            }
        }
    }, //LisaPedido
    '/laboratorio/notificaciones': NotificacionesLab, //NotificacionesLab
    '/laboratorio/notificaciones/filtros': FiltrosLab, //FiltrosLab
    '/laboratorio/notificaciones/porenviar': {
        oninit: (_data) => {

            App.isAuth('laboratorio', 15);
            document.title = "Notificaciones por Enviar | " + App.title;

            if (_data.attrs.idFiltro == undefined && (_data.attrs.fechaDesde == undefined || _data.attrs.fechaHasta == undefined)) {

                return m.route.set('/laboratorio/notificaciones/porenviar/', { idFiltro: 1 })

            } else {

                if (_data.attrs.fechaDesde == undefined && _data.attrs.fechaHasta == undefined) {
                    NotificacionesPorEnviarLab.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    NotificacionesPorEnviarLab.fechaHasta = moment().format('DD-MM-YYYY');
                } else {

                    if (_data.attrs.fechaDesde !== undefined && _data.attrs.fechaHasta !== undefined) {
                        NotificacionesPorEnviarLab.fechaDesde = _data.attrs.fechaDesde;
                        NotificacionesPorEnviarLab.fechaHasta = _data.attrs.fechaHasta;
                    } else {
                        return m.route.set('/laboratorio/notificaciones/enviadas/', { idFiltro: 1 })
                    }

                    NotificacionesPorEnviarLab.fechaDesde = _data.attrs.fechaDesde;
                    NotificacionesPorEnviarLab.fechaHasta = _data.attrs.fechaHasta;
                }


                if (NotificacionesPorEnviarLab.NotificacionesPorEnviarLab.length == 0 && NotificacionesPorEnviarLab.error.length == 0) {

                    NotificacionesPorEnviarLab.idFiltro = _data.attrs.idFiltro;
                    NotificacionesPorEnviarLab.loader = true;
                    NotificacionesPorEnviarLab.NotificacionesPorEnviarLab = [];
                    NotificacionesPorEnviarLab.fetchNotificacionesPorEnviarLab();

                }

            }


        },
        onupdate: (_data) => {


            if (_data.attrs.fechaDesde == undefined && _data.attrs.fechaHasta == undefined) {
                NotificacionesPorEnviarLab.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                NotificacionesPorEnviarLab.fechaHasta = moment().format('DD-MM-YYYY');
            } else {
                NotificacionesPorEnviarLab.fechaDesde = _data.attrs.fechaDesde;
                NotificacionesPorEnviarLab.fechaHasta = _data.attrs.fechaHasta;
            }


            if (_data.attrs.idFiltro !== NotificacionesPorEnviarLab.idFiltro) {


                NotificacionesPorEnviarLab.idFiltro = _data.attrs.idFiltro;
                NotificacionesPorEnviarLab.loader = true;
                NotificacionesPorEnviarLab.NotificacionesPorEnviarLab = [];
                NotificacionesPorEnviarLab.fetchNotificacionesPorEnviarLab();

            }


        },

        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
                m(NotificacionesPorEnviarLab),
            ];
        },
    }, //NotificacionesPorEnviarLab
    '/laboratorio/notificaciones/enviadas': {
        oninit: (_data) => {

            App.isAuth('laboratorio', 15);
            document.title = "Notificaciones Enviadas | " + App.title;

            if (_data.attrs.idFiltro == undefined && (_data.attrs.fechaDesde == undefined || _data.attrs.fechaHasta == undefined)) {

                return m.route.set('/laboratorio/notificaciones/enviadas/', { idFiltro: 1 })

            } else {

                if (_data.attrs.fechaDesde == undefined && _data.attrs.fechaHasta == undefined) {
                    NotificacionesEnviadasLab.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    NotificacionesEnviadasLab.fechaHasta = moment().format('DD-MM-YYYY');
                } else {

                    if (_data.attrs.fechaDesde !== undefined && _data.attrs.fechaHasta !== undefined) {
                        NotificacionesEnviadasLab.fechaDesde = _data.attrs.fechaDesde;
                        NotificacionesEnviadasLab.fechaHasta = _data.attrs.fechaHasta;
                    } else {
                        return m.route.set('/laboratorio/notificaciones/enviadas/', { idFiltro: 1 })
                    }

                    NotificacionesEnviadasLab.fechaDesde = _data.attrs.fechaDesde;
                    NotificacionesEnviadasLab.fechaHasta = _data.attrs.fechaHasta;
                }


                if (NotificacionesEnviadasLab.NotificacionesEnviadasLab.length == 0 && NotificacionesEnviadasLab.error.length == 0) {

                    NotificacionesEnviadasLab.idFiltro = _data.attrs.idFiltro;
                    NotificacionesEnviadasLab.loader = true;
                    NotificacionesEnviadasLab.NotificacionesEnviadasLab = [];
                    NotificacionesEnviadasLab.fetchNotificacionesEnviadasLab();

                }

            }


        },
        onupdate: (_data) => {


            if (_data.attrs.fechaDesde == undefined && _data.attrs.fechaHasta == undefined) {
                NotificacionesEnviadasLab.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                NotificacionesEnviadasLab.fechaHasta = moment().format('DD-MM-YYYY');
            } else {
                NotificacionesEnviadasLab.fechaDesde = _data.attrs.fechaDesde;
                NotificacionesEnviadasLab.fechaHasta = _data.attrs.fechaHasta;
            }


            if (_data.attrs.idFiltro !== NotificacionesEnviadasLab.idFiltro) {


                NotificacionesEnviadasLab.idFiltro = _data.attrs.idFiltro;
                NotificacionesEnviadasLab.loader = true;
                NotificacionesEnviadasLab.NotificacionesEnviadasLab = [];
                NotificacionesEnviadasLab.fetchNotificacionesEnviadasLab();

            }


        },

        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
                m(NotificacionesEnviadasLab),
            ];
        },
    }, //NotificacionesEnviadasLab
    '/laboratorio/notificaciones/pendientes': NotificacionesPendientesLab, //NotificacionesPendientesLab
    '/laboratorio/notificaciones/error': NotificacionesErroresLab, //NotificacionesErroresLab
    '/laboratorio/flebotomista/inicio': InicioFlebo,
    '/laboratorio/flebotomista': {
        oninit: (_data) => {
            App.isAuth('laboratorio', 16);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/laboratorio/flebotomista/', { idFiltro: 4 })
            }

            LaboratorioPedidos.idFiltro = _data.attrs.idFiltro;


        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== LaboratorioPedidos.idFiltro && LaboratorioPedidos.idFiltro !== 1 && LaboratorioPedidos.fechaDesde !== undefined) {
                LaboratorioPedidos.idFiltro = _data.attrs.idFiltro;
                LaboratorioPedidos.fechaDesde = _data.attrs.fechaDesde;
                LaboratorioPedidos.fechaHasta = _data.attrs.fechaHasta;
                LaboratorioPedidos.loader = true;
                LaboratorioPedidos.pedidos = [];
                LaboratorioPedidos.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

                    LaboratorioPedidos.idFiltro = _data.attrs.idFiltro;
                    LaboratorioPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    LaboratorioPedidos.fechaHasta = moment().format('DD-MM-YYYY');
                    if (LaboratorioPedidos.pedidos.length == 0) {
                        LaboratorioPedidos.loader = true;
                        LaboratorioPedidos.pedidos = [];
                        LaboratorioPedidos.fetchPedidos();
                    } else {
                        LaboratorioPedidos.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
                m(LaboratorioPedidos),
            ];
        },

    }, // LaboratorioPedidos
    '/laboratorio/flebotomista/pedido': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined && _data.idTimeRecord !== undefined) {
                return PedidoFlebotomista
            } else {
                return m.route.SKIP;
            }
        }
    }, //PedidoFlebotomista
    '/laboratorio/etiquetas': {
        oninit: (_data) => {
            App.isAuth('laboratorio', 28);
            document.title = "Configuración de Etiquetas | " + App.title;
        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
                m(EtiCajas),
            ];
        },

    },
    '/laboratorio/formularios': LaboratorioFormularios, //LaboratorioPedidos
    '/emergencia': Emergencia, //Emergencia
    '/emergencia/auxiliar/pedidos/laboratorio': EmergenciaAuxiliarPedidosLaboratorio, //EmergenciaAuxiliarPedidosLaboratorio
    '/emergencia/auxiliar/pedido/:idPedido': VerPedidoAuxiliarEmergencia, //EmergenciaAuxiliarPedidosLaboratorio
    '/emergencia/enfermeria/pedidos/laboratorio': EmergenciaEnfermeriaPedidosLaboratorio, //EmergenciaEnfermeriaPedidosLaboratorio
    '/emergencia/enfermeria/pedido/:idPedido': VerPedidoEnfermeriaEmergencia, //VerPedidoEnfermeriaEmergencia
    '/farmacia': Farmacia, //Farmacia
    '/farmacia/recetas': {
        oninit: (_data) => {
            App.isAuth('farmacia', 5);
            document.title = "Recetas de Alta | " + App.title;
            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/farmacia/recetas/', { idFiltro: 1 })
            }
            Recetas.idFiltro = _data.attrs.idFiltro;
        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== Recetas.idFiltro && Recetas.idFiltro !== 1 && Recetas.fechaDesde !== undefined) {
                Recetas.idFiltro = _data.attrs.idFiltro;
                Recetas.fechaDesde = _data.attrs.fechaDesde;
                Recetas.fechaHasta = _data.attrs.fechaHasta;
                Recetas.loader = true;
                Recetas.pedidos = [];
                Recetas.fetch();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    Recetas.idFiltro = _data.attrs.idFiltro;
                    Recetas.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    Recetas.fechaHasta = moment().format('DD-MM-YYYY');
                    if (Recetas.pedidos.length == 0) {
                        Recetas.loader = true;
                        Recetas.pedidos = [];
                        Recetas.fetch();
                    } else {
                        Recetas.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
                m(Recetas),
            ];
        },
    }, //Recetas Alta
    '/farmacia/receta/': {
        onmatch: (_data) => {
            if (_data.numeroReceta !== undefined) {
                return RecetaFarmacia;
            } else {
                return m.route.SKIP;
            }
        }
    }, // RecetaFarmacia
    '/contabilidad': Conta, //Conta
    '/contabilidad/proceso/tarjeta-roja': TRoja, //TRoja
    '/contabilidad/proceso/tarjeta-roja/nueva': NuevaTRoja, // TRPedido
    '/contabilidad/proceso/tarjeta-roja/id': AuthTR, // Autorizar Pedido,
    '/contabilidad/proceso/tarjeta-roja/status': StatusTR, // Autorizar Pedido,
    '/contabilidad/proceso/tarjeta-roja/inicio': InicioTR, // Autorizar Pedido
    '/contabilidad/proceso/tarjeta-roja/autorizaciones': {
        oninit: (_data) => {
            App.isAuth('contabilidad', 33);
            document.title = "Autorizaciones | " + App.title;
            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/contabilidad/proceso/tarjeta-roja/autorizaciones/', { idFiltro: 1 })
            }
            AutorizacionesTR.idFiltro = _data.attrs.idFiltro;
        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== AutorizacionesTR.idFiltro && AutorizacionesTR.idFiltro !== 1 && AutorizacionesTR.fechaDesde !== undefined) {
                AutorizacionesTR.idFiltro = _data.attrs.idFiltro;
                AutorizacionesTR.fechaDesde = _data.attrs.fechaDesde;
                AutorizacionesTR.fechaHasta = _data.attrs.fechaHasta;
                AutorizacionesTR.loader = true;
                AutorizacionesTR.pedidos = [];
                AutorizacionesTR.fetch();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    AutorizacionesTR.idFiltro = _data.attrs.idFiltro;
                    AutorizacionesTR.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    AutorizacionesTR.fechaHasta = moment().format('DD-MM-YYYY');
                    if (AutorizacionesTR.pedidos.length == 0) {
                        AutorizacionesTR.loader = true;
                        AutorizacionesTR.pedidos = [];
                        AutorizacionesTR.fetch();
                    } else {
                        AutorizacionesTR.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("contabilidad") }),
                m(AutorizacionesTR),
            ];
        },
    }, //TRoja
    '/contabilidad/proceso/tarjeta-roja/consultar': {
        oninit: (_data) => {
            document.title = "Consultar Status | " + App.title;
            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/contabilidad/proceso/tarjeta-roja/consultar/', { idFiltro: 1 })
            }
            ConsultarTr.idFiltro = _data.attrs.idFiltro;
        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== ConsultarTr.idFiltro && ConsultarTr.idFiltro !== 1 && ConsultarTr.fechaDesde !== undefined) {
                ConsultarTr.idFiltro = _data.attrs.idFiltro;
                ConsultarTr.fechaDesde = _data.attrs.fechaDesde;
                ConsultarTr.fechaHasta = _data.attrs.fechaHasta;
                ConsultarTr.loader = true;
                ConsultarTr.pedidos = [];
                ConsultarTr.fetch();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    ConsultarTr.idFiltro = _data.attrs.idFiltro;
                    ConsultarTr.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    ConsultarTr.fechaHasta = moment().format('DD-MM-YYYY');
                    if (ConsultarTr.pedidos.length == 0) {
                        ConsultarTr.loader = true;
                        ConsultarTr.pedidos = [];
                        ConsultarTr.fetch();
                    } else {
                        ConsultarTr.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeadPublic),
                m(ConsultarTr),
            ];
        },
    }, //TRoja
    '/admisiones': Admisiones, //Admisiones
    '/admisiones/pre': PreAdmisiones, //PreAdmisiones
    '/admisiones/contratos/nuevo': NuevoContrato, //PreAdmisiones
    '/admisiones/contratos/status': StatusContrato, //PreAdmisiones
    '/admisiones/contratos': {
        oninit: (_data) => {
            document.title = "Contratos Digitalizados | " + App.title;
            if (_data.attrs.idFiltro == undefined) {
                return m.route.set('/admisiones/contratos/', { idFiltro: 1 })
            }
            ContratosAd.idFiltro = _data.attrs.idFiltro;
        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== ContratosAd.idFiltro && ContratosAd.idFiltro !== 1 && ContratosAd.fechaDesde !== undefined) {
                ContratosAd.idFiltro = _data.attrs.idFiltro;
                ContratosAd.fechaDesde = _data.attrs.fechaDesde;
                ContratosAd.fechaHasta = _data.attrs.fechaHasta;
                ContratosAd.loader = true;
                ContratosAd.pedidos = [];
                ContratosAd.fetch();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    ContratosAd.idFiltro = _data.attrs.idFiltro;
                    ContratosAd.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    ContratosAd.fechaHasta = moment().format('DD-MM-YYYY');
                    if (ContratosAd.pedidos.length == 0) {
                        ContratosAd.loader = true;
                        ContratosAd.pedidos = [];
                        ContratosAd.fetch();
                    } else {
                        ContratosAd.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("admisiones") }),
                m(ContratosAd),
            ];
        },
    },
    '/admisiones/etiquetas': {
        oninit: (_data) => {
            App.isAuth('admisiones', 7);
            document.title = "Impresión de Etiquetas | " + App.title;
            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/admisiones/etiquetas/', { idFiltro: 1 })
            }
            Etiquetas.idFiltro = _data.attrs.idFiltro;
        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== Etiquetas.idFiltro && Etiquetas.idFiltro !== 1 && Etiquetas.fechaDesde !== undefined) {
                Etiquetas.idFiltro = _data.attrs.idFiltro;
                Etiquetas.fechaDesde = _data.attrs.fechaDesde;
                Etiquetas.fechaHasta = _data.attrs.fechaHasta;
                Etiquetas.loader = true;
                Etiquetas.pedidos = [];
                Etiquetas.fetchEtiquetas();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    Etiquetas.idFiltro = _data.attrs.idFiltro;
                    Etiquetas.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    Etiquetas.fechaHasta = moment().format('DD-MM-YYYY');
                    if (Etiquetas.pedidos.length == 0) {
                        Etiquetas.loader = true;
                        Etiquetas.pedidos = [];
                        Etiquetas.fetchEtiquetas();
                    } else {
                        Etiquetas.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("admisiones") }),
                m(Etiquetas),
            ];
        },

    }, // PacientesEtiquetas
    '/mantenimiento': Mantenimiento, //Mantenimiento
    '/mantenimiento/higienizacion': IntegracionHigienizacion, //IntegracionHigienizacion
    '/hospitalizacion': Hospitalizacion, //Hospitalizacion
    '/hospitalizacion/pasaportes': Pasaportes, //Pasaportes
    '/hospitalizacion/control-camas': ControlCamas, //Control Camas
    '/terapia-respiratoria/pedidos': {
        oninit: (_data) => {
            App.isAuth('terapia-respiratoria', 18);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/terapia-respiratoria/pedidos/', { idFiltro: 1 })
            }

            TRPedidos.idFiltro = _data.attrs.idFiltro;
            if (_data.attrs.fechaDesde == undefined || _data.attrs.fechaHasta == undefined) {
                TRPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                TRPedidos.fechaHasta = moment().format('DD-MM-YYYY');
            } else {
                TRPedidos.fechaDesde = _data.attrs.fechaDesde;
                TRPedidos.fechaHasta = _data.attrs.fechaHasta;
            }
            TRPedidos.loader = true;
            TRPedidos.pedidos = [];
            TRPedidos.fetchPedidos();

        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== TRPedidos.idFiltro && TRPedidos.idFiltro !== 1 && TRPedidos.fechaDesde !== undefined) {

                TRPedidos.idFiltro = _data.attrs.idFiltro;
                TRPedidos.fechaDesde = _data.attrs.fechaDesde;
                TRPedidos.fechaHasta = _data.attrs.fechaHasta;
                TRPedidos.loader = true;
                TRPedidos.pedidos = [];
                TRPedidos.fetchPedidos();

            } else {

                if (_data.attrs.fechaDesde == undefined || _data.attrs.fechaHasta == undefined) {
                    TRPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    TRPedidos.fechaHasta = moment().format('DD-MM-YYYY');
                }
            }

        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("terapia-respiratoria") }),
                m(TRPedidos),
            ];
        },

    }, //TRPedidos
    '/bco-sangre': BcoSangre, //BcoSangre   
    '/bco-sangre/pedidos': {
        oninit: (_data) => {
            App.isAuth('bco-sangre', 19);
            document.title = "Recepción de Pedidos | " + App.title;
            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/bco-sangre/pedidos/', { idFiltro: 1 })
            }
            PedidosBcoSangre.idFiltro = _data.attrs.idFiltro;
        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== PedidosBcoSangre.idFiltro && PedidosBcoSangre.idFiltro !== 1 && PedidosBcoSangre.fechaDesde !== undefined) {
                PedidosBcoSangre.idFiltro = _data.attrs.idFiltro;
                PedidosBcoSangre.fechaDesde = _data.attrs.fechaDesde;
                PedidosBcoSangre.fechaHasta = _data.attrs.fechaHasta;
                PedidosBcoSangre.loader = true;
                PedidosBcoSangre.pedidos = [];
                PedidosBcoSangre.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    PedidosBcoSangre.idFiltro = _data.attrs.idFiltro;
                    PedidosBcoSangre.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    PedidosBcoSangre.fechaHasta = moment().format('DD-MM-YYYY');
                    if (PedidosBcoSangre.pedidos.length == 0) {
                        PedidosBcoSangre.loader = true;
                        PedidosBcoSangre.pedidos = [];
                        PedidosBcoSangre.fetchPedidos();
                    } else {
                        PedidosBcoSangre.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("bco-sangre") }),
                m(PedidosBcoSangre),
            ];
        },
    }, //PedidosBcoSangre
    '/bco-sangre/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return BcoPedido;
            } else {
                return m.route.SKIP;
            }
        }
    }, // NeuroPedido
    '/bco-sangre/lisa/pedidos/ingresados': {
        oninit: (_data) => {

            App.isAuth('laboratorio', 16);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && (_data.attrs.fechaDesde == undefined || _data.attrs.fechaHasta == undefined)) {
                return m.route.set('/bco-sangre/lisa/pedidos/ingresados/', { idFiltro: 6 })
            }

            LisaPedidosIngresadosBcoSangre.idFiltro = _data.attrs.idFiltro;

            if (LisaPedidosIngresadosBcoSangre.idFiltro === 6 && LisaPedidosIngresadosBcoSangre.pedidos.length == 0) {
                LisaPedidosIngresadosBcoSangre.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                LisaPedidosIngresadosBcoSangre.fechaHasta = moment().format('DD-MM-YYYY');
                LisaPedidosIngresadosBcoSangre.loader = true;
                LisaPedidosIngresadosBcoSangre.pedidos = [];
                LisaPedidosIngresadosBcoSangre.fetchPedidosIngresados();
            }

            if (LisaPedidosIngresadosBcoSangre.idFiltro !== 6 && LisaPedidosIngresadosBcoSangre.pedidos.length == 0) {
                LisaPedidosIngresadosBcoSangre.fechaDesde = _data.attrs.fechaDesde;
                LisaPedidosIngresadosBcoSangre.fechaHasta = _data.attrs.fechaHasta;
                LisaPedidosIngresadosBcoSangre.loader = true;
                LisaPedidosIngresadosBcoSangre.pedidos = [];
                LisaPedidosIngresadosBcoSangre.fetchPedidosIngresados();
            }

        },
        onremove: (_data) => {
            LisaPedidosIngresadosBcoSangre.loader = true;
            LisaPedidosIngresadosBcoSangre.pedidos = [];
        },
        onupdate: (_data) => {

            LisaPedidosIngresadosBcoSangre.idFiltro = _data.attrs.idFiltro;

            if (LisaPedidosIngresadosBcoSangre.idFiltro === 6 && LisaPedidosIngresadosBcoSangre.pedidos.length == 0) {
                LisaPedidosIngresadosBcoSangre.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                LisaPedidosIngresadosBcoSangre.fechaHasta = moment().format('DD-MM-YYYY');
                LisaPedidosIngresadosBcoSangre.loader = true;
                LisaPedidosIngresadosBcoSangre.pedidos = [];
                LisaPedidosIngresadosBcoSangre.fetchPedidosIngresados();
            }

            if (LisaPedidosIngresadosBcoSangre.idFiltro !== 6 && LisaPedidosIngresadosBcoSangre.pedidos.length == 0) {
                LisaPedidosIngresadosBcoSangre.fechaDesde = _data.attrs.fechaDesde;
                LisaPedidosIngresadosBcoSangre.fechaHasta = _data.attrs.fechaHasta;
                LisaPedidosIngresadosBcoSangre.loader = true;
                LisaPedidosIngresadosBcoSangre.pedidos = [];
                LisaPedidosIngresadosBcoSangre.fetchPedidosIngresados();
            }

        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
                m(LisaPedidosIngresadosBcoSangre),
            ];
        },

    },
    '/bco-sangre/lisa/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined && _data.idTimeRecord !== undefined) {
                return LisaPedidoIngresadosBcoSangre;
            } else {
                return m.route.SKIP;
            }
        }
    }, //LisaPedido
    '/neurofisiologia': Neuro, //Neuro
    '/neurofisiologia/pedidos': {
        oninit: (_data) => {
            App.isAuth('neurofisiologia', 20);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/neurofisiologia/pedidos/', { idFiltro: 1 })
            }

            NeuroPedidos.idFiltro = _data.attrs.idFiltro;


        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== NeuroPedidos.idFiltro && NeuroPedidos.idFiltro !== 1 && NeuroPedidos.fechaDesde !== undefined) {
                NeuroPedidos.idFiltro = _data.attrs.idFiltro;
                NeuroPedidos.fechaDesde = _data.attrs.fechaDesde;
                NeuroPedidos.fechaHasta = _data.attrs.fechaHasta;
                NeuroPedidos.loader = true;
                NeuroPedidos.pedidos = [];
                NeuroPedidos.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    NeuroPedidos.idFiltro = _data.attrs.idFiltro;
                    NeuroPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    NeuroPedidos.fechaHasta = moment().format('DD-MM-YYYY');
                    if (NeuroPedidos.pedidos.length == 0) {
                        NeuroPedidos.loader = true;
                        NeuroPedidos.pedidos = [];
                        NeuroPedidos.fetchPedidos();
                    } else {
                        NeuroPedidos.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("neurofisiologia") }),
                m(NeuroPedidos),
            ];
        },

    }, // NeuroPedidos,
    '/neurofisiologia/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return NeuroPedido;
            } else {
                return m.route.SKIP;
            }
        }
    }, // NeuroPedido
    '/cardiologia': Cardio, // Cardio
    '/cardiologia/pedidos': {
        oninit: (_data) => {

            App.isAuth('cardiologia', 42);

            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/cardiologia/pedidos/', { idFiltro: 1 })
            }

            PedidosCardio.idFiltro = _data.attrs.idFiltro;

        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== PedidosCardio.idFiltro && PedidosCardio.idFiltro !== 1 && PedidosCardio.fechaDesde !== undefined) {
                PedidosCardio.idFiltro = _data.attrs.idFiltro;
                PedidosCardio.fechaDesde = _data.attrs.fechaDesde;
                PedidosCardio.fechaHasta = _data.attrs.fechaHasta;
                PedidosCardio.loader = true;
                PedidosCardio.pedidos = [];
                PedidosCardio.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    PedidosCardio.idFiltro = _data.attrs.idFiltro;
                    PedidosCardio.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    PedidosCardio.fechaHasta = moment().format('DD-MM-YYYY');
                    if (PedidosCardio.pedidos.length == 0) {
                        PedidosCardio.loader = true;
                        PedidosCardio.pedidos = [];
                        PedidosCardio.fetchPedidos();
                    } else {
                        PedidosCardio.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("cardiologia") }),
                m(PedidosCardio),
            ];
        },

    }, // PedidosCardio,
    '/terapia-fisica': TerapiaFisica, // TerapiaFisica
    '/terapia-fisica/pedidos': {
        oninit: (_data) => {

            App.isAuth('terapia-fisica', 41);

            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/terapia-fisica/pedidos/', { idFiltro: 1 })
            }

            PedidosTF.idFiltro = _data.attrs.idFiltro;

        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== PedidosTF.idFiltro && PedidosTF.idFiltro !== 1 && PedidosTF.fechaDesde !== undefined) {
                PedidosTF.idFiltro = _data.attrs.idFiltro;
                PedidosTF.fechaDesde = _data.attrs.fechaDesde;
                PedidosTF.fechaHasta = _data.attrs.fechaHasta;
                PedidosTF.loader = true;
                PedidosTF.pedidos = [];
                PedidosTF.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    PedidosTF.idFiltro = _data.attrs.idFiltro;
                    PedidosTF.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    PedidosTF.fechaHasta = moment().format('DD-MM-YYYY');
                    if (PedidosTF.pedidos.length == 0) {
                        PedidosTF.loader = true;
                        PedidosTF.pedidos = [];
                        PedidosTF.fetchPedidos();
                    } else {
                        PedidosTF.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("terapia-fisica") }),
                m(PedidosTF),
            ];
        },

    }, // PedidosTF,
    '/terapia-fisica/pedido': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return PedidoTF;
            } else {
                return m.route.SKIP;
            }
        }
    },
    '/terapia-respiratoria': TerapiaRespiratoria, // TerapiaRespiratoria
    '/terapia-respiratoria/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return TRPedido;
            } else {
                return m.route.SKIP;
            }
        }
    }, // TRPedido
    '/imagen': Imagen, // Imagen
    '/imagen/agendamiento': {
        oninit: (_data) => {
            App.isAuth('imagen', 31);
            document.title = "Agendamiento de Imagen | " + App.title;
        },
        onupdate: (_data) => {

        },
        view: (_data) => {
            return [
                m(HeaderCalendar, { oncreate: HeaderCalendar.setPage("imagen") }),
                m(AgendaImagen, { idFiltro: _data.attrs.idFiltro }),
            ];
        },
    }, // AgendaImagen
    '/imagen/agendamiento/cita': {
        oninit: (_data) => {
            App.isAuth('imagen', 31);
            document.title = "Detalle de Cita | " + App.title;
        },
        view: (_data) => {
            return [
                m(HeaderCalendar, { oncreate: HeaderCalendar.setPage("imagen") }),
                m(DetalleCita, { id: _data.attrs.id }),
            ];
        },
    }, // AgendaImagen
    '/imagen/agendamiento/nueva-cita': {
        oninit: (_data) => {
            App.isAuth('imagen', 31);
            document.title = "Agendamiento de Imagen | " + App.title;
        },
        onupdate: (_data) => {

        },
        view: (_data) => {
            return [
                m(HeaderCalendar, { oncreate: HeaderCalendar.setPage("imagen") }),
                m(NuevaCita),
            ];
        },
    }, // AgendaImagen
    '/imagen/notificaciones': {
        oninit: (_data) => {
            App.isAuth('imagen', 35);
            document.title = "Notificaciones de Imagen | " + App.title;
            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/imagen/notificaciones/', { idFiltro: 1 })
            }
            NSSImagen.idFiltro = _data.attrs.idFiltro;
        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== NSSImagen.idFiltro && NSSImagen.idFiltro !== 1 && NSSImagen.fechaDesde !== undefined) {
                NSSImagen.idFiltro = _data.attrs.idFiltro;
                NSSImagen.fechaDesde = _data.attrs.fechaDesde;
                NSSImagen.fechaHasta = _data.attrs.fechaHasta;
                NSSImagen.loader = true;
                NSSImagen.pedidos = [];
                NSSImagen.fetch();
            } else {
                if (_data.attrs.idFiltro == 1) {

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

                    NSSImagen.idFiltro = _data.attrs.idFiltro;
                    NSSImagen.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    NSSImagen.fechaHasta = moment().format('DD-MM-YYYY');
                    if (NSSImagen.pedidos.length == 0) {
                        NSSImagen.loader = true;
                        NSSImagen.pedidos = [];
                        NSSImagen.fetch();
                    } else {
                        NSSImagen.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("imagen") }),
                m(NSSImagen),
            ];
        },
    }, // Notificaciones Imagen
    '/imagen/pedidos': {
        oninit: (_data) => {
            App.isAuth('laboratorio', 16);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/imagen/pedidos/', { idFiltro: 1 })
            }

            ImagenPedidos.idFiltro = _data.attrs.idFiltro;


        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== ImagenPedidos.idFiltro && ImagenPedidos.idFiltro !== 1 && ImagenPedidos.fechaDesde !== undefined) {
                ImagenPedidos.idFiltro = _data.attrs.idFiltro;
                ImagenPedidos.fechaDesde = _data.attrs.fechaDesde;
                ImagenPedidos.fechaHasta = _data.attrs.fechaHasta;
                ImagenPedidos.loader = true;
                ImagenPedidos.pedidos = [];
                ImagenPedidos.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    ImagenPedidos.idFiltro = _data.attrs.idFiltro;
                    ImagenPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    ImagenPedidos.fechaHasta = moment().format('DD-MM-YYYY');
                    if (ImagenPedidos.pedidos.length == 0) {
                        ImagenPedidos.loader = true;
                        ImagenPedidos.pedidos = [];
                        ImagenPedidos.fetchPedidos();
                    } else {
                        ImagenPedidos.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("imagen") }),
                m(ImagenPedidos),
            ];
        },

    }, // ImagenPedidos
    '/imagen/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return ImagenPedido;
            } else {
                return m.route.SKIP;
            }
        }
    }, // ImagenPedido
    '/endoscopia': Endoscopia, // Endoscopia
    '/endoscopia/pedidos': {
        oninit: (_data) => {
            App.isAuth('endoscopia', 25);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/endoscopia/pedidos/', { idFiltro: 1 })
            }

            EndoscopiaPedidos.idFiltro = _data.attrs.idFiltro;


        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== EndoscopiaPedidos.idFiltro && EndoscopiaPedidos.idFiltro !== 1 && EndoscopiaPedidos.fechaDesde !== undefined) {
                EndoscopiaPedidos.idFiltro = _data.attrs.idFiltro;
                EndoscopiaPedidos.fechaDesde = _data.attrs.fechaDesde;
                EndoscopiaPedidos.fechaHasta = _data.attrs.fechaHasta;
                EndoscopiaPedidos.loader = true;
                EndoscopiaPedidos.pedidos = [];
                EndoscopiaPedidos.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    EndoscopiaPedidos.idFiltro = _data.attrs.idFiltro;
                    EndoscopiaPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    EndoscopiaPedidos.fechaHasta = moment().format('DD-MM-YYYY');
                    if (EndoscopiaPedidos.pedidos.length == 0) {
                        EndoscopiaPedidos.loader = true;
                        EndoscopiaPedidos.pedidos = [];
                        EndoscopiaPedidos.fetchPedidos();
                    } else {
                        EndoscopiaPedidos.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("endoscopia") }),
                m(EndoscopiaPedidos),
            ];
        },

    }, // EndoscopiaPedidos
    '/endoscopia/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return EndoPedido;

            } else {
                return m.route.SKIP;
            }
        }
    }, // EndoPedido
    '/auth': Login, // Login
    '/mi-perfil': MiPerfil, // MiPerfil
    '/salir': Salir, // Salir
    '/notificaciones': ReloadNotification, // ReloadNotificaciones
    "/:404...": _404
};


const DefaultRoute = '/';

export { Routes, DefaultRoute }