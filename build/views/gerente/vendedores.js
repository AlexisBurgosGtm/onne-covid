function getView(){
    let view ={
        encabezado : ()=>{
            return `
                <div class="card col-12">                  
                    <div class="row">
                        <div class="col-sm-12 col-lg-4 col-md-4 col-xl-4">
                            <label>Seleccione una Sucursal</label>
                            <select id="cmbSucursal" class="form-control"></select>
                        </div>
                        <div class="col-sm-12 col-lg-6 col-md-6 col-xl-6">
                        </div>
                    </div>
                    <div class="divider"></div>
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
                    <div class="row" id="tblVendedores">
                        
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
                        <div class="col-3">                            
                            <button class="btn btn-success btn-sm" id="btnCargarDinero">
                                <i class="fal fa-tag"></i>
                                Dinero
                            </button>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-success btn-sm" id="btnCargarProductos">
                                <i class="fal fa-cube"></i>
                                Productos
                            </button>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-success btn-sm" id="btnCargarMarcas">
                                <i class="fal fa-credit-card-front"></i>
                                Marcas
                            </button>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-success btn-sm" id="btnCargarLocaciones">
                                <i class="fal fa-globe"></i>
                                Recorrido
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
    let btnCargarLocaciones = document.getElementById('btnCargarLocaciones');
    btnCargarLocaciones.addEventListener('click',()=>{
        getRptLocaciones(cmbMes.value, cmbAnio.value);
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
    let cmbSucursal = document.getElementById('cmbSucursal');
    api.reporteDinero(cmbSucursal.value,GlobalSelectedId,anio,mes,'tblReport','lbTotal');
};
function getRptProductos(mes,anio){
    let cmbSucursal = document.getElementById('cmbSucursal');
    api.reporteProductos(cmbSucursal.value,GlobalSelectedId,anio,mes,'tblReport','lbTotal');
};
function getRptMarcas(mes,anio){
    let cmbSucursal = document.getElementById('cmbSucursal');
    api.reporteMarcas(cmbSucursal.value,GlobalSelectedId,anio,mes,'tblReport','lbTotal');
};
function getRptLocaciones(mes,anio){
    let cmbSucursal = document.getElementById('cmbSucursal');
    api.reporteLocaciones(cmbSucursal.value,GlobalSelectedId,anio,mes,'tblReport','lbTotal');
}


function Lmap(lat,long,nombre,importe){
        //INICIALIZACION DEL MAPA            
          var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          osm = L.tileLayer(osmUrl, {center: [lat, long],maxZoom: 20, attribution: osmAttrib});    
          map = L.map('mapcontainer').setView([lat, long], 18).addLayer(osm);

          L.marker([lat, long])
            .addTo(map)
            .bindPopup(nombre + ' - ' + importe)

          return map;
};


