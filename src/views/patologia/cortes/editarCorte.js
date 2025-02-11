import corteModel from './models/corteModel';

let corteModelo = corteModel;
let informeModelo = null;

const editarCorte = {
    oninit: (vnode) => {
        if (vnode.attrs.informeModelo !== undefined) {
            informeModelo = vnode.attrs.informeModelo;
        }
    },  
    oncreate: (vnode) => {
        vnode.dom['inputcortedescripcion'].focus();
    }, 
    view: (vnode) => {
        return [
            m("form#editar-corte"),
            m("td.tx-12", {style: {'width': '20%', 'padding': '8px 0'}}, [
                m("input.form-control[id='inputcorteid'][type='text'][form='editar-corte']", { 
                    disabled: true, 
                    value: informeModelo.secuencialInforme + "-" + corteModelo.secuencialCorte,
                })
            ]),
            m("td.tx-12", {style: {'width': '60%'}}, [
                m("textarea.form-control[id='inputcortedescripcion'][form='editar-corte'][placeholder='Descripción del Corte'][title='Descripción del Corte']", {
                    style: "height: 38px",
                    rows: 4,
                })
            ]),
            m("td.tx-12", {style: {'width': '20%', 'padding': '0'}}, [
                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][form='editar-corte']", {
                    onclick: function() { 
                        vnode.dom['btnnuevocorte'].disabled = false;
                        if (vnode.dom['inputletra'].value.length === 0) {
                            corteModelo.error = "El campo Letra es Requerido";
                            alert(corteModelo.error);
                            vnode.dom['inputletra'].focus();
                        } else if (vnode.dom['inputcortedescripcion'].value.length === 0) {
                            corteModelo.error = "El campo Descripción es Requerido";
                            alert(corteModelo.error);
                            vnode.dom['inputcortedescripcion'].focus();
                        } else {
                            let corte = {
                                informe_id: 0,
                                codigocorte: vnode.dom['inputcorteid'].value,                                
                                descripcion: vnode.dom['inputcortedescripcion'].value,
                            }
                            corteModelo.listado.push(corte);
                            m.mount(document.querySelector("#gestion-cortes"), null);
                        }},
                        style: {'margin': '15px 5px 0 5px', "width": "47%", 'padding': '5px'}
                }, [
                    m("i.fas.fa-save.mg-r-5", )
                ], "Guardar"),
                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][form='editar-corte']", {
                    onclick: function() { 
                        vnode.dom['btnnuevocorte'].disabled = false;
                        m.mount(document.querySelector("#gestion-cortes"), null);
                    },
                    style: {'margin': '15px 0 0 0', "width": "47%", 'padding': '5px'}
                }, [
                    m("i.fas.fa-save.mg-r-5", )
                ], "Cancelar"),                
            ]),
        ]
    }
}

export default editarCorte;