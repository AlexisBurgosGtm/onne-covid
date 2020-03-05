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
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-responsive table-hover table-striped">
                                
                                <thead class="bg-trans-gradient">
                                    <tr>
                                        <td>Producto</td>
                                        <td>Medida</td>
                                        <td>Precio</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                
                                <tbody id="tblPrecios">
                                </tbody>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    }

    root.innerHTML = view.encabezado() + view.listado();

};

function addListeners(){

    
};

function inicializarVistaPrecios(){
    getView();
    addListeners();

};

