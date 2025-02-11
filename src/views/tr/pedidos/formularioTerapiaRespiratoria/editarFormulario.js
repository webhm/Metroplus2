import FormularioModels from "./models/formularioModels";
import loader from "../../../patologia/utils/loader";

let formularioModelo = FormularioModels;
let idFormulario = null;
// 
let pruebaFormulario = null

const EditarFormulario = {
  oninit: (vnode) => {
    if (vnode.attrs.id !== undefined) {
      idFormulario = vnode.attrs.id;
    }
    //idFormulario = vnode.attrs.id;

    formularioModelo.cargarUnFormulario(idFormulario);
    //alert(prueba);
    //alert(formularioModelo.listadoUnitario)
    //console.log(formularioModelo.listadoUnitario);
  },
  onupdate: (vnode) => {
    if (formularioModelo.listadoUnitario !== null ) {
        pruebaFormulario =  formularioModelo.listadoUnitario;
    }
  },
  view: (vnode) => {
    return [
        formularioModelo.listadoUnitario !== null ?
        m("form", [

        m("div", { class: "row" }, [
          m(
            "div",
            { class: "col" },
            m("div", { class: "mb-4" }, [
              m(
                "label",
                { class: "form-label", for: "inputPeso" },
                m("b", "Número de Pedido")
              ),
              m("input", {
                class: "form-control",
                type: "text",
                readonly: "readonly",
                id: "inputNumeroPedido",
                value: formularioModelo.listadoUnitario.NUMERODEPEDIDO,
                
              }),
            ])
          ),
          m(
            "div",
            { class: "col" },
            m("div", { class: "mb-4" }, [
              m(
                "label",
                { class: "form-label", for: "inputEscalaDolor" },
                m("b", "Fecha y Hora")
              ),
              m("input", {
                class: "form-control",
                type: "text",
                readonly: "readonly",
                id: "inputFechaPedido",
                value: formularioModelo.listadoUnitario.FECHAMV,
              }),
            ])
          ),
          m(
            "div",
            { class: "col" },
            m("div", { class: "mb-4" }, [
              m(
                "label",
                { class: "form-label", for: "inputUsuario" },
                m("b", "Origen")
              ),
              m("input", {
                class: "form-control",
                type: "text",
                readonly: "readonly",
                id: "inputOrigenPedido",
                value: formularioModelo.listadoUnitario.ORIGEN,
              }),
            ])
          ),
        ]),
        m("div", { class: "row" }, [
          m(
            "div",
            { class: "col" },
            m("div", { class: "mb-4" }, [
              m(
                "label",
                { class: "form-label", for: "inputPeso" },
                m("b", "Medico Solicitante")
              ),
              m("input", {
                class: "form-control",
                type: "text",
                readonly: "readonly",
                id: "inputMedicoSolicitante",
                value: formularioModelo.listadoUnitario.MEDICOSOLICITANTE,
              }),
            ])
          ),
          m(
            "div",
            { class: "col" },
            m("div", { class: "mb-4" }, [
              m(
                "label",
                { class: "form-label", for: "inputEscalaDolor" },
                m("b", "Especialidad")
              ),
              m("input", {
                class: "form-control",
                type: "text",
                readonly: "readonly",
                id: "inputEspecialidad",
                value: formularioModelo.listadoUnitario.ESPECIALIDAD,
              }),
            ])
          ),
          m(
            "div",
            { class: "col" },
            m("div", { class: "mb-4" }, [
              m(
                "label",
                { class: "form-label", for: "inputUsuario" },
                m("b", "Apellidos y Nombres del Paciente")
              ),
              m("input", {
                class: "form-control",
                type: "text",
                readonly: "readonly",
                id: "inputApellidosYNombres",
                value: formularioModelo.listadoUnitario.APELLIDOSNOMBREPACIENTE,
              }),
            ])
          ),
        ]),
        m("div", { class: "row" }, [
          m(
            "div",
            { class: "col" },
            m("div", { class: "mb-4" }, [
              m(
                "label",
                { class: "form-label", for: "inputPeso" },
                m("b", "NHC")
              ),
              m("input", {
                class: "form-control",
                type: "text",
                id: "inputNHC",
                readonly: "readonly",
                value: formularioModelo.listadoUnitario.NHC,
              }),
            ])
          ),
          m(
            "div",
            { class: "col" },
            m("div", { class: "mb-4" }, [
              m(
                "label",
                { class: "form-label", for: "inputEscalaDolor" },
                m("b", "Número de Atención")
              ),
              m("input", {
                class: "form-control",
                type: "text",
                readonly: "readonly",
                id: "inputNumeroAtencion",
                value: formularioModelo.listadoUnitario.NUMEROATENCION,
              }),
            ])
          ),
          m(
            "div",
            { class: "col" },
            m("div", { class: "mb-4" }, [
              m(
                "label",
                { class: "form-label", for: "inputUsuario" },
                m("b", "Ubicación")
              ),
              m("input", {
                class: "form-control",
                type: "text",
                id: "inputUbicacion",
                readonly: "readonly",
                value: formularioModelo.listadoUnitario.UBICACION,
              }),
            ])
          ),
        ]),
        m("div", { class: "form-row" }, [
          m("div", { class: "form-group col-md-5" }, [
            m("label", { for: "inputEscalaDolor" }, "Escala Dolor"),
            m("input", {
              class: "form-control",
              type: "text",
              id: "inputEscalaDolor",
              placeholder: "Escala Dolor",
              readonly: "readonly",
              /* value:
                FormularioDeRegistro.listaEscalaDelDolor.data.length > 0
                  ? FormularioDeRegistro.listaEscalaDelDolor.data[0].VALUE ===
                    null
                    ? ""
                    : FormularioDeRegistro.listaEscalaDelDolor.data[0].VALUE
                  : "", */
              //value: formularioModelo.listaEscalaDelDolor.data[0].VALUE,
              value: formularioModelo.listadoUnitario.ESCALADOLOR,
            }),
          ]),
          m("div", { class: "form-group col-md-2" }, [
            m("label", { for: "inputPeso" }, "Peso"),
            m("input", {
              class: "form-control",
              type: "text",
              id: "inputPeso",
              placeholder: "Peso",
              readonly: "readonly",
              /* value: obtenerDatos.listaDePeso.data[0].VALUE != undefined ? obtenerDatos.listaDePeso.data[0].VALUE : '', */
              value: formularioModelo.listadoUnitario.PESO,
                
            }),
          ]),

          m("div", { class: "form-group col-md-5" }, [
            m("label", { for: "inputUsuario" }, "Usuario"),
            m("input", {
              class: "form-control",
              type: "text",
              id: "inputUsuario",
              placeholder: "Usuario",
              readonly: "readonly",
              value: formularioModelo.listadoUnitario.USUARIO,
            }),
          ]),
        ]),
        /* m("div", { class: "form-group" }, [
          m("label", { for: "inputPrescripcion" }, "Prescripción"),
          m(
            "div",
            {},
            Pedido.examenes.map(function ({ EXAMEN, FRECUENCIA }) {
              return m("div", { class: "form-check" }, [
                m("input", {
                  type: "checkbox",
                  class: "form-check-input",
                  id: `${EXAMEN}`,
                  value: `${EXAMEN} ${FRECUENCIA}`,
                  onclick: function (event) {
                    handleCheckboxClick(event.target.value);
                  },
                }),
                m(
                  "label",
                  {
                    class: "form-check-label ml-2",
                    for: `${EXAMEN} ${FRECUENCIA}`,
                  },
                  `${EXAMEN} - ${FRECUENCIA}`
                ),
              ]);
            })
          ),
        ]), */

        m("div", { class: "form-group" }, [
          m("label", { for: "inputFecha" }, "Fecha"),
          m("input", {
            class: "form-control",
            type: "text",
            id: "inputFecha",
            placeholder: "Fecha",
            value: formularioModelo.listadoUnitario.FECHAHOY,
            readonly: "readonly",
          }),
        ]),
        m("div", { class: "form-group" }, [
          m("label", { for: "inputHora" }, "Hora"),
          m("input", {
            class: "form-control",
            type: "text",
            id: "inputHora",
            placeholder: "Hora",
            value: formularioModelo.listadoUnitario.HORADESPUES,
            readonly: "readonly",
          }),
        ]),
        [
          m(
            "div",
            { class: "d-flex justify-content-center" },
            m("h6", "Terapia Aerosol")
          ),
          m("div", { class: "row d-flex justify-content-center" }, [
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputNebulizacion",
                  disabled: true,

                  checked: formularioModelo.listadoUnitario.NEBULIZACION === "true" ? "checked" : "",
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Nebulización"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputUltrasonido",
                  disabled: true, 
                  checked: formularioModelo.listadoUnitario.ULTRASONIDO === "true" ? "checked" : "",
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Ultrasonido"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputInahaladorDosis",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.INHALADORESDOSISMEDIDA === "true" ? "checked" : "",
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Inhaladores Dosis Medida"
                ),
              ])
            ),
          ]),
          m(
            "div",
            { class: "d-flex justify-content-center" },
            m("h6", "Medicinas")
          ),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Salbutamol")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputSalbumatol",
                  value: formularioModelo.listadoUnitario.SALBUTAMOLDOSIS,
                  disabled: true,
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Hipersal (7%)")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputHipersal",
                  value: formularioModelo.listadoUnitario.HIPERSAL7DOSIS,
                  disabled: true,
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Hipersal (3,5%)")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputHipersal3",
                  value: formularioModelo.listadoUnitario.HIPERSAL35DOSIS,
                  disabled: true,
                }),
              ])
            ),
          ]),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Dexametasona")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputDexametasona",
                  value: formularioModelo.listadoUnitario.DEXAMETASONADOSIS,
                  disabled: true,
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Clorhidrato de Ambroxol")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputClorhidratoAmbroxol",
                  value: formularioModelo.listadoUnitario.CLORHIDRATODEAMBROXOLDOSIS,
                  disabled: true,
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputUsuario" },
                  m("b", "Solución Salina (0,9%)")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputSolucionSalina",
                  value: formularioModelo.listadoUnitario.SOLUCIONSALINADOSIS,
                  disabled: true,
                }),
              ])
            ),
          ]),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputUsuario" },
                  m("b", "Bromuro de Ipatropio")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputBromuroIpatropio",
                  value: formularioModelo.listadoUnitario.BROMURODELPATROPIODOSIS,
                  disabled: true,
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Adrenalina Racénica")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputAdrenalinaRacenica",
                  value: formularioModelo.listadoUnitario.ADRENALINARACENICADOSIS,
                  disabled: true,
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputUsuario" },
                  m("b", "Otros")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputOtros",
                  value: formularioModelo.listadoUnitario.OTROSDOSIS,
                  disabled: true,
                }),
              ])
            ),
          ]),
        ],
        [
          m(
            "div",
            { class: "d-flex justify-content-center" },
            m("h6", "Higiene Bronco Pulmonar")
          ),
          m("div", { class: "row d-flex justify-content-center" }, [
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "${inputDrenajePostural}",
                  disabled: true,
                  id: "inputDrenajePostural",
                  checked: formularioModelo.listadoUnitario.DRENAJEPOSTURAL === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Drenaje Postural"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "${inputPercursiones}",
                  id: "inputPercursiones",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.PERCUSIONES === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Percursiones"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "${inputVibraciones}",
                  id: "inputVibraciones",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.VIBRACIONES === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Vibraciones"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "${inputTosEfectiva}",
                  id: "inputTosEfectiva",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.TOSEFECTIVA === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Tos Efectiva"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "${inputAsistenteTos}",
                  id: "inputAsistenteTos",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.ASISTENCIADETOS === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Asistente de Tos"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "${inputChalecoVibroprecutor}",
                  id: "inputChalecoVibroprecutor",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.CHALECOVIBROPRECUTOR === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Chaleco Vibroprecutor"
                ),
              ])
            ),
          ]),
        ],
        [
          m(
            "div",
            { class: "d-flex justify-content-center" },
            m("h6", "Terapia Expansiva")
          ),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-1" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputIncentivoRespiratorio",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.INCENTIVORESPIRATORIO === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Incentivo Respiratorio"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputPresionPositivaContinuaEnLaViaAeria",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.PRESIONPOSITIVAVIAAREA === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Presión Positiva continua en la vía aérea"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputPresionPositivaAlFinalDeLaExpiracion",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.PRESIONPOSITIVAEXPIRACION === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Presión Positiva al final de la expiración"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-1" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputKinesioterapiaDelTorax",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.KINISIOTERAPIADELTORAX === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Kinesioterapia del tórax"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-1" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputEjerciciosRespiratorios",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.EJERCICIOSRESPIRATORIOS === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Ejercicios respiratorios"
                ),
              ])
            ),
          ]),
          m(
            "div",
            { class: "d-flex justify-content-center" },
            m("h6", "Incentivo Respiratorio")
          ),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Mililitros por segundo")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputMililitrosPorSegundo",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.MILILITROSPORSEGUNDOINCENTIVO
                  
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Centimetros cúbicos por segundo")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputCentimetrosCubicosPorSegundo",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.CENTIMETROSSEGUNDOINCENTIVO
                }),
              ])
            ),
          ]),
        ],
        [
          m("br"),
          m("br"),
          m(
            "div",
            { class: "d-flex justify-content-center" },
            m("h6", "Oxigenoterapia")
          ),
          m("h6", "Fracción inspirada de oxigeno (FiO2 %)"),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Porcentaje")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputPorcentajeFraccion",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.FRACCIONOXIGENOPORCENTAJE
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Litros por minuto")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputLitrosPorMinutoFraccion",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.FRACCIONIOXIGENOLITROS
                  
                }),
              ])
            ),
          ]),
          m("h6", "Alto Flujo (litro por minuto)"),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Porcentaje")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputPorcentajeAltoFlujo",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.ALTOFLUJOPORCENTAJE
                  
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Litro por minuto")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputLitroAltoFlujo",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.ALTOFLUJOLITROSPORMINUTO
                  
                }),
              ])
            ),
          ]),
          m("h6", "Tienda Facial"),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Porcentaje")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputPorcentajeTiendaFacial",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.TIENDAFACIALPORCENTAJE
                  
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Litros por minuto")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputLitroPorMinutoTiendaFacial",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.TIENDAFACIALLITROSPORMINUTO
                  
                }),
              ])
            ),
          ]),
          m("h6", "Tubo en T"),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Porcentaje")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputPorcentajeTuboEnT",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.TUBOENTPORCENTAJE
                  
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Litro por minuto")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputLitroTuboEnT",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.TUBOENTLITROSPORMINUTO
                  
                }),
              ])
            ),
          ]),
          m("h6", "Canula Nasal"),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Porcentaje")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputPorcentajeCanulaNasal",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.CANULANASALPORCENTAJE
                  
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Litros por minuto")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputLitroPorMinutoCanulaNasal",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.CANULANASALLITROSPORMINUTO
                  
                }),
              ])
            ),
          ]),
          m("h6", "Mascarilla"),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Porcentaje")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputPorcentajeMascarilla",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.MASCARILLAPORCENTAJE
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Litro por minuto")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputLitroMascarilla",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.MASCARILLALITROSPORMINUTO
                  
                }),
              ])
            ),
          ]),
          m("h6", "Heliox"),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Porcentaje")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputPorcentajeHeliox",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.HELIOXPORCENTAJE
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-4" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Litros por minuto")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputLitroPorMinutoHeliox",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.HELIOXLITROSPORMINUTO
                  
                }),
              ])
            ),
          ]),
          m("h6", "Aire Ambiente"),
          m(
            "div",
            { class: "row" },
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Porcentaje")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputPorcentajeAireAmbiente",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.AIREAMBIENTEPORCENTAJE
                  
                }),
              ])
            )
          ),
        ],
        m("br"),
        m("br"),
        [
          m(
            "div",
            { class: "d-flex justify-content-center" },
            m("h6", "Monitoreo")
          ),
          m("div", { class: "row d-flex justify-content-center" }, [
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-1" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputVentilacionMecanica",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.VENTILACIONMECANICA === "true" ? "checked" : ""
                  
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Ventilación Mecánica"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-4" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputVentilacionNoInvasiva",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.VENTILACIONNOINVASIVA === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Ventilación no invasiva"
                ),
              ])
            ),
          ]),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Previa Saturación O2(%) Porcentaje")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputSaturacionPreviaPorcentaje",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.SATURACIONPREVIA
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Posterior Saturación O2(%) Porcentaje")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputSaturacionPosteriorPorcentaje",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.SATURACIONPOSTERIOR
                }),
              ])
            ),
          ]),
          m("br"),
          m("br"),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Previa Frecuencia Cardiaca por Minuto")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputFrecuenciaCardiacaPreviaPorMinuto",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.FRECUENCIACARDIACAPREVIA
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Posterior Frecuencia Cardiaca por Minuto")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputFrecuenciaCardiacaPosteriorPorMinuto",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.FRECUENCIACARDIACAPOSTERIOR
                }),
              ])
            ),
          ]),
          m("br"),
          m("div", { class: "row" }, [
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  m("b", "Previa Frecuencia Respiratoria por Minuto")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputFrecuenciaRespiratoriaPreviaPorMinuto",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.FRECUENCIARESPIRATORIAPREVIA
                }),
              ])
            ),
            m(
              "div",
              { class: "col" },
              m("div", { class: "mb-6" }, [
                m(
                  "label",
                  { class: "form-label", for: "inputEscalaDolor" },
                  m("b", "Posterior Frecuencia Respiratoria por Minuto")
                ),
                m("input", {
                  class: "form-control",
                  type: "number",
                  id: "inputFrecuenciaRespiratoriaPosteriorPorMinuto",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.FRECUENCIARESPIRATORIAPOS
                }),
              ])
            ),
          ]),
        ],
        m("br"),
        m("br"),
        [
          m(
            "div",
            { class: "d-flex justify-content-center" },
            m("h6", "Succión")
          ),
          m("div", { class: "row justify-content-center" }, [
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputNasotraqueal",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.NASOTRAQUEAL === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Nasotraqueal"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputTraqueal",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.TRAQUEAL === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Traqueal"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputOrotraqueal",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.OROTRAQUEAL === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Orotraqueal"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputLavadoNasal",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.LAVADONASAL === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Lavado Nasal"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-3" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputSubglotica",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.SUBGLOTICA === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Subglótica"
                ),
              ])
            ),
          ]),
        ],
        m("br"),
        m("br"),
        [
          m(
            "div",
            { class: "d-flex justify-content-center" },
            m("h6", "Muestras")
          ),
          m("div", { class: "row justify-content-center" }, [
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputEsputo",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.ESPUTO === "true" ? "checked" : ""
                }),
                m("label", { class: "form-label", for: "inputPeso" }, "Esputo"),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputHisopado",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.ISOPADO === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Hisopado"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputSecrecionTraqueal",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.SECRECIONTRAQUEAL === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Secreción Traqueal"
                ),
              ])
            ),
          ]),
        ],
        [
          m(
            "div",
            { class: "d-flex justify-content-center" },
            m("h6", "Observación Clínica")
          ),
          m("h6", "Síntomas"),
          m("div", { class: "row justify-content-center" }, [
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputDisnea",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.DISNEA === "true" ? "checked" : ""
                }),
                m("label", { class: "form-label", for: "inputPeso" }, "Disnea"),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputTos",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.TOS === "true" ? "checked" : ""
                }),
                m("label", { class: "form-label", for: "inputPeso" }, "Tos"),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputExpectoacion",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.EXPECTORACION === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Expectoración"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputDolorToracico",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.DOLORTORACICO === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Dolor Torácico"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputHemoptisis",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.HEMOPTISIS === "true" ? "checked" : ""

                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Hemoptisis"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputFiebre",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.FIEBRE === "true" ? "checked" : ""
                }),
                m("label", { class: "form-label", for: "inputPeso" }, "Fiebre"),
              ])
            ),
          ]),
          m("h6", "Signos"),
          m("div", { class: "row justify-content-center" }, [
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputConsciencia",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.CONSCIENCIA === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Consciencia"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputIntubado",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.INTUBADO === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Intubado"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputEstridor",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.ESTRIDOR === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Estridor"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputSibilancias",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.SIBILANCIAS === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Sibilancias"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputRoncus",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.RONCUS === "true" ? "checked" : ""
                }),
                m("label", { class: "form-label", for: "inputPeso" }, "Roncus"),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputCrepitantes",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.CREPITANTES === "true" ? "checked" : ""

                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Crepitantes"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputLocalizacion",
                  disabled: true,
                  value: formularioModelo.listadoUnitario.LOCALIZACION === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Localización"
                ),
              ])
            ),
          ]),
          m("div", { class: "row justify-content-center" }, [
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputCianosis",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.CIANOSIS === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Cianosis"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputRuidoRespiratorio",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.RUIDORESPIRATORIO === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Ruido Respiratorio"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputDisminuido",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.DISMINUIDO === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Disminuido"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputAbolido",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.ABOLIDO === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Abolido"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputSonidoDeLaVoz",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.SONIDODELAVOZ === "true" ? "checked" : ""
                }),
                m(
                  "label",
                  { class: "form-label", for: "inputPeso" },
                  "Sonido de la voz"
                ),
              ])
            ),
            m(
              "div",
              { class: "col text-center" },
              m("div", { class: "mb-2" }, [
                m("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "",
                  id: "inputEdema",
                  disabled: true,
                  checked: formularioModelo.listadoUnitario.EDEMA === "true" ? "checked" : ""
                }),
                m("label", { class: "form-label", for: "inputPeso" }, "Edema"),
              ])
            ),
          ]),
        ],
        [
          m(
            "label",
            { class: "form-label", for: "textAreaObservacionClinica" },
            "Criterio"
          ),
          m("textarea", {
            class: "form-control",
            id: "textareaCriterio",
            rows: "3",
            disabled: true,
            value: formularioModelo.listadoUnitario.CRITERIO,
          }),
        ],
        ])
      : m(loader),
    ]
    
  },
};

export default EditarFormulario;
