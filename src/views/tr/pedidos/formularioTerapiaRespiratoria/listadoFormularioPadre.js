import m from 'mithril';
import FormularioModels from './models/formularioModels';
import Pedido from '../pedido';
import loader from '../../../patologia/utils/loader';
import ListadoFormulario from './listadoFormulario';
import noInfo from '../../../patologia/utils/noInfo';

let formularioModelo = FormularioModels;


const ListadoFormularioPadre = {
    oninit: (vnode) => {
        App.isAuth();
        formularioModelo.cargarListado(Pedido.numeroPedido);
    }, 
    oncreate: (vnode) => {
        if (formularioModelo.listado.length == 0) {
            m.mount(document.querySelector("div#loader"), loader);
        } else if (formularioModelo.listado.length > 0) {
            m.mount(document.querySelector("div#loader"), null); 
            m.mount(document.querySelector("table.table#listado-formulario"), {
                view: (vnode) => {
                    return [
                        m(ListadoFormulario)
                    ]
                }
            });            
        } 
    }, 
    onupdate: (vnode) => {
        if (formularioModelo.listado.length == 0 && formularioModelo.loading) {
            m.mount(document.querySelector("div#loader"), loader);
        } else if (formularioModelo.listado.length > 0 && !formularioModelo.loading) {
            m.mount(document.querySelector("div#loader"), null); 
            m.mount(document.querySelector("table.table#listado-macroscopico"), {
                view: (vnode) => {
                    return [
                        m(ListadoFormulario)
                    ]
                }
            });
        } else if (formularioModelo.listado.length == 0 && !formularioModelo.loading) {
            m.mount(document.querySelector("div#loader"), noInfo);
        }
    },
    view: function(vnode) {
        
    },

}

export default ListadoFormularioPadre;