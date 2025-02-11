const ModalNoAdministration = {
  showConfirmModal: false, // Estado para controlar la visibilidad del modal de confirmación
  showError: false, // Estado para manejar los errores de validación

  view: ({
    attrs: {
      justification,
      observation,
      justifications,
      justificationLoading,
      onConfirm,
      onCancel,
      onJustificationChange,
      onObservationChange,
    },
  }) => {
    const maxObservationLength = 100; // Longitud máxima de la observación

    // Función para manejar la validación y abrir el modal de confirmación si todo es válido
    const handleValidationAndConfirm = () => {
      const isValid =
        justification && observation.length <= maxObservationLength;

      // Si no es válido, mostramos los errores
      if (!isValid) {
        ModalNoAdministration.showError = true;
      } else {
        // Si es válido, ocultamos los errores y mostramos el modal de confirmación
        ModalNoAdministration.showError = false;
        ModalNoAdministration.showConfirmModal = true;
      }
    };

    // Función para manejar la confirmación final y cerrar ambos modales
    const handleFinalConfirmation = () => {
      onConfirm(); // Llamamos a la función de confirmación
      ModalNoAdministration.showConfirmModal = false; // Cerramos el modal de confirmación
    };

    return [
      m(
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
              m("h5", { class: "modal-title" }, "No Administrar"),
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
              justificationLoading
                ? m(
                    "div.pd-10.wd-100p",
                    m("div.placeholder-paragraph", [
                      m("div.line"),
                      m("div.line"),
                    ])
                  )
                : justifications.length === 0 // Si no se pudieron cargar los datos
                ? m(
                    "div",
                    { class: "alert alert-danger", role: "alert" },
                    "Ocurrió un error, intenta de nuevo"
                  )
                : [
                    m("div.form-group", [
                      m("label", "Justificación (requerida)"),
                      m(
                        "select.form-control",
                        {
                          onchange: (e) =>
                            onJustificationChange(e.target.value),
                          value: justification, // Asignamos el valor del idChecagem
                        },
                        [
                          m(
                            "option",
                            { value: "" },
                            "Seleccione una justificación"
                          ),
                          ...justifications.map((justificationItem) =>
                            m(
                              "option",
                              { value: justificationItem.idChecagem },
                              justificationItem.description
                            )
                          ),
                        ]
                      ),
                      ModalNoAdministration.showError &&
                        !justification &&
                        m("div.text-danger", "La justificación es requerida."), // Mensaje de error en rojo
                    ]),
                    m("div.form-group", [
                      m(
                        "label",
                        "Observación (opcional, máximo 100 caracteres)"
                      ),
                      m("input.form-control", {
                        type: "text",
                        maxlength: maxObservationLength, // Restringimos el número de caracteres a 100
                        value: observation,
                        oninput: (e) => {
                          if (e.target.value.length <= maxObservationLength) {
                            onObservationChange(e.target.value);
                          }
                        },
                      }),
                      ModalNoAdministration.showError &&
                        observation.length > maxObservationLength &&
                        m(
                          "div.text-danger",
                          `La observación no puede exceder ${maxObservationLength} caracteres.`
                        ),
                    ]),
                  ],
            ]),
            // Solo mostrar los botones si no hay error en la carga de las justificaciones
            justifications.length > 0 &&
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
                    onclick: handleValidationAndConfirm, // Llamar a la función de validación
                  },
                  "Confirmar"
                ),
              ]),
          ])
        )
      ),
      // Modal de confirmación
      ModalNoAdministration.showConfirmModal &&
        m(
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
                    onclick: () => {
                      ModalNoAdministration.showConfirmModal = false; // Cerrar modal de confirmación
                    },
                  },
                  m("span", { "aria-hidden": "true" }, m.trust("&times;"))
                ),
              ]),
              m("div", { class: "modal-body" }, [
                m(
                  "p",
                  "¿Está seguro de que desea registrar esta acción como 'No Administrado'?"
                ),
              ]),
              m("div", { class: "modal-footer" }, [
                m(
                  "button",
                  {
                    class: "btn btn-secondary",
                    type: "button",
                    onclick: () => {
                      ModalNoAdministration.showConfirmModal = false; // Cerrar modal
                    },
                  },
                  "Cancelar"
                ),
                m(
                  "button",
                  {
                    class: "btn btn-primary",
                    type: "button",
                    onclick: handleFinalConfirmation, // Ejecutar confirmación final y cerrar modal
                  },
                  "Confirmar"
                ),
              ]),
            ])
          )
        ),
    ];
  },
};

export default ModalNoAdministration;
