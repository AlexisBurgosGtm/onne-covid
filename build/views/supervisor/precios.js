function getView(){
    let view ={
        encabezado:()=>{
            return `
            <div class="row">
                <div class="card col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="card-header">
                        <div class="form-group">
                            <label>Buscar por Nombre</label>
                            <input class="form-control" id="txtBuscarProducto" placeholder="Busque por descripción...">
                        </div>
                    </div>
                </div>
                <div class="card col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="card-header">
                        <div class="form-group">
                            <label>Buscar por Marca</label>
                            <select class="form-control" id="cmbBuscarMarca">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            `
        },
        listado:()=>{
            return `
            <div class="row">
                <div class="card col-12">
                    <div class="table-responsive" id="containerListado">
                        
                    </div>       
                </div>
            </div>`
        }
    }

    root.innerHTML = view.encabezado() + view.listado();

};

function addListeners(){

    let txtBuscarProducto = document.getElementById('txtBuscarProducto');
    txtBuscarProducto.addEventListener('keyup',()=>{
        funciones.crearBusquedaTabla('tblPrecios','txtBuscarProducto');
    });

    api.preciosListado(GlobalCodSucursal,'containerListado');
};

function inicializarVistaPrecios(){
    getView();
    addListeners();

};

