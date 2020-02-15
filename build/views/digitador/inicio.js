function getView(){
    let view ={
        encabezado : ()=>{
            return `
            <div class="row">

                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div class="form-group">               
                        <label>Seleccione un vendedor</label>
                        <select id="cmbVendedor" class="form-control"></select>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                        <label>Total : </label>
                        <h3 id='lbTotal' class="text-danger"></h3>
                    </div>
                </div>
            </div> 

            <div class="row">
                
                <div class="col-4">
                    <button class="btn btn-lg btn-info" id="btnCargarTipoPrecio">
                        <i class="fal fa-tag"></i>
                        Tipo Precio
                    </button>
                </div>

            </div>
            `
        },
        listado : ()=>{
            return `
            <br>
            <div class="row">
                <div class="card col-12">                    
                    <div class="table-responsive">
                        <table class="table table-responsive table-striped table-hover table-bordered">
                            <thead class="bg-trans-gradient text-white">
                                <tr>
                                    <td>Fecha</td>
                                    <td>Pedido</td>
                                    <td>Cliente</td>
                                    <td>Importe</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblPedidos"></tbody>
                        </table>
                    </div>
                </div>
            </div>
            `
        },
        detallepedido: ()=>{
            return `
            <div class="card">
                <br>
                <div class="row">
                    <div class="col-5">
                        <label>Total Pedido : </label>
                        <h3 class="text-danger" id="lbTotalDetallePedido"></h3>
                    </div>

                    <div class="col-7">
                        <button class="btn btn-md btn-danger col-5" id="btnPedidoBloquear">
                            <i class="fal fa-globe"></i>
                            Bloquear
                        </button>
                        <button class="btn btn-md btn-success col-5" id="btnPedidoConfirmar">
                            <i class="fal fa-bell"></i>
                            Confirmar
                        </button>
                    </div>

                </div>
                <div class="table-responsive">
                    <table class="table table-responsive table-hover table-striped table-bordered">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>Producto</td>
                                <td>Medida</td>
                                <td>Cant</td>
                                <td>Precio</td>
                                <td>Subtotal</td>
                            </tr>
                        </thead>
                        <tbody id="tblDetallePedido"></tbody>
                    </table>
                </div>
            </div>
            `
        },
        listaTipoPrecio : ()=>{
            return `
        <div class="modal fade" id="modalTipoPrecio" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <label class="modal-title text-danger h3" id="">Tipo de Precio en Pedidos</label>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fal fa-times"></i></span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="table-responsive">
                                <table class="table table-responsive table-hover table-striped table-bordered">
                                    <thead class="bg-trans-gradient text-white">
                                        <tr>
                                            <td>Documento</td>
                                            <td>Producto</td>
                                            <td>Medida</td>
                                            <td>Cant</td>
                                            <td>Precio</td>
                                            <td>Importe</td>
                                        </tr>
                                    </thead>
                                    <tbody id="tblTipoPrecio">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row"></div>
    
                    </div>
                </div>
            </div>
        </div>`

        }
    };

    root.innerHTML = view.encabezado() + view.listado() + view.listaTipoPrecio();
    rootMenuLateral.innerHTML = view.detallepedido();
    
};

function addListeners(){
    
    //agrega el listener del combo de vendedores
    let cmbVendedor = document.getElementById('cmbVendedor');
    cmbVendedor.addEventListener('change',()=>{
        api.digitadorPedidosVendedor(GlobalCodSucursal,cmbVendedor.value,'tblPedidos','lbTotal')
    });

    //carga la lista
    api.comboVendedores(GlobalCodSucursal,'cmbVendedor')
    .then(()=>{

        api.digitadorPedidosVendedor(GlobalCodSucursal,cmbVendedor.value,'tblPedidos','lbTotal')
    });

    let btnCargarTipoPrecio = document.getElementById('btnCargarTipoPrecio');
    btnCargarTipoPrecio.addEventListener('click',()=>{
       
       api.digitadorPedidosTipoprecio(GlobalCodSucursal,cmbVendedor.value,'tblTipoPrecio')
  
        $("#modalTipoPrecio").modal('show');
    });

    let btnPedidoBloquear = document.getElementById('btnPedidoBloquear');
    btnPedidoBloquear.addEventListener('click',()=>{
        funciones.Confirmacion('¿Está seguro que desea Bloquear/Anular este Pedido?')
        .then((value)=>{
            if(value==true){
                api.digitadorBloquearPedido(GlobalCodSucursal,cmbVendedor.value,GlobalSelectedCoddoc,GlobalSelectedCorrelativo)
                .then(()=>{
                    funciones.Aviso('Pedido BLOQUEADO exitosamente!!')
                    api.digitadorPedidosVendedor(GlobalCodSucursal,cmbVendedor.value,'tblPedidos','lbTotal')
                    $("#modalMenu").modal('hide');
                })
                .catch(()=>{
                    funciones.AvisoError('No se pudo Bloquear :(')
                })
            }
        })
        
    });

    let btnPedidoConfirmar = document.getElementById('btnPedidoConfirmar');
    btnPedidoConfirmar.addEventListener('click',()=>{
        
        funciones.Confirmacion('¿Está seguro que desea CONFIRMAR este Pedido?')
        .then((value)=>{
            if(value==true){
                api.digitadorConfirmarPedido(GlobalCodSucursal,cmbVendedor.value,GlobalSelectedCoddoc,GlobalSelectedCorrelativo)
                .then(()=>{
                    funciones.Aviso('Pedido CONFIRMADO exitosamente!!')
                    api.digitadorPedidosVendedor(GlobalCodSucursal,cmbVendedor.value,'tblPedidos','lbTotal')
                    $("#modalMenu").modal('hide');
                })
                .catch(()=>{
                    funciones.AvisoError('No se pudo CONFIRMAR :(')
                })
            }
        })

    });


};

function iniciarVistaDigitador(){
    getView();
    addListeners();

};

function getDetallePedido(fecha,coddoc,correlativo){
    lbMenuTitulo.innerText = `Pedido: ${coddoc}-${correlativo}`;
    api.digitadorDetallePedido(fecha,coddoc,correlativo,'tblDetallePedido','lbTotalDetallePedido')
    $("#modalMenu").modal('show');
};
