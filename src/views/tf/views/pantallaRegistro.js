import m from "mithril";
import PedidoTF from "../pedidos/pedido";
import Encrypt from "../../../models/encrypt";
import TablePrescription from "../components/TablePrescription";
import ModalConfirmation from "../components/ModalConfirmation";
import ApiService from "../services/ApiService";
import ModalNoAdministration from "../components/ModalNoConfirmation";

const PantallaRegistro = {
  data: [],
  loading: true,
  error: false,
  usuarioConectado: "",
  selectedItem: null,
  showModal: false, // Para el primer modal (chequear)
  showNoAdminModal: false, // Para el segundo modal (No Administrar)
  justification: "",
  observation: "",
  showError: false,
  justifications: [], // Estado para las justificaciones cargadas desde el API
  justificationLoading: true, // Estado de carga mientras se obtienen las justificaciones

  oninit: () => {
    PantallaRegistro.usuarioConectado = Encrypt.getDataUser();
    PantallaRegistro.loadData(PedidoTF.numeroPedido);
  },

  loadData: (cdPreMed) => {
    PantallaRegistro.loading = true;
    PantallaRegistro.error = false;
    ApiService.getPhysicalTherapySessions(cdPreMed)
      .then((result) => {
        if (result.status) {
          PantallaRegistro.data = result.data;
        } else {
          PantallaRegistro.error = true;
        }
      })
      .catch(() => {
        PantallaRegistro.error = true;
      })
      .finally(() => {
        PantallaRegistro.loading = false;
        m.redraw();
      });
  },

  handleCheck: (item) => {
    PantallaRegistro.selectedItem = item;
    PantallaRegistro.showModal = true; // Mostrar el primer modal
  },

  confirmCheck: () => {
    PantallaRegistro.loading = true;
    PantallaRegistro.error = false;
    PantallaRegistro.showModal = false;

    const requestData = {
      cdItpreMed: PantallaRegistro.selectedItem.cdItpreMed,
      dhMedicacao: PantallaRegistro.selectedItem.dhMedicacao,
      nmUsuario: PantallaRegistro.usuarioConectado.user.user.toUpperCase(),
      snSuspenso: "N",
      dsJustificativa: null,
      cdJustificativaCheacagem: null,
    };

    ApiService.postHritpreConsInsertRequest(requestData)
      .then(() => {
        PantallaRegistro.loadData(PedidoTF.numeroPedido);
        PantallaRegistro.observation = "";
        PantallaRegistro.justification = "";
      })
      .catch(() => {
        PantallaRegistro.error = true;
        PantallaRegistro.loading = false;
      })
      .finally(() => m.redraw());
  },

  handleNoAdministration: () => {
    PantallaRegistro.showModal = false; // Cerrar el modal principal
    PantallaRegistro.showNoAdminModal = true; // Abrir el modal de No Administrar
    PantallaRegistro.justificationLoading = true;

    // Cargar las justificaciones solo cuando se abre el modal de "No administrar"
    ApiService.getJustificationForNoAdministered()
      .then((result) => {
        if (result.status) {
          PantallaRegistro.justifications = result.data;
        } else {
          PantallaRegistro.error = true;
        }
      })
      .catch(() => {
        PantallaRegistro.error = true;
      })
      .finally(() => {
        PantallaRegistro.justificationLoading = false;
        m.redraw();
      });
  },

  confirmNoAdministration: () => {
    if (!PantallaRegistro.justification) {
      PantallaRegistro.showError = true;
      return;
    }

    PantallaRegistro.loading = true;
    PantallaRegistro.showNoAdminModal = false;

    const requestData = {
      cdItpreMed: PantallaRegistro.selectedItem.cdItpreMed,
      dhMedicacao: PantallaRegistro.selectedItem.dhMedicacao,
      nmUsuario: PantallaRegistro.usuarioConectado.user.user.toUpperCase(),
      snSuspenso: "S",
      dsJustificativa: PantallaRegistro.observation,
      cdJustificativaCheacagem: parseInt(PantallaRegistro.justification),
    };

    //console.log("Request Data: ", requestData);

    ApiService.postHritpreConsInsertRequest(requestData)
      .then(() => {
        PantallaRegistro.loadData(PedidoTF.numeroPedido);
        PantallaRegistro.observation = "";
        PantallaRegistro.justification = "";
      })
      .catch(() => {
        PantallaRegistro.error = true;
      })
      .finally(() => {
        PantallaRegistro.loading = false;
        m.redraw();
      });
  },

  closeModal: () => {
    PantallaRegistro.showModal = false; // Cerrar el modal de confirmación
    PantallaRegistro.showNoAdminModal = false; // Cerrar el modal de no administrar
    PantallaRegistro.observation = ""; // Limpiar la observación
    PantallaRegistro.justification = ""; // Limpiar la justificación
  },

  view: () => {
    return [
      PantallaRegistro.error &&
        m(
          "div",
          { class: "alert alert-danger", role: "alert" },
          "Ocurrió un error, intenta de nuevo"
        ),
      PantallaRegistro.loading
        ? m(
            "div.pd-10.wd-100p",
            m("div.placeholder-paragraph", [m("div.line"), m("div.line")])
          )
        : m(TablePrescription, {
            data: PantallaRegistro.data,
            handleCheck: PantallaRegistro.handleCheck,
          }),
      // Primer modal (confirmación de check)
      PantallaRegistro.showModal &&
        m(ModalConfirmation, {
          item: PantallaRegistro.selectedItem,
          onConfirm: PantallaRegistro.confirmCheck,
          onCancel: PantallaRegistro.closeModal,
          onNoAdministration: PantallaRegistro.handleNoAdministration,
        }),
      // Segundo modal (justificación de no administrar)
      PantallaRegistro.showNoAdminModal &&
        m(ModalNoAdministration, {
          justification: PantallaRegistro.justification,
          observation: PantallaRegistro.observation,
          showError: PantallaRegistro.showError,
          justifications: PantallaRegistro.justifications,
          justificationLoading: PantallaRegistro.justificationLoading,
          onConfirm: PantallaRegistro.confirmNoAdministration,
          onCancel: PantallaRegistro.closeModal,
          onJustificationChange: (value) =>
            (PantallaRegistro.justification = value),
          onObservationChange: (value) =>
            (PantallaRegistro.observation = value),
        }),
    ];
  },
};

export default PantallaRegistro;
