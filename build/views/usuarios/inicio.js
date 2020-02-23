function getView(){
    let view = {
        listado: ()=>{
            return `
            
            <div class="row card col-12">
                <div class="card-header">
                    <h1>Gestión de usuarios de Ventas</h1>
                </div>

                <div class="table-responsive">
                    <table class="table table-responsive table-hover table-striped">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>Usuario</td>
                                <td>Clave</td>
                                <td>Documento</td>
                                <td>Teléfono</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody id="tblListado"></tbody>
                    </table>
                </div>
            </div>
            `
        },
        formUsuario: ()=>{
            return `
            <div class="card shadow">
                <div class="card-body col-sm-12 col-md-6 col-lg-6 col-xl6">
                    <div class="form-group">
                        <label>Código de Sistema:</label>
                        <input type="number" class="form-control col-6" id="txtUsuarioCodigo">
                    </div>
                    <div class="form-group">
                        <label>Usuario:</label>
                        <input type="text" class="form-control" id="txtUsuarioUsuario"  autocomplete="false">
                    </div>
                    <div class="form-group">
                        <label>Clave:</label>
                        <input type="password" class="form-control" id="txtUsuarioClave" autocomplete="false">
                    </div>
                    <div class="form-group">
                        <label>Documento:</label>
                        <input type="text" maxlength="5" class="form-control col-6" id="txtUsuarioCoddoc" autocomplete="false">
                    </div>
                    <div class="form-group">
                        <label>Teléfono:</label>
                        <input type="text" maxlength="8" class="form-control" id="txtUsuarioTelefono">
                    </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-6">
                            <button class="btn btn-warning btn-lg" id="btnUsuariosCancelar" data-dismiss="modal">
                                CANCELAR
                            </button>
                        </div>
                        <div class="col-6" id="btnAceptarContainer">
                            
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <button class="btn btn-danger btn-lg col-12" id="btnUsuariosEliminar">
                            ELIMINAR
                        </button>
                    </div>
                </div>
            </div>
            `;
        },
        btnNuevo: ()=>{
            return `
            <div class="shortcut-menu align-left">
                <button class="btn btn-danger btn-circle btn-xl" id="btnNuevoUsuario">
                    <i class="fal fa-plus"></i>
                </button>
            </div>
            `
        }
    };

    root.innerHTML = view.listado() +  view.btnNuevo();
    rootMenuLateral.innerHTML = view.formUsuario();

};

function addListeners(tipo){
    //carga la lista de usuarios
    api.usuariosGetListado(tipo,'tblListado');
   
    //elimina un usuario
    let btnUsuariosEliminar = document.getElementById('btnUsuariosEliminar');
    btnUsuariosEliminar.addEventListener('click',()=>{
        funciones.Confirmacion('¿Está seguro que Desea ELIMINAR este Usuario?')
        .then((value)=>{
            if(value==true){
                api.usuariosEliminar(GlobalSelectedId)
                .then(()=>{
                    funciones.Aviso('Usuario Eliminado Exitosamente!!');
                    api.usuariosGetListado(tipo,'tblListado');
                })
                .catch(()=>{
                    funciones.AvisoError('No se pudo Eliminar')
                })
            }
        });
    });
    
    // nuevo usuario
    let btnNuevoUsuario = document.getElementById('btnNuevoUsuario');
    btnNuevoUsuario.addEventListener('click',()=>{
        newUser();
    });



};
    
function inicializarVistaUsuarios(tipo){
    getView();
    addListeners(tipo);
    GlobalSelectedCodigo = tipo;
};


