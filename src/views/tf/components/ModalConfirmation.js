import m from "mithril";

const ModalConfirmation = {
  view: ({ attrs: { item, onConfirm, onCancel, onNoAdministration } }) => {
    return m(
      "div",
      {
        class: "modal show",
        style: { display: "block", backgroundColor: "rgba(0,0,0,0.5)" },
        role: "dialog",
      },
      m(
        "div",
        { class: "modal-dialog modal-dialog-centered", role: "document" },
        m("div", { class: "modal-content" }, [
          m("div", { class: "modal-header" }, [
            m("h5", { class: "modal-title" }, "Confirmación"),
            m(
              "button",
              {
                class: "close",
                type: "button",
                onclick: onCancel,
              },
              m("span", { "aria-hidden": "true" }, m.trust("&times;"))
            ),
          ]),
          m("div", { class: "modal-body" }, [
            `¿Está seguro de que desea confirmar la prescripción `,
            m("strong", item.dsTipPresc),
            ` del `,
            m(
              "strong",
              new Date(item.dhMedicacao).toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            ),
            `?`,
          ]),
          m("div", { class: "modal-footer" }, [
            m(
              "button",
              {
                class: "btn btn-secondary",
                type: "button",
                onclick: onCancel,
              },
              "Cancelar"
            ),
            m(
              "button",
              {
                class: "btn btn-primary",
                type: "button",
                onclick: onConfirm,
              },
              "Confirmar"
            ),
            m(
              "button",
              {
                class: "btn btn-primary",
                type: "button",
                onclick: onNoAdministration,
              },
              "No Administrar"
            ),
          ]),
        ])
      )
    );
  },
};

export default ModalConfirmation;
