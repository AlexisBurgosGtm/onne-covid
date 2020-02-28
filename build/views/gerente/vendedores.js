function getView(){
    let view ={
        encabezado : ()=>{
            return `
            <div class="row">
                <div class="card col-12">                  
                    <select id="cmbSucursal" class="form-control"></select>
                </div>
            </div>
            `
        },
        listado : ()=>{
            return `
            <br>
            <div class="row">
                <div class="card col-12">
                    <div class="card-header">
                        <h1>Seleccione un vendedor</h1>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-responsive table-striped table-hover table-bordered">
                                <thead class=" bg-trans-gradient text-white">
                                    <tr>
                                        <td>Vendedor</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody id="tblVendedores"></tbody>
                            </table>
                        </div>

                        
                    </div>
                </div>
            </div>
            `
        },
        modalVendedor: ()=>{
            return `
            <div class="row bg-trans-gradient text-white">
                <div class="col-5">
                    <h5>Seleccione un Mes y un Reporte</h5>
                </div>
                <div class="col-5 text-left">
                    <label>Total : </label>
                    <h1 id="lbTotal" class="text-white">Q 0.00</h1>
                    
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <select class="form-control" id="cmbMes"></select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <select class="form-control" id="cmbAnio"></select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                    <div class="row">
                        <div class="col-4">                            
                            <button class="btn btn-success btn-round" id="btnCargarDinero">
                                <i class="fal fa-tag"></i>
                                Dinero
                            </button>
                        </div>
                        <div class="col-4">
                            <button class="btn btn-success btn-round" id="btnCargarProductos">
                                <i class="fal fa-cube"></i>
                                Productos
                            </button>
                        </div>
                        <div class="col-4">
                            <button class="btn btn-success btn-round" id="btnCargarMarcas">
                                <i class="fal fa-credit-card-front"></i>
                                Marcas
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="row card">
                <div class="table-responsive">
                    <table class="table table-responsive table-striped table-hover table-bordered" id="tblReport">
                        
                    </table>
                </div>
            </div>
            `
        }
    };

    root.innerHTML = view.encabezado() + view.listado()
    rootMenuLateral.innerHTML = view.modalVendedor();
    lbMenuTitulo.innerText = 'LOGRO DEL VENDEDOR'
};

function addListeners(){
    let cmbSucursal = document.getElementById('cmbSucursal');
    classTipoDocumentos.getSucursales('cmbSucursal')
    .then(()=>{
        api.tblVendedores(cmbSucursal.value,'tblVendedores');
    })

    cmbSucursal.addEventListener('change',()=>{
        api.tblVendedores(cmbSucursal.value,'tblVendedores');
    });

    // LISTENERS DE LA VENTANA MODAL DE LOGRO DE VENDEDOR
    let f = new Date();
    let cmbMes = document.getElementById('cmbMes');
    cmbMes.innerHTML = funciones.ComboMeses();
    let cmbAnio = document.getElementById('cmbAnio');
    cmbAnio.innerHTML = funciones.ComboAnio();

    cmbMes.value = f.getMonth()+1;
    cmbAnio.value = f.getFullYear();

    let btnCargarDinero = document.getElementById('btnCargarDinero');
    btnCargarDinero.addEventListener('click',()=>{
        getRptDinero(cmbMes.value, cmbAnio.value);
    });
    let btnCargarProductos = document.getElementById('btnCargarProductos');
    btnCargarProductos.addEventListener('click',()=>{
        getRptProductos(cmbMes.value, cmbAnio.value);
    });
    let btnCargarMarcas = document.getElementById('btnCargarMarcas');
    btnCargarMarcas.addEventListener('click',()=>{
        getRptMarcas(cmbMes.value, cmbAnio.value);
    });

};

function InicializarVistaGerenteVendedores(){
    
    getView();
    addListeners();

    
};

function getGerenciaVendedorLogro(codigo,nombre){
  lbMenuTitulo.innerText = `Logro del vendedor ${nombre}`;
  GlobalSelectedId = codigo;
    
    let f = new Date();
    let cmbMes = document.getElementById('cmbMes');
    cmbMes.innerHTML = funciones.ComboMeses();
    let cmbAnio = document.getElementById('cmbAnio');
    cmbAnio.innerHTML = funciones.ComboAnio();

    cmbMes.value = f.getMonth()+1;
    cmbAnio.value = f.getFullYear();

    api.reporteDinero(GlobalCodSucursal,GlobalSelectedId,cmbAnio.value,cmbMes.value,'tblReport','lbTotal');

    $("#modalMenu").modal('show');
    
};



// REPORTES DE LOGRO VENDEDOR
function getRptDinero(mes,anio){
    api.reporteDinero(GlobalCodSucursal,GlobalSelectedId,anio,mes,'tblReport','lbTotal');
};
function getRptProductos(mes,anio){
    api.reporteProductos(GlobalCodSucursal,GlobalSelectedId,anio,mes,'tblReport','lbTotal');
};
function getRptMarcas(mes,anio){
    api.reporteMarcas(GlobalCodSucursal,GlobalSelectedId,anio,mes,'tblReport','lbTotal');
};