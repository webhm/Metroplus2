let FormularioModels = {
    listado: [],
    listadoUnitario: [],
    listaEscalaDelDolor: [],
    examenes: [],
    error: '',
    secuencialMuestra: '',
    numeroPedido: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    medico: '',
    loading: false,
    idRespuesta: '',

    cargarEscalaDelDolor: function(numeroDeAtendimiento) {
        FormularioModels.loading = true;
        m.request({
                method: "GET",
                //url: `https://api.hospitalmetropolitano.org/t/v1/tr/trn/formularios/sv?PARAM=ESCALA_DOLOR&CD_ATENDIMENTO=${numeroDeAtendimiento}`,
                url: `https://api.hospitalmetropolitano.org/t/v1/tr/formularios/sv?PARAM=ESCALA_DOLOR&CD_ATENDIMENTO=${numeroDeAtendimiento}`,
                body: {},
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Accept: "application/json",
                    Authorization: localStorage.accessToken,
                },
            })
            .then(function(result) {
                if (
                    result.status &&
                    result.data.length > 0 &&
                    result.data[0].VALUE != null
                ) {
                    FormularioModels.listaEscalaDelDolor = result;
                    FormularioModels.loading = false;
                    //console.log(FormularioDeRegistro.listaEscalaDelDolor);
                }
                /* else {
                              FormularioModels.listaEscalaDelDolor.push({data: [{VALUE: ''}]});
                              alert(FormularioModels.error);
                                FormularioModels.loading = false;
                            } */
            })
            .catch(function(error) {
                FormularioModels.error = error;
                alert(FormularioModels.error);
                //FormularioDeRegistro.loading = false;
            });
    },

    cargarListado: function(numeropedidomv) {
        FormularioModels.loading = true;
        FormularioModels.idRespuesta = '';
        m.request({
                method: "GET",
                //url: "https://api.hospitalmetropolitano.org/t/v1/tr/trn/formularios/historial?numeroPedido=" + numeropedidomv,
                url: "https://api.hospitalmetropolitano.org/t/v1/tr/formularios/historial?numeroPedido=" + numeropedidomv,
                body: {},
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json",
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                FormularioModels.listado = result.data;
                FormularioModels.loading = false;
                FormularioModels.idRespuesta = numeropedidomv;
                //console.log(FormularioModels.idRespuesta);
                //FormularioModels.listado = [];	
            })
            .catch(function(error) {
                FormularioModels.loading = false;
                FormularioModels.error = error;
                alert(FormularioModels.error);
            })
    },

    cargarUnFormulario: function(id) {
        FormularioModels.loading = true;
        m.request({
                method: "GET",
                //url: "https://api.hospitalmetropolitano.org/t/v1/tr/trn/formularios-terapia?ID=" + id,
                url: "https://api.hospitalmetropolitano.org/t/v1/tr/formularios-terapia?ID=" + id,
                body: {},
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json",
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                //return result.data;
                FormularioModels.listadoUnitario = result.data[0];
                FormularioModels.loading = false;
            })
            .catch(function(error) {
                FormularioModels.loading = false;
                FormularioModels.error = error;
                alert(FormularioModels.error);
            })
    },

    guardar: (formulario) => {
        FormularioModels.loading = true;
        m.request({
                method: 'POST',
                // url: "https://api.hospitalmetropolitano.org/t/v1/tr/trn/formularios-terapia",
                url: "https://api.hospitalmetropolitano.org/t/v1/tr/formularios-terapia",
                body: formulario,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json",
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                //muestraModel.cargarListado(muestraModel.numeroPedido);
                //muestraModel.secuencialMuestra = '';
                //FormularioModels.listado.push(result);
                FormularioModels.cargarListado(formulario.NUMERODEPEDIDO);
                FormularioModels.loading = false;
                window.location.reload();
                //window.location.href = window.location.href;
            })
            .catch(function(error) {
                FormularioModels.error = "Se produjo modificando el estado: " + error.response.message;
                alert(FormularioModels.error);
            })
    },

    modificarEstado: (formulario) => {
        m.request({
                method: 'PUT',
                //url: "https://api.hospitalmetropolitano.org/t/v1/trn/nuevo-status-pedido-tr",
                url: "https://api.hospitalmetropolitano.org/t/v1/nuevo-status-pedido-tr",
                body: formulario,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json",
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                //muestraModel.cargarListado(muestraModel.numeroPedido);
                //muestraModel.secuencialMuestra = '';
                window.location.href = window.location.href;
            })
            .catch(function(error) {
                FormularioModels.error = "Se produjo error actualizando el estado: " + error.response.message;
                alert(FormularioModels.error);
            })
    },

    actualizar: (formulario) => {
        m.request({
                method: 'PUT',
                //url: "https://api.hospitalmetropolitano.org/t/v1/tr/trn/formularios-terapia",
                url: "https://api.hospitalmetropolitano.org/t/v1/tr/formularios-terapia",
                body: formulario,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json",
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                FormularioModels.cargarListado(formulario.NUMERODEPEDIDO);
                //window.location.href = window.location.href;
            })
            .catch(function(error) {
                FormularioModels.error = "Se produjo error editando el formulario: " + error.response.message;
                alert(FormularioModels.error);
            })
    },
}

export default FormularioModels;