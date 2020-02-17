function getView(){

    let view = {
        encabezado : ()=>{
            let st = `
                <div class="row">
                    <div class="card col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="card-header">
                            <div class="form-group">
                                <label>Seleccione un Embarque</label>
                                <select class="form-control col-sm-12 col-md-6 col-lg-6 col-xl-6" id="cmbEmbarque"></select>
                            </div>
                            <div class="form-group">
                                <label>Total Picking: </label>
                                <b><label class="text-danger" id="lbTotalPicking"></label></b>
                            </div>
                        </div>
                        <div class="card-body">
                            <button class="btn btn-success" id="btnPickingDocumentos">
                                Documentos
                            </button>
                            <button class="btn btn-info" id="btnPickingProductos">
                                Productos
                            </button>
                        </div>
                    </div>
                    
                </div>
            `

            return st;
        },
        listado : ()=>{
            let st = `
                <div class="row">
                    <div class="card col-12">
                        <div class="table-responsive">
                            <table class="table table-responsive table-hover table-striped table-bordered" id="tblPicking">
                                
                            
                                
                            </table>
                        </div>
                    </div>
                </div>
            `

            return st;
        }
    };

    root.innerHTML = view.encabezado() + view.listado();

};

function addListeners(){
    let cmbEmbarque = document.getElementById('cmbEmbarque');
    cmbEmbarque.addEventListener('change',()=>{
        api.digitadorPicking(cmbEmbarque.value,'tblPicking','lbTotalPicking')

    });

    //carga el combobox de embarques
    api.digitadorComboEmbarques('cmbEmbarque');

    // listeners de los botones
    let btnPickingDocumentos = document.getElementById('btnPickingDocumentos');
    btnPickingDocumentos.addEventListener('click',()=>{
        api.digitadorPicking(cmbEmbarque.value,'tblPicking','lbTotalPicking')
    });


    let btnPickingProductos = document.getElementById('btnPickingProductos');
    btnPickingProductos.addEventListener('click',()=>{
        api.digitadorPickingProductos(cmbEmbarque.value,'tblPicking','lbTotalPicking')
    });

};

function iniciarVistaEmbarques(){
    getView();
    addListeners();
};