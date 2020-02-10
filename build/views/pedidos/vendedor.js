function getView(){
    let view = {
        encabezado: ()=>{
            return `
            <div class="col-12 bg-trans-gradient text-white">
                <h5>Pedidos tomados por fecha</h5>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <input type="date" class="form-control" id="txtFechaPedido">
                </div>
                
                <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <h1 class="text-danger" id="lbTotalPedidos">Q 0.00</h1>
                </div>
            
            </div>
            <div class="row">
                <div class="col-4">
                    <button class="btn btn-success" id="btnCargarPedidos">
                        <i class="fal fa-tag"></i>
                        Pedidos
                    </button>                
                </div>
                <div class="col-4">
                    <button class="btn btn-success" id="btnCargarProductos">
                        <i class="fal fa-cube"></i>
                        Producto
                    </button>                
                </div>
                <div class="col-4">
                    <button class="btn btn-success" id="btnCargarMarcas">
                        <i class="fal fa-credit-card-front"></i>    
                        Marcas
                    </button>                
                </div>
            </div>
            `
        },
        listado: ()=>{
            return `
            <br>
            <div class="row card">
                <div class="table-responsive" id="tblListaPedidos">
                    
                </div>
            </div>
            `
        }
    };

    root.innerHTML = view.encabezado() + view.listado()
};

function addListeners(){
    let btnCargarPedidos = document.getElementById('btnCargarPedidos');
    let btnCargarProductos = document.getElementById('btnCargarProductos');
    let btnCargarMarcas = document.getElementById('btnCargarMarcas');
    
    let txtFechaPedido = document.getElementById('txtFechaPedido');
    let lbTotalPedidos = document.getElementById('lbTotalPedidos');

    txtFechaPedido.value = funciones.getFecha();

    btnCargarProductos.addEventListener('click',async ()=>{
        await api.reporteDiaProductos(GlobalCodSucursal,GlobalCodUsuario,funciones.devuelveFecha('txtFechaPedido'),'tblListaPedidos','lbTotalPedidos');
    });
    btnCargarMarcas.addEventListener('click',async ()=>{
        await api.reporteDiaMarcas(GlobalCodSucursal,GlobalCodUsuario,funciones.devuelveFecha('txtFechaPedido'),'tblListaPedidos','lbTotalPedidos');
    });
    btnCargarPedidos.addEventListener('click',async ()=>{
        await api.pedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,funciones.devuelveFecha('txtFechaPedido'),'tblListaPedidos','lbTotalPedidos');
    });
    btnCargarPedidos.click();

};

function inicializarVistaPedidos(){
    getView();
    addListeners();

};