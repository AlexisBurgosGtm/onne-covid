function getView(){
    let view ={
        encabezado : ()=>{
            return `
            <div class="row">
                <div class="card col-12">   
                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">               
                        <label>Seleccione un vendedor</label>
                        <select id="cmbVendedor" class="form-control"></select>
                    </div>
                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <label>Total : </label>
                        <h3 id='lbTotal' class="text-danger"></h3>
                    </div>
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
                        <button class="btn btn-md btn-danger col-5">
                                <i class="fal fa-globe"></i>
                                Bloquear
                        </button>
                        
                        <button class="btn btn-md btn-success col-5">
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
        }
    };

    root.innerHTML = view.encabezado() + view.listado()
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
