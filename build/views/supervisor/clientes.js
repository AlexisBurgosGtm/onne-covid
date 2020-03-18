// CAMPO CODCLIE= CERO(0) ACTIVO, UNO(1) INACTIVO

function getView(){
    let view = {
        encabezado : ()=>{
            return `
        <div class="card">
            <div class="card-header">
                <h5>Censo de Clientes</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div class="form-group">
                            <input type="search" class="form-control" id="txtFiltrarCliente" placeholder="Buscar en listado...">
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div class="form-group">
                            <select class="form-control" id="cmbListadoVendedor"></select>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div class="form-group">
                            <select class="form-control" id="cmbListadoDia"></select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        },
        listado : ()=>{
            return `
        <div class="row">    
            <div class="table-responsive" id="tblClientes">
                
            </div>
        </div>    
            `
        },
        modalNuevo:()=>{
            return `
            <div class="modal fade" id="ModalNuevoCliente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title">Datos del Cliente</label>
                        </div>
                        <div class="modal-body">
                            <div class="form">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>NIT:</label>
                                            <input id="txtNit" class="form-control" type="text" placeholder="Escriba el NIT ...">
                                        </div>    
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Telefonos:</label>
                                            <input id="txtTelefono"  maxlength="8" class="form-control" type="number" placeholder="Telefono cliente">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label>Negocio/Establecimiento:</label>
                                    <input id="txtNegocio" class="form-control" type="text" placeholder="nombre del negocio">
                                </div>
                                <div class="form-group">
                                    <label>Nombre y Apellido:</label>
                                    <input id="txtNomcliente" class="form-control" type="text" placeholder="nombre completo">
                                </div>
                                <div class="form-group">
                                    <label>Dirección:</label>
                                    <input id="txtDircliente" class="form-control" type="text" placeholder="Dirección cliente...">
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Municipio:</label>
                                            <select id="cmbMunicipio" class="form-control">
                                            </select>
                                        </div>    
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Departamento:</label>
                                            <select id="cmbDepartamento" class="form-control">
                                            </select>
                                        </div>    
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="form-group">
                                            <label>Vendedor:</label>
                                            <select id="cmbVendedor" class="form-control">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="form-group">
                                            <label>Día de Visita:</label>
                                            <select id="cmbDiaVisita" class="form-control">                                        
                                            </select>
                                        </div>    
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Observaciones:</label>
                                    <input id="txtObs" class="form-control" type="text" placeholder="">
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Latitud:</label>
                                            <h4 id="txtLatitud">0</h4>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Longitud:</label>
                                            <h4 id="txtLongitud">0</h4>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <button id="btnCancelar" class="btn btn-default btn-lg btn-round" data-dismiss="modal">
                                        <i class="now-ui-icons ui-1_simple-remove"></i>
                                        Cancelar
                                    </button>
                                    <button id="btnGuardar" class="btn btn-primary btn-lg btn-round">
                                        <i class="now-ui-icons ui-1_check"></i> 
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        },
        btnNuevo : ()=>{
            return `
            <div id="fixed-btn2">
                <button class="btn btn-success btn-circle btn-xl" id="btnNuevo">+</button>
            </div>
            `
        },
        menuLateral : ()=>{
            return `
            <div class="row">
                <div clas="card">
                    Datos del cliente, mapa de ubicación
                </div>
                <div clas="card">
                    <div class="card-footer" id="containerBotonesCliente">
                    </div>
                </div>
            </div>
            `
        }
    }

    root.innerHTML = view.encabezado() + view.listado() + view.modalNuevo() + view.btnNuevo();
    rootMenuLateral.innerHTML = view.menuLateral();
};

async function addListeners(){

    funciones.getComboMunicipios('cmbMunicipio')
    funciones.getComboDepartamentos('cmbDepartamento');
    document.getElementById('cmbDiaVisita').innerHTML = funciones.ComboSemana('LETRAS');
    await api.comboVendedores(GlobalCodSucursal,'cmbVendedor')
    await api.comboVendedores(GlobalCodSucursal,'cmbListadoVendedor')
    
    let btnNuevo = document.getElementById('btnNuevo');
    btnNuevo.addEventListener('click',async()=>{
        //obtiene el gps point del cliente
        await funciones.ObtenerUbicacion('txtLatitud','txtLongitud');
        $('#ModalNuevoCliente').modal('show');

    });

    let cmbListadoVendedor = document.getElementById('cmbListadoVendedor');
    cmbListadoVendedor.addEventListener('change',()=>{
        api.clientesListadoVendedor(GlobalCodSucursal,cmbListadoVendedor.value,'tblClientes');

    })
    
    let cmbListadoDia = document.getElementById('cmbListadoDia');
    cmbListadoDia.innerHTML = '<option value="">TODOS</option>' + funciones.ComboSemana("LETRAS");
    cmbListadoDia.addEventListener('change',()=>{
        funciones.crearBusquedaTabla('tblClientesVendedor','cmbListadoDia');
    });


    api.clientesListadoVendedor(GlobalCodSucursal,cmbListadoVendedor.value,'tblClientes');

    let txtFiltrarCliente = document.getElementById('txtFiltrarCliente');
    txtFiltrarCliente.addEventListener('keyup',()=>{
        funciones.crearBusquedaTabla('tblClientesVendedor','txtFiltrarCliente');
    });

    
};

function inicializarVistaClientesSupervisor(){
    getView();
    addListeners();
}

function getMenuCliente(nitclie,nombre,direccion,diavisita,codven,activo){
    
    showMenuLateral('Cliente ' + nombre);

    let containerBotonesCliente = document.getElementById('containerBotonesCliente');
    containerBotonesCliente.innerHTML = '';

    let btnDesactivaCliente = document.createElement('button');
    btnDesactivaCliente.className ="btn btn-danger btn-lg";
    btnDesactivaCliente.innerText ="DESACTIVAR CLIENTE"
    btnDesactivaCliente.addEventListener('click',async()=>{
        await desactivarCliente(GlobalCodSucursal,nitclie);
    });


    let btnActivaCliente = document.createElement('button');
    btnActivaCliente.className ="btn btn-success btn-lg";
    btnActivaCliente.innerText ="ACTIVAR CLIENTE"
    btnActivaCliente.addEventListener('click',async()=>{
        await activarCliente(GlobalCodSucursal,nitclie);
    });

    if(activo==0){
        containerBotonesCliente.appendChild(btnDesactivaCliente);
    }else{
        containerBotonesCliente.appendChild(btnActivaCliente);
    }

}

function desactivarCliente(sucursal,nitclie){
    funciones.Confirmacion('¿Está seguro que desea Desactivar este Cliente?')
    .then((value)=>{
        if(value==true){
            api.clientesListadoDesactivar(sucursal,nitclie)
            .then((data)=>{
                if(data.data.rowsAffected[0]==1){
                    funciones.Aviso('Cliente Desactivado con éxito!!')
                    api.clientesListadoVendedor(GlobalCodSucursal,cmbListadoVendedor.value,'tblClientes');    
                }
            })
            .catch((err)=>{
                funciones.AvisoError('No se pudo Desactivar este Cliente');
            })
        }
    })
    
};

function activarCliente(sucursal,nitclie){
    funciones.Confirmacion('¿Está seguro que desea Re-Activar este Cliente?')
    .then((value)=>{
        if(value==true){
            api.clientesListadoActivar(sucursal,nitclie)
            .then((data)=>{
                if(data.data.rowsAffected[0]==1){
                    funciones.Aviso('Cliente Activado con éxito!!')
                    api.clientesListadoVendedor(GlobalCodSucursal,cmbListadoVendedor.value,'tblClientes');    
                }
            })
            .catch((err)=>{
                funciones.AvisoError('No se pudo Activar este Cliente');
            })
        }
    })
    
};