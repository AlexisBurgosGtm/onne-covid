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
                <div class="col-4">
                    <select class="form-control" id="cmbStatus">
                        <option value="O">Pendientes</option>
                        <option value="A">Bloqueados</option>
                    </select>
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
                    <div class="col-1"></div>
                    <div class="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        
                        <select class="form-control" id="cmbEmbarques">
                        </select>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <button class="btn btn-md btn-danger" id="btnPedidoBloquear">
                            <i class="fal fa-globe"></i>
                            Bloquear_
                        </button>
                        <button class="btn btn-md btn-success" id="btnPedidoConfirmar">
                            <i class="fal fa-bell"></i>
                            Confirmar
                        </button>
                    </div>

                </div>
                <br>
                <div class="table-responsive">
                    <table class="table table-responsive table-hover table-striped table-bordered">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>Producto</td>
                                <td>Medida</td>
                                <td>Cant</td>
                                <td>Precio</td>
                                <td>Subtotal</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody id="tblDetallePedido"></tbody>
                        
                    </table>
                </div>
                <br>
                <div class="">
                    <div class="col-1"></div>
                    <div class="col-5">
                        <label>Total Pedido : </label>
                        <h2 class="text-danger" id="lbTotalDetallePedido"></h2>
                    </div>
                    
                </div>
            </div>
            `
        },
        listaTipoPrecio : ()=>{
            return `
        <div class="modal fade" id="modalTipoPrecio" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
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

        },
        modalCantidad:()=>{
            return `
            <div class="modal fade" id="ModalCantidad" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Nueva Cantidad</label>
                        </div>

                        <div class="modal-body">

                            <div class="row">
                                <div class="col-2">
                                    <h1 class="text-danger fw-700">Cant:</h1>
                                </div>
                                <div class="col-8 text-center">
                                    <h1 class="text-danger fw-700" id="lbCalcTotal">0</h1>
                                </div>
                                <div class="col-2"></div>
                            </div>
                            
                            <br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc1">1</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc2">2</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc3">3</button>
                                </div>
                            </div>
                            
                            <br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc4">4</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc5">5</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc6">6</button>
                                </div>
                            </div>
                            
                            <br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc7">7</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc8">8</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc9">9</button>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-4">
                            
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc0">0</button>
                                </div>
                                <div class="col-4">
                            
                                </div>
                            </div>

                            <br><br><br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-danger btn-md" id="btnCalcCancelar">Cancelar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-primary btn-md" id="btnCalcLimpiar">Limpiar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-success btn-md" id="btnCalcAceptar">Aceptar</button>
                                </div>
                            </div>
                        
                        </div>
                        
                    </div>
                </div>
            </div>
            `
        }
    };

    root.innerHTML = view.encabezado() + view.listado() + view.listaTipoPrecio();
    rootMenuLateral.innerHTML = view.detallepedido() + view.modalCantidad();
    
};

async function addListeners(){
    
    iniciarModalCantidad();

    //tipo de lista
    let cmbStatus = document.getElementById('cmbStatus');
    cmbStatus.addEventListener('change',()=>{
        api.digitadorPedidosVendedor(GlobalCodSucursal,cmbVendedor.value,'tblPedidos','lbTotal',cmbStatus.value)
    });

    //agrega el listener del combo de vendedores
    let cmbVendedor = document.getElementById('cmbVendedor');
    cmbVendedor.addEventListener('change',()=>{
        api.digitadorPedidosVendedor(GlobalCodSucursal,cmbVendedor.value,'tblPedidos','lbTotal',cmbStatus.value)
    });

    //carga la lista
    api.comboVendedores(GlobalCodSucursal,'cmbVendedor')
    .then(()=>{

        api.digitadorPedidosVendedor(GlobalCodSucursal,cmbVendedor.value,'tblPedidos','lbTotal',cmbStatus.value)
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
                    api.digitadorPedidosVendedor(GlobalCodSucursal,cmbVendedor.value,'tblPedidos','lbTotal',cmbStatus.value)
                    $("#modalMenu").modal('hide');
                })
                .catch(()=>{
                    funciones.AvisoError('No se pudo Bloquear :(')
                })
            }
        })
        
    });

    let cmbEmbarques = document.getElementById('cmbEmbarques');

    let btnPedidoConfirmar = document.getElementById('btnPedidoConfirmar');
    btnPedidoConfirmar.addEventListener('click',()=>{
        
        funciones.Confirmacion('¿Está seguro que desea CONFIRMAR este Pedido?')
        .then((value)=>{
            if(value==true){
                api.digitadorConfirmarPedido(GlobalCodSucursal,cmbVendedor.value,GlobalSelectedCoddoc,GlobalSelectedCorrelativo,cmbEmbarques.value)
                .then(()=>{
                    funciones.Aviso('Pedido CONFIRMADO exitosamente!!')
                    api.digitadorPedidosVendedor(GlobalCodSucursal,cmbVendedor.value,'tblPedidos','lbTotal',cmbStatus.value)
                    $("#modalMenu").modal('hide');
                })
                .catch(()=>{
                    funciones.AvisoError('No se pudo CONFIRMAR :(')
                })
            }
        })

    });

    await api.digitadorComboEmbarques('cmbEmbarques');
    
};

function iniciarVistaDigitador(){
    getView();
    addListeners();

};

function getDetallePedido(fecha,coddoc,correlativo){
    GlobalSelectedFecha = fecha;
    lbMenuTitulo.innerText = `Pedido: ${coddoc}-${correlativo}`;
    api.digitadorDetallePedido(fecha,coddoc,correlativo,'tblDetallePedido','lbTotalDetallePedido')
    $("#modalMenu").modal('show');
};

function getModalCantidad(idRow){

    document.getElementById('lbCalcTotal').innerText='';    
    $("#ModalCantidad").modal('show');


};


function deleteProductoPedido(idRow,coddoc,correlativo,totalprecio,totalcosto){
    funciones.Confirmacion('¿Está seguro que desea Quitar este Producto en este Pedido?')
    .then((value)=>{
        if(value==true){

            api.digitadorQuitarRowPedido(idRow,coddoc,correlativo,totalprecio,totalcosto)
            .then(async()=>{
                
                await api.digitadorPedidosVendedor(GlobalCodSucursal,cmbVendedor.value,'tblPedidos','lbTotal',cmbStatus.value)
                document.getElementById(idRow).remove();
                
                api.digitadorDetallePedido(GlobalSelectedFecha,coddoc,correlativo,'tblDetallePedido','lbTotalDetallePedido')

                funciones.Aviso('Item removido exitosamente !!')
            })
            .catch((error)=>{
                console.log(error)
                funciones.AvisoError('No se pudo remover el item')
            })
            
            
        }
    })    
};


function iniciarModalCantidad(){
    let total = document.getElementById('lbCalcTotal');
    total.innerText = "";
    let btnCalcAceptar = document.getElementById('btnCalcAceptar');
    let btnCalcLimpiar = document.getElementById('btnCalcLimpiar');
    let btnCalcCancelar = document.getElementById('btnCalcCancelar');

    let b0 = document.getElementById('btnCalc0');
    let b1 = document.getElementById('btnCalc1');
    let b2 = document.getElementById('btnCalc2');
    let b3 = document.getElementById('btnCalc3');
    let b4 = document.getElementById('btnCalc4');
    let b5 = document.getElementById('btnCalc5');
    let b6 = document.getElementById('btnCalc6');
    let b7 = document.getElementById('btnCalc7');
    let b8 = document.getElementById('btnCalc8');
    let b9 = document.getElementById('btnCalc9');

    b0.addEventListener('click',()=>{total.innerText = total.innerText + "0"})
    b1.addEventListener('click',()=>{total.innerText = total.innerText + "1"})
    b2.addEventListener('click',()=>{total.innerText = total.innerText + "2"})
    b3.addEventListener('click',()=>{total.innerText = total.innerText + "3"})
    b4.addEventListener('click',()=>{total.innerText = total.innerText + "4"})
    b5.addEventListener('click',()=>{total.innerText = total.innerText + "5"})
    b6.addEventListener('click',()=>{total.innerText = total.innerText + "6"})
    b7.addEventListener('click',()=>{total.innerText = total.innerText + "7"})
    b8.addEventListener('click',()=>{total.innerText = total.innerText + "8"})
    b9.addEventListener('click',()=>{total.innerText = total.innerText + "9"})
    btnCalcLimpiar.addEventListener('click',()=>{total.innerText = ""})

    btnCalcAceptar.addEventListener('click',async ()=>{
        let n = Number(total.innerText);
        
        fcnUpdateRowPedido();
        //fcnUpdateTempRow(GlobalSelectedId,n)
        //.then(async()=>{
            
            //
        //})
        total.innerText = "";
        
        $("#ModalCantidad").modal('hide');
    })

    btnCalcCancelar.addEventListener('click',()=>{
        $("#ModalCantidad").modal('hide');
    });

};

function fcnUpdateRowPedido(idRow,cant){
    
    funciones.Aviso('En esta función se cambiará el total');

};