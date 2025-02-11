import m from "mithril";
import BotonCheck from "./BotonCheck";

const TablePrescription = {
  view: ({ attrs: { data, handleCheck } }) => {
    return m("table", { class: "table" }, [
      m(
        "thead",
        m("tr", [
          m("th", { scope: "col" }, "Prescripción"),
          m("th", { scope: "col" }, "Hora Solicitada"),
          m("th", { scope: "col" }, "Hora Chequeo"),
          m("th", { scope: "col" }, "Usuario de Chequeo"),
          m("th", { scope: "col" }, "Tipo de Administración"),
          m("th", { scope: "col" }, "Justificación"),
          m("th", { scope: "col" }, "Observación"),
        ])
      ),
      m(
        "tbody",
        data.map((item) =>
          m("tr", [
            m("td", item.dsTipPresc),
            m(
              "td",
              new Date(item.dhMedicacao).toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            ),
            m(
              "td",
              item.dhChecagem
                ? new Date(item.dhChecagem).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : m(BotonCheck, { onClick: () => handleCheck(item) })
            ),
            m("td", item.nmUsuario),
            /* Si snSupenso es S es administrado, Si es N No adminstrado. Caso contrario poner lo que viene en snSuspenso */
            m("td", item.snSuspenso === "S" ? "No Administrado" : item.snSuspenso === "N" ? "Administrado" : item.snSuspenso),
            m("td", item.justificacion),
            m("td", item.observacion),
          ])
        )
      ),
    ]);
  },
};

export default TablePrescription;