// NUEVO USUARIO
function newUser() {
        
    document.getElementById('btnUsuariosEliminar').style="visibility:hidden";

    lbMenuTitulo.innerText = 'Datos del Nuevo Usuario ';
    
    document.getElementById('txtUsuarioCodigo').value = '';
    document.getElementById('txtUsuarioUsuario').value = '';
    document.getElementById('txtUsuarioClave').value = '';
    document.getElementById('txtUsuarioCoddoc').value = '';
    document.getElementById('txtUsuarioTelefono').value = '';

    document.getElementById('btnAceptarContainer').innerHTML = `<button class="btn btn-info btn-lg" id="btnUsuariosGuardar">
                                                                    GUARDAR NUEVO
                                                                </button>`

    // actualiza los datos de un usuario
    let btnUsuariosGuardar = document.getElementById('btnUsuariosGuardar');
    btnUsuariosGuardar.addEventListener('click',()=>{
        insertUser();
    });

    $("#modalMenu").modal('show');

};

function insertUser(){
    funciones.Confirmacion('¿Está seguro que desea Actualizar estos Datos?')
    .then((value)=>{
        if(value==true){
            
            // obtiene los valores
            let codigo,usuario,clave,coddoc,telefono;
            codigo = document.getElementById('txtUsuarioCodigo').value;
            usuario = document.getElementById('txtUsuarioUsuario').value;
            clave = document.getElementById('txtUsuarioClave').value;
            coddoc = document.getElementById('txtUsuarioCoddoc').value;
            telefono = document.getElementById('txtUsuarioTelefono').value;

            // recarga la lista de usuarios
            api.usuariosNuevo(codigo,usuario,clave,coddoc,telefono,GlobalSelectedCodigo)
            .then(()=>{
                funciones.Aviso('Usuario Agregado exitosamente!!');
                api.usuariosGetListado(GlobalSelectedCodigo,'tblListado');
                $("#modalMenu").modal('hide');
            })
            .catch(()=>{
                funciones.AvisoError('No se pudo Guardar');
            })

            
        }
    })

    
};


// EDICION DE USUARIO
function editUser(ID,CODIGO,USUARIO,CLAVE,CODDOC,TELEFONO) {
    
    document.getElementById('btnUsuariosEliminar').style="visibility:visible";

    GlobalSelectedId = ID;
    lbMenuTitulo.innerText = 'Edición del Usuario ' + USUARIO;
    
    document.getElementById('txtUsuarioCodigo').value = CODIGO;
    document.getElementById('txtUsuarioUsuario').value = USUARIO;
    document.getElementById('txtUsuarioClave').value = CLAVE;
    document.getElementById('txtUsuarioCoddoc').value = CODDOC;
    document.getElementById('txtUsuarioTelefono').value = TELEFONO;

    document.getElementById('btnAceptarContainer').innerHTML = `<button class="btn btn-info btn-lg" id="btnUsuariosAceptar">
                                                                    GUARDAR
                                                                </button>`

    // actualiza los datos de un usuario
    let btnUsuariosAceptar = document.getElementById('btnUsuariosAceptar');
    btnUsuariosAceptar.addEventListener('click',()=>{
        updateUser();
    });

    $("#modalMenu").modal('show');

};

function updateUser(){
    funciones.Confirmacion('¿Está seguro que desea Actualizar estos Datos?')
    .then((value)=>{
        if(value==true){
            
            // obtiene los valores
            let codigo,usuario,clave,coddoc,telefono;
            codigo = document.getElementById('txtUsuarioCodigo').value;
            usuario = document.getElementById('txtUsuarioUsuario').value;
            clave = document.getElementById('txtUsuarioClave').value;
            coddoc = document.getElementById('txtUsuarioCoddoc').value;
            telefono = document.getElementById('txtUsuarioTelefono').value;

            // recarga la lista de usuarios
            api.usuariosEditar(codigo,usuario,clave,coddoc,telefono,GlobalSelectedCodigo)
            .then(()=>{
                funciones.Aviso('Usuario editado exitosamente!!');
                api.usuariosGetListado(GlobalSelectedCodigo,'tblListado');
                $("#modalMenu").modal('hide');
            })
            .catch(()=>{
                funciones.AvisoError('No se pudo Editar');
            })

            
        }
    })

    
};