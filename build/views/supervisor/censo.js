function getView(){
    let view = {
        encabezado : ()=>{
            return `
        <div class="card">
            <div class="card-header">
                <h5>Censo de Clientes</h5>
            </div>
        </div>
        <div class="row">    
            <div class="table-responsive" id="contenedorCenso">
                <table class="table table-hover table-striped">
                    <thead  class="bg-trans-gradient text-white"> 
                        <tr>
                            <td>Cliente</td>
                            <td>Telefono</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody id="tblCenso">
                    </tbody>
                </table>
            </div>
        </div>`
        },
        modalNuevo:()=>{
            return `
            <div class="modal fade" id="ModalNuevoCliente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title">Datos del Cliente</label>
                        </div>
                        <div class="modal-body">
                            <div class="form">
                                <div class="form-group">
                                    <label>NIT:</label>
                                    <input id="txtNit" class="form-control" type="text" placeholder="Escriba el NIT ...">
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
                                <div class="form-group">
                                    <label>Municipio:</label>
                                    <select id="cmbMunicipio" class="form-control">

                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Departamento:</label>
                                    <select id="cmbDepartamento" class="form-control">

                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Telefonos:</label>
                                    <input id="txtTelefono" class="form-control" type="number" placeholder="Telefono cliente">
                                </div>
                                <div class="form-group">
                                    <label>Tipo de pago:</label>
                                    <select id="cmbConcre" class="form-control">
                                        <option value="CON">CONTADO</option>
                                        <option value="CRE">CREDITO</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Observaciones:</label>
                                    <input id="txtObs" class="form-control" type="text" placeholder="">
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-round btn-icon btn-primary2" id="btnObtenerUbicacion">
                                        <i class="now-ui-icons location_pin"></i>
                                    </button>

                                    <label id="txtLatitud">0</label>
                                    <label id="txtLongitud">0</label>
                                    
                                </div>
                                <div class="form-group">
                                    <button id="btnCancelarCenso" class="btn btn-default btn-lg btn-round" data-dismiss="modal">
                                        <i class="now-ui-icons ui-1_simple-remove"></i>
                                        Cancelar
                                    </button>
                                    <button id="btnGuardarCenso" class="btn btn-primary btn-lg btn-round">
                                        <i class="now-ui-icons ui-1_check"></i> 
                                        Aceptar
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
                <button class="btn btn-success btn-circle btn-xl" id="btnNuevoCenso">+</button>
            </div>
            `
        }
    }

    root.innerHTML = view.encabezado() + view.modalNuevo() + view.btnNuevo();
    
};


    function addListeners(){
        let btnNuevoCenso = document.getElementById('btnNuevoCenso');
        let btnGuardarCenso = document.getElementById('btnGuardarCenso');
        let btnCancelarCenso= document.getElementById('btnCancelarCenso');
        let btnObtenerUbicacion = document.getElementById('btnObtenerUbicacion');
                
        btnObtenerUbicacion.addEventListener('click',()=>{
            let lat,long;
            lat = document.getElementById('txtLatitud');
            long = document.getElementById('txtLongitud');
            console.log('obteniendo gps');
            classCenso.ObtenerUbicacion(lat,long);
        });

        btnNuevoCenso.addEventListener('click', ()=>{
            btnNuevoCenso.style = "visibility:hidden";
            $("#ModalNuevoCliente").modal('show');
            btnObtenerUbicacion.click();

        });

        btnCancelarCenso.addEventListener('click', ()=>{
            btnNuevoCenso.style = "visibility:visible";
        });
        
        btnGuardarCenso.addEventListener('click',()=>{
            funciones.Confirmacion('¿Está seguro que desea registrar este cliente?')
            .then((value) => {
       
                if (value==true){
                    let nit, nombre, direccion, codmuni, telefono, lat, long, obs, negocio,concre;

                    nit = document.getElementById('txtNit').value;
                    nombre = document.getElementById('txtNomcliente').value;
                    direccion = document.getElementById('txtDircliente').value;
                    codmuni = document.getElementById('cmbMunicipio').value;
                    coddepto = document.getElementById('cmbDepartamento').value;
                    telefono = document.getElementById('txtTelefono').value;
                    lat = document.getElementById('txtLatitud').innerText;
                    long = document.getElementById('txtLongitud').innerText;
                    obs = document.getElementById('txtObs').value;
                    negocio = document.getElementById('txtNegocio').value;
                    concre = document.getElementById('cmbConcre').value;
        
                    classCenso.InsertCliente(GlobalEmpnit,GlobalCodven,nit,nombre,direccion,codmuni,coddepto,telefono,lat,long,obs,negocio,concre);
                    classCenso.SelectCensoAll(GlobalEmpnit,GlobalCodven,document.getElementById('tblCenso'));
                    btnCancelarCenso.click();
                }
            })

        })

        funciones.getComboMunicipios('cmbMunicipio');
        funciones.getComboDepartamentos('cmbDepartamento');
    };

    function SelectCensoAll(empnit,codven,contenedor){
        DbConnection.select({
            From: "censo"
        }, function (censo) {
    
            var HtmlString = "";
            censo.forEach(function (cliente) {
                if (cliente.empnit==empnit){
                    if (cliente.codven==codven){
                        
                        HtmlString += ` <tr Id=${cliente.Id}>
                                <td class=''>
                                    ${cliente.nomcliente}
                                    <br>
                                    <small>${cliente.dircliente}</small>
                                </td>
                                <td class=''>${cliente.telefono}</td> 
                                <td>
                                    <button class="btn btn-round btn-icon btn-success btn-sm" 
                                    onclick="classCenso.sendCliente(${cliente.Id},'${cliente.empnit}',${cliente.codven},
                                        '${cliente.nit}','${cliente.nomcliente}','${cliente.dircliente}',
                                        ${cliente.codmun},${cliente.coddep},'${cliente.telefono}',
                                        '${cliente.latitud}','${cliente.longitud}','${cliente.obs}','${cliente.negocio}','${cliente.concre}');">
                                        E
                                    </button>
                                </td>
                                <td class=''>
                                    <button class='btn btn-round btn-icon btn-danger btn-sm' onclick='classCenso.DeleteCliente("${cliente.Id}");'>x</button>
                                </td>
                            </tr>`;                        
                                
                    }
                }

            }, function (error) {
                console.log(error);
            })
            contenedor.innerHTML = HtmlString;
        });
    };

    function ObtenerUbicacion(lat,long){
        try {
            navigator.geolocation.getCurrentPosition(function (location) {
                lat.innerText = location.coords.latitude.toString();
                long.innerText = location.coords.longitude.toString();
            })
        } catch (error) {
            funciones.AvisoError(error.toString());
        }
    };

    function InsertCliente(empnit,codven,nit,nombre,direccion,codmunicipio,coddepartamento,telefono,latitud,longitud,obs,negocio,concre){  
        var data = {
            empnit:empnit,
            codven:codven,
            negocio:negocio,
            giro: 'GENERAL',
            nit:nit,
            nomcliente:nombre,
            dircliente:direccion,
            codmun:codmunicipio,
            coddep:coddepartamento,
            telefono:telefono,
            concre:concre,
            latitud:latitud,
            longitud:longitud,
            obs:obs,
            token:GlobalToken
        };
        DbConnection = new JsStore.Instance(DbName);
        await DbConnection.insert({Into: "censo",Values: [data]},
                function (rowsAdded) {
                    funciones.Aviso('Cliente registrado exitosamente');
                    classCenso.LimpiarCampos();
                }, 
                function (err) {
                    console.log(err);
                    funciones.AvisoError('No se puedo Guardar este Cliente, error de base de datos');
                })  
    };

    function DeleteCliente(id){
        funciones.Confirmacion('¿Está seguro que desea ELIMINAR este cliente?')
            .then((value)=>{
                if(value==true){
                    DbConnection.delete({
                        From: 'censo',
                        Where: {
                            Id: Number(id)
                        }
                    }, function (rowsDeleted) {
                        console.log(rowsDeleted + ' rows deleted');
                        if (rowsDeleted > 0) {
                            document.getElementById(id).remove();
                            classCenso.SelectCensoAll(GlobalEmpnit,GlobalCodven,document.getElementById('tblCenso'));
                            funciones.Aviso("Cliente eliminado con éxito");
                        }
                    }, function (error) {
                        alert(error.Message);
                    })
                }
            })
    };

    function DeleteClienteSilent(id){
        
                    DbConnection.delete({
                        From: 'censo',
                        Where: {
                            Id: Number(id)
                        }
                    }, function (rowsDeleted) {
                        console.log(rowsDeleted + ' rows deleted');
                        if (rowsDeleted > 0) {
                            document.getElementById(id).remove();
                            classCenso.SelectCensoAll(GlobalEmpnit,GlobalCodven,document.getElementById('tblCenso'));
                            funciones.Aviso("Cliente eliminado con éxito");
                        }
                    }, function (error) {
                        alert(error.Message);
                    })
                
    };

    function LimpiarCampos(){
        document.getElementById('txtNit').value = '';
        document.getElementById('txtNomcliente').value= '';
        document.getElementById('txtNegocio').value = '';
        document.getElementById('txtDircliente').value= '';
        document.getElementById('txtTelefono').value= '';
        document.getElementById('txtObs').value= '';
        document.getElementById('txtLatitud').innerText = '0';
        document.getElementById('txtLongitud').innerText= '0';
    };

    function sendCliente(id,empnit,codven,nit,nombre,direccion,codmunicipio,coddepartamento,telefono,latitud,longitud,obs,negocio,concre){
        funciones.Confirmacion('¿Está seguro que desea Enviar este Cliente?')
        .then((value)=>{
            if(value==true){
                let url ='/api/censo/insert';
        
                var data = {
                    empnit:empnit,
                    codven:codven,
                    negocio:negocio,
                    nit:nit,
                    nomcliente:nombre,
                    dircliente:direccion,
                    codmun:codmunicipio,
                    coddep:coddepartamento,
                    telefono:telefono,
                    concre:concre,
                    latitud:latitud,
                    longitud:longitud,
                    obs:obs,
                    fecha:funciones.getFecha(),
                    token:GlobalToken
                };
                
                axios.post(url,data)
                    .then((response) => {
                        console.log(response);
                        let data = response.data;
                        if(data.rowsAffected[0]==1){
                            funciones.Aviso('Cliente enviado exitosamente');
                            classCenso.DeleteClienteSilent(id);
                        }else{
                            funciones.AvisoError('Se envió más de una fila')
                        }
                        
                    }, (error) => {
                        console.log(error)
                        funciones.AvisoError('No se pudo enviar el cliente');
                    });
            }
        })       
    };