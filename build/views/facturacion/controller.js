
async function iniciarVistaVentas(nit,nombre,direccion){
     
    let txtFecha = document.getElementById('txtFecha');txtFecha.value = funciones.getFecha();
    let txtEntregaFecha = document.getElementById('txtEntregaFecha');txtEntregaFecha.value = funciones.getFecha();

    // listener para el nit
    let txtNit = document.getElementById('txtNit');
    txtNit.addEventListener('keydown',(e)=>{
        if(e.code=='Enter'){
            fcnBuscarCliente('txtNit','txtNombre','txtDireccion');    
        }
        if(e.code=='NumpadEnter'){
            fcnBuscarCliente('txtNit','txtNombre','txtDireccion');    
        }
    });

    document.getElementById('btnBuscarCliente').addEventListener('click',()=>{
        //fcnBuscarCliente('txtNit','txtNombre','txtDireccion');    
    });

    document.getElementById('txtBusqueda').addEventListener('keyup',(e)=>{
        if(e.code=='Enter'){
            fcnBusquedaProducto('txtBusqueda','tblResultadoBusqueda','cmbTipoPrecio');
            $('#ModalBusqueda').modal('show');
        }
        if(e.code=='NumpadEnter'){
            fcnBusquedaProducto('txtBusqueda','tblResultadoBusqueda','cmbTipoPrecio');
            $('#ModalBusqueda').modal('show');
        }
    });
    document.getElementById('btnBuscarProducto').addEventListener('click',()=>{
        fcnBusquedaProducto('txtBusqueda','tblResultadoBusqueda','cmbTipoPrecio');
        $('#ModalBusqueda').modal('show');
    });

    let btnCobrar = document.getElementById('btnCobrar');
    btnCobrar.addEventListener('click',()=>{
       
        
        if(btnCobrar.innerText=='Terminar'){
            funciones.AvisoError('No puede finalizar un pedido sin productos')
        }else{
           if(txtNit.value==''){
               funciones.AvisoError('Especifique el cliente a quien se carga la venta');
           }else{
               funciones.ObtenerUbicacion('lbDocLat','lbDocLong')
                switch (GlobalTipoCobro) {
                    case 'COBRO':
                        $('#ModalCobro').modal('show');
                        document.getElementById('txtPagadoEfectivo').value=GlobalTotalDocumento;
                        document.getElementById('txtTotalPagado').innerText=GlobalTotalDocumento;
                        document.getElementById('txtTotalAPagar').innerText=funciones.setMoneda(GlobalTotalDocumento,'Q ');

                        break;
                    case 'TERMINAR':
                        $('#ModalFinalizarPedido').modal('show');   
                        break;
            
                    default:
                        break;
                }                 
           }
       }
       
    });

    let cmbCoddoc = document.getElementById('cmbCoddoc');
    classTipoDocumentos.comboboxTipodoc('PED','cmbCoddoc');
    cmbCoddoc.addEventListener('change',async ()=>{
       await classTipoDocumentos.fcnCorrelativoDocumento('PED',cmbCoddoc.value,'txtCorrelativo');
    });

    let cmbVendedor = document.getElementById('cmbVendedor');

    let btnFinalizarPedido = document.getElementById('btnFinalizarPedido');
    btnFinalizarPedido.addEventListener('click',async ()=>{
        fcnFinalizarPedido();
    });

    //BUSQUEDA CLIENTES
    let frmNuevoCliente = document.getElementById('formNuevoCliente');
    frmNuevoCliente.addEventListener('submit',(e)=>{
        e.preventDefault();
        funciones.Confirmacion('¿Está seguro que desea guardar este cliente?')
        .then((value)=>{
            if(value==true){
                fcnGuardarNuevoCliente(frmNuevoCliente);
            }
        })

    });

    let btnBusquedaClientes = document.getElementById('btnBusquedaClientes');
    btnBusquedaClientes.addEventListener('click',()=>{
        $('#ModalBusquedaCliente').modal('show');
    });
    
    let txtBusquedaCliente = document.getElementById('txtBusquedaCliente');
    txtBusquedaCliente.addEventListener('keyup',(e)=>{
        if(e.code=='Enter'){
            fcnBusquedaCliente('txtBusquedaCliente','tblResultadoBusquedaCliente');
        }
        if(e.code=='NumpadEnter'){
            fcnBusquedaCliente('txtBusquedaCliente','tblResultadoBusquedaCliente');
        }
    });

    document.getElementById('btnBuscarCliente').addEventListener('click',()=>{
        fcnBusquedaCliente('txtBusquedaCliente','tblResultadoBusquedaCliente');
    });
    document.getElementById('btnNuevoCliente').addEventListener('click',()=>{
        //$('#ModalNuevoCliente').modal('show');
        if(txtNit.value!==''){
            fcnBuscarCliente('txtNit','txtNombre','txtDireccion');
        }else{
            funciones.AvisoError('Escriba el NIT o código de cliente para comprobar');
        };
        
    })

     
    // EVENTOS DE LOS BOTONES
    document.body.addEventListener('keyup',(e)=>{
        if(GlobalSelectedForm=='VENTAS'){
            switch (e.keyCode) {
                case 118: //f7
                    btnCobrar.click();
                    break;
                case 113: //f2
                    btnBusquedaClientes.click();
                    //createNotification('hola mundo');
                default:
                    break;
            }    
        }
    });

    // carga el grid
   
    
    classTipoDocumentos.comboboxTipodoc('PED','cmbCoddoc')
        .then(async()=>{
            cmbCoddoc.value = GlobalCoddoc;
            await classTipoDocumentos.fcnCorrelativoDocumento('PED',cmbCoddoc.value,'txtCorrelativo');
        })
        .then(async()=>{
            await fcnCargarGridTempVentas('tblGridTempVentas');
            await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');
        })
    
    await fcnGetMunicipios('cmbClienteMunicipio');
    await fcnGetDepartamentos('cmbClienteDepartamento');
    await classEmpleados.comboboxVendedores('cmbVendedor')
            .then(()=>{
                cmbVendedor.value = GlobalCodUsuario;
            })

    fcnCargarComboTipoPrecio();

    let txtPagadoEfectivo = document.getElementById('txtPagadoEfectivo');
    let txtVuelto = document.getElementById('txtVuelto');
    txtPagadoEfectivo.addEventListener('keyup',(e)=>{
        let txtTotalPagado = document.getElementById('txtTotalPagado');
        txtTotalPagado.innerText = funciones.setMoneda(txtPagadoEfectivo.value,'Q ');
        let vuelto = Number(txtPagadoEfectivo.value) - Number(GlobalTotalDocumento);
        txtVuelto.innerText = funciones.setMoneda(vuelto,'Q ');
    });

    
    let btnCobrarVenta = document.getElementById('btnCobrarVenta');
    btnCobrarVenta.addEventListener('click',async ()=>{
        
        fcnFinalizarPedido();
      
    });

    // inicializa la calculadora de cantidad
    iniciarModalCantidad();

    //carga los datos del cliente
    document.getElementById('txtNit').value = nit;
    document.getElementById('txtNombre').value = nombre;
    document.getElementById('txtDireccion').value = direccion;
    
   
}
function iniciarModalCantidad(){
    let total = document.getElementById('lbCalcTotal');
    total.innerText = "";
    let btnCalcAceptar = document.getElementById('btnCalcAceptar');
    let btnCalcLimpiar = document.getElementById('btnCalcLimpiar');
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
        fcnUpdateTempRow(GlobalSelectedId,n)
        .then(async()=>{
            //await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');      
            await fcnCargarGridTempVentas('tblGridTempVentas');
        })
        total.innerText = "";
    })

}
async function fcnBusquedaProducto(idFiltro,idTablaResultado,idTipoPrecio){
    
    let cmbTipoPrecio = document.getElementById(idTipoPrecio);

    let filtro = document.getElementById(idFiltro).value;
    let tabla = document.getElementById(idTablaResultado);
    tabla.innerHTML = GlobalLoader;


    let str = ""; 
    axios.get('/ventas/buscarproducto?empnit=' + GlobalEmpnit + '&filtro=' + filtro + '&app=' + GlobalSistema + '&tipoprecio=' + cmbTipoPrecio.value)
    //axios.get('/ventas/buscarproducto', {
      //  empnit:GlobalEmpnit,
      //  filtro:filtro,
      //  app:GlobalSistema,
      //  tipoprecio:cmbTipoPrecio.value
    //})
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            let totalexento = 0;
            if (rows.EXENTO==1){totalexento=Number(rows.PRECIO)}
            str += `<tr id="${rows.CODPROD}">
            <td>
                ${funciones.quitarCaracteres(rows.DESPROD,'"'," pulg",true)}
                <br>
                <small class="text-danger"><b>${rows.CODPROD}</b></small>
            </td>
            <td><b class"bg-danger text-white">${rows.CODMEDIDA}</b>
                <br>
                <small>${rows.EQUIVALE} item</small></td>
            <td>${funciones.setMoneda(rows.PRECIO || 0,'Q ')}</td>
            
            <td>
                <button class="btn btn-sm btn-success btn-circle text-white" 
                onclick="fcnAgregarProductoVenta('${rows.CODPROD}','${funciones.quitarCaracteres(rows.DESPROD,'"'," plg",true)}','${rows.CODMEDIDA}',1,${rows.EQUIVALE},${rows.EQUIVALE},${rows.COSTO},${rows.PRECIO},${totalexento});">
                    +
                </button>
            <td>
            <td>${rows.DESMARCA}</td>
        </tr>`
        })
        tabla.innerHTML= str;
        
    }, (error) => {
        console.log(error);
    });

}
async function fcnAgregarProductoVenta(codprod,desprod,codmedida,cantidad,equivale,totalunidades,costo,precio,exento){
    document.getElementById('tblResultadoBusqueda').innerHTML = '';
    let cmbTipoPrecio = document.getElementById('cmbTipoPrecio');
    
        let coddoc = document.getElementById('cmbCoddoc').value;
        try {        
            
                var data =JSON.stringify({
                    empnit:GlobalEmpnit,
                    token:GlobalToken,
                    coddoc:coddoc,
                    codprod:codprod,
                    desprod:desprod,
                    codmedida:codmedida,
                    cantidad:cantidad,
                    equivale:equivale,
                    totalunidades:totalunidades,
                    costo:costo,
                    precio:precio,
                    totalcosto:costo,
                    totalprecio:precio,
                    exento:exento,
                    usuario:GlobalUsuario,
                    app:GlobalSistema,
                    tipoprecio:cmbTipoPrecio.value
                });

                var peticion = new Request('/ventas/tempventas', {
                    method: 'POST',
                    headers: new Headers({
                       'Content-Type': 'application/json'
                    }),
                    body: data
                  });
            
                  await fetch(peticion)
                  
                  .then(async function(res) {
                    console.log('Estado: ', res.status);
                    if (res.status==200)
                    {
                        //socket.emit('productos nuevo', document.getElementById('desprod').value || 'sn');
                        $('#ModalBusqueda').modal('hide')
                        await fcnCargarGridTempVentas('tblGridTempVentas');
                        await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');

                        let txbusqueda = document.getElementById('txtBusqueda');
                        txbusqueda.value = '';
                        //txbusqueda.focus();
                    }
                  })
                  .catch(
                      ()=>{
                        funciones.AvisoError('No se pudo agregar este producto a la venta actual');
                      }
                  )
        
                } catch (error) {
          
                }
                

}
async function fcnBuscarCliente(idNit,idNombre,idDireccion){
    
    let nit = document.getElementById(idNit);
    let nombre = document.getElementById(idNombre);
    let direccion = document.getElementById(idDireccion);

    axios.get('/ventas/buscarcliente?empnit=' + GlobalEmpnit + '&nit=' + nit.value  + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;
        
        if (data.rowsAffected[0]==0){
            funciones.GetDataNit(idNit,txtClienteNombre,txtClienteDireccion)
            //funciones.GetDataNit(idNit,idNombre,idDireccion)
            .then((json)=>{
                console.log('resulta de json: ' + json);
                if(json.resultado==true){
                    document.getElementById('txtClienteNit').value = nit.value;
                    document.getElementById('txtClienteNombre').value = json.descripcion;
                    document.getElementById('txtClienteDireccion').value = json.direcciones.direccion;

                    document.getElementById('txtNombre').value = json.descripcion;
                    document.getElementById('txtDireccion').value = json.direcciones.direccion;

                    $('#ModalNuevoCliente').modal('show');
                }else{
                    document.getElementById('txtClienteNit').value = nit.value;
                    document.getElementById('txtNombre').value = '';
                    document.getElementById('txtDireccion').value = '';
                    $('#ModalNuevoCliente').modal('show');
                };

            })
            .catch(()=>{
                $('#ModalNuevoCliente').modal('show');
                document.getElementById('txtClienteNit').value = nit.value;
                document.getElementById('txtNombre').value = '';
                document.getElementById('txtDireccion').value = '';

                document.getElementById('txtClienteNombre').focus();
            })
        }else{
            data.recordset.map((rows)=>{
                nombre.value = rows.NOMCLIENTE;
                direccion.value = rows.DIRCLIENTE;
            })
        }
                
    }, (error) => {
        console.log(error);
    });
}
async function fcnBusquedaCliente(idFiltro,idTablaResultado){
    
    let filtro = document.getElementById(idFiltro).value;
    let tabla = document.getElementById(idTablaResultado);
    tabla.innerHTML = GlobalLoader;


    let str = ""; 
    axios.get('/clientes/buscarcliente?empnit=' + GlobalEmpnit + '&filtro=' + filtro + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr id="${rows.CODCLIE}">
                        <td>
                            ${rows.NOMCLIE}
                            <br>
                            <small>Código: ${rows.CODCLIE} / Nit: ${rows.NIT}</small>
                        </td>
                        <td>${rows.DIRCLIE}</td>
                        <td>
                            ${rows.DESMUNICIPIO}
                            <br>
                            <small>${rows.DESDEPTO}</small>
                        </td>
                        <td>${funciones.setMoneda(rows.SALDO,'Q')}</td>
                        <td>
                            <button class="btn btn-sm btn-success btn-circle text-white" 
                            onclick="fcnAgregarClienteVenta('${rows.CODCLIE}','${rows.NIT}','${rows.NOMCLIE}','${rows.DIRCLIE}')">
                                +
                            </button>
                        <td>
                    </tr>`
        })
        tabla.innerHTML= str;
        
    }, (error) => {
        console.log(error);
    });

}
async function fcnAgregarClienteVenta(codigo,nit,nombre,direccion){
    document.getElementById('tblResultadoBusquedaCliente').innerHTML = '';
    document.getElementById('txtNit').value = nit;
    document.getElementById('txtNombre').value = nombre;
    document.getElementById('txtDireccion').value = direccion;
    $('#ModalBusquedaCliente').modal('hide');  
}
async function fcnGuardarNuevoCliente(form){
    
    let nit = form[0].value;
    let nomclie = form[1].value;
    let nomfac = form[2].value;
    let dirclie = form[3].value;
    let codpais = form[4].value;
    let telclie = form[5].value;
    let emailclie = form[6].value;
    let codmunicipio = form[7].value;
    let coddepto = form[8].value;
    let tipoprecio = form[9].value;

    let codven = document.getElementById('cmbVendedor').value;

    // OBTIENE LA LATITUD Y LONGITUD DEL CLIENTE
    let lat = ''; let long = '';
    try {navigator.geolocation.getCurrentPosition(function (location) {lat = location.coords.latitude.toString();long = location.coords.longitude.toString(); })
    } catch (error) {lat = '0'; long = '0'; };
    
    // FECHA DE CREACION DEL CLIENTE
    let f = funciones.getFecha();

    axios.post('/clientes/clientenuevo', {
        app:GlobalSistema,
        empnit: GlobalEmpnit,
        codclie:nit,
        nitclie:nit,
        nomclie:nomclie,
        nomfac:nomfac,
        dirclie:dirclie,
        coddepto:coddepto,
        codmunicipio:codmunicipio,
        codpais:codpais,
        telclie:telclie,
        emailclie:emailclie,
        codbodega:GlobalCodBodega,
        tipoprecio:tipoprecio,
        lat:lat,
        long:long,
        codven:codven,
        fecha:f        
    })
    .then((response) => {
        const data = response.data;
        if (data.rowsAffected[0]==0){
            funciones.AvisoError('No se logró Guardar el nuevo cliente');
        }else{
            funciones.Aviso('Nuevo Cliente Agregado Exitosamente !!')
            document.getElementById('txtNit').value = nit;
            document.getElementById('txtNombre').value = nomclie;
            document.getElementById('txtDireccion').value = dirclie;
            document.getElementById('btnCancelarCliente').click();
        }
    }, (error) => {
        funciones.AvisoError('No se logró Guardar el nuevo cliente');
        console.log(error);
    });


}
async function fcnEliminarItem(id){
    
    try {        
            var data =JSON.stringify({
                id:id
            });

            var peticion = new Request('/ventas/tempventas', {
                method: 'DELETE',
                headers: new Headers({
                   'Content-Type': 'application/json'
                }),
                body: data
              });
        
              await fetch(peticion)
              
              .then(async function(res) {
                console.log('Estado: ', res.status);
                if (res.status==200)
                {
                    console.log(id.toString());
                    document.getElementById(id.toString()).remove();
                    //await fcnCargarGridTempVentas('tblGridTempVentas');
                    await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');
                }
              })
              .catch(
                  ()=>{
                    funciones.AvisoError('No se pudo remover este producto a la venta actual');
                  }
              )
    
        } catch (error) {

        }
}
async function fcnCargarGridTempVentas(idContenedor){
    let tabla = document.getElementById(idContenedor);

    tabla.innerHTML = GlobalLoader;
    let coddoc = document.getElementById('cmbCoddoc').value;
    
    try {
        
        const response = await fetch('/ventas/tempventas?empnit=' + GlobalEmpnit + '&coddoc=' + coddoc + '&usuario=' + GlobalUsuario +  '&app=' + GlobalSistema)
        const json = await response.json();
        let idcant = 0;
        let data = json.recordset.map((rows)=>{
            idcant = idcant + 1;
            return `<tr id="${rows.ID.toString()}">
                        <td class="text-left">
                            ${rows.DESPROD}
                            <br>
                            <small class="text-danger"><b>${rows.CODPROD}</b></small>
                        </td>
                        <td class="text-right">${rows.CODMEDIDA}<br>
                            <small>${rows.EQUIVALE} item</small></td>
                        <td class="text-center">
                            <button class="btn btn-outline-secondary btn-xs btn-icon rounded-circle" onClick="fcnCambiarCantidad(${rows.ID});">+</button>
                            <b class="text-danger h4" id=${idcant}>${rows.CANTIDAD}</b>
                            
                        </td>
                        <td class="text-right">${funciones.setMoneda(rows.PRECIO,'Q')}</td>
                        <td class="text-right" id=${'S'+idcant}>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</td>
                        <td>
                            <button class="btn btn-sm btn-danger btn-circle text-white" onclick="fcnEliminarItem(${rows.ID});">
                                x
                            </button>
                        <td>
                    </tr>`
       }).join('\n');
       
       tabla.innerHTML = data;
      
    } catch (error) {
        console.log('NO SE LOGRO CARGAR LA LISTA ' + error);
        tabla.innerHTML = 'No se logró cargar la lista...';
    }
}
async function fcnCambiarCantidad(id){
    
    GlobalSelectedId = id;
    $('#ModalCantidad').modal('show');
    
}
async function fcnCargarTotal(idContenedor,idContenedor2){
    let container = document.getElementById(idContenedor);
    let container2 = document.getElementById(idContenedor2);
    
    let btnCobrarTotal = document.getElementById('btnCobrar')
    //btnCobrarTotal.innerText =  'Cobrar : Q 0.00'
    btnCobrarTotal.innerText =  'Terminar'

    container.innerHTML = '0'
    container2.innerHTML = '0'

    try {
        
        const response = await fetch('/ventas/tempventastotal?empnit=' + GlobalEmpnit + '&usuario=' + GlobalUsuario  + '&app=' + GlobalSistema)
        const json = await response.json();
       
        let data = json.recordset.map((rows)=>{
            GlobalTotalDocumento = Number(rows.TOTALPRECIO);
            GlobalTotalCostoDocumento = Number(rows.TOTALCOSTO);
            return `${funciones.setMoneda(rows.TOTALPRECIO,'Q ')}`
       }).join('\n');
       
       container.innerText = data;
       container2.innerText = data;
       btnCobrarTotal.innerHTML = '<h1>Terminar : ' + data + '</h1>';
       //btnCobrarTotal.innerHTML = '<h1>Cobrar : ' + data + '</h1>';
    } catch (error) {
        //console.log('NO SE LOGRO CARGAR LA LISTA ' + error);

    }

    if(container.innerHTML=='0'){
    }else{
        socket.emit('ordenes escribiendo', 'Se está generando una nueva orden',GlobalSelectedForm)
    }
}
async function fcnFinalizarPedido(){
    
    let codcliente = GlobalSelectedCodCliente;
    let ClienteNombre = document.getElementById('txtNombre').value;
    let dirclie = document.getElementById('txtDireccion').value; // CAMPO DIR_ENTREGA
    let obs = document.getElementById('txtEntregaObs').value; 
    let direntrega = document.getElementById('txtEntregaDireccion').value; //CAMPO MATSOLI
    let codbodega = GlobalCodBodega;
    let cmbTipoEntrega = document.getElementById('cmbEntregaTipo').value; //campo TRANSPORTE



    let txtFecha = new Date(document.getElementById('txtFecha').value);
    let anio = txtFecha.getFullYear();
    let mes = txtFecha.getUTCMonth()+1;
    let d = txtFecha.getUTCDate() 
    let fecha = anio + '-' + mes + '-' + d; // CAMPO DOC_FECHA
    let dia = d;

    let fe = new Date(document.getElementById('txtEntregaFecha').value);
    let ae = fe.getFullYear();
    let me = fe.getUTCMonth()+1;
    let de = fe.getUTCDate() 
    let fechaentrega = ae + '-' + me + '-' + de;  // CAMPO DOC_FECHAENT

    let coddoc = document.getElementById('cmbCoddoc').value;//GlobalCoddoc;
    let correlativo = document.getElementById('txtCorrelativo').value;

    let cmbVendedor = document.getElementById('cmbVendedor');

    let nit = document.getElementById('txtNit').value;

    let latdoc = document.getElementById('lbDocLat').innerText;
    let longdoc = document.getElementById('lbDocLong').innerText;

    funciones.Confirmacion('¿Está seguro que desea Finalizar este Pedido')
    .then((value)=>{
        if(value==true){

            //,,obs,usuario,codven
            axios.post('/ventas/documentos', {
                app: GlobalSistema,
                empnit: GlobalEmpnit,
                coddoc:coddoc,
                correlativo: correlativo,
                anio:anio,
                mes:mes,
                dia:dia,
                fecha:fecha,
                fechaentrega:fechaentrega,
                formaentrega:cmbTipoEntrega,
                codbodega:codbodega,
                codcliente: codcliente,
                nomclie:ClienteNombre,
                totalcosto:GlobalTotalCostoDocumento,
                totalprecio:GlobalTotalDocumento,
                nitclie:nit,
                dirclie:dirclie,
                obs:obs,
                direntrega:direntrega,
                usuario:GlobalUsuario,
                codven:cmbVendedor.value,
                lat:latdoc,
                long:longdoc
            })
            .then(async(response) => {
                const data = response.data;
                if (data.rowsAffected[0]==0){
                    funciones.AvisoError('No se logró Guardar este pedido');
                }else{

                    funciones.Aviso('Pedido Generado Exitosamente !!!')
                    document.getElementById('btnEntregaCancelar').click();
                    $('#ModalCobro').modal('hide');
        
                    socket.emit('ordenes nueva',`Nueva Orden a nombre de ${ClienteNombre} por valor de ${GlobalTotalDocumento} quetzales`, GlobalSelectedForm);
                    fcnEliminarTempVentas(GlobalUsuario);
                    fcnNuevoPedido();
                }
            }, (error) => {
                console.log(error);
            });           
            
        }
    })
}
async function fcnEliminarTempVentas(usuario){
    let coddoc = document.getElementById('cmbCoddoc').value;
    axios.post('/ventas/tempVentastodos', {
        empnit: GlobalEmpnit,
        usuario:usuario,
        coddoc:coddoc,
        app:GlobalSistema
    })
    .then((response) => {
        const data = response.data;
        if (data.rowsAffected[0]==0){
            funciones.AvisoError('No se logró Eliminar la lista de productos agregados');
        }else{
            
        }
    }, (error) => {
        console.log(error);
    });
}
async function fcnNuevoPedido(){
    
    classNavegar.inicio(GlobalTipoUsuario);
    
}
async function fcnUpdateTempRow(id,cantidad){
    
    let costo = 0; let precio = 0; let equivale = 0; let exento = 0;
    
    return new Promise((resolve, reject) => {
    //inicia la promesa    
            axios.post('/ventas/tempVentasRow', {
                id:id,
                app: GlobalSistema
            })
            .then((response) => {
                const data = response.data;
                
                data.recordset.map((rows)=>{
                    costo = rows.COSTO;
                    precio = rows.PRECIO;
                    equivale = rows.EQUIVALE;
                    exento = rows.EXENTO;
                })
                let totalcosto = Number(costo) * Number(cantidad);
                let totalprecio = Number(precio) * Number(cantidad);
                let totalexento = Number(exento) * Number(cantidad);
                let totalunidades = Number(equivale) * Number(cantidad);
                    axios.put('/ventas/tempVentasRow', {
                        app: GlobalSistema,
                        id:id,
                        totalcosto:totalcosto,
                        totalprecio:totalprecio,
                        cantidad:cantidad,
                        totalunidades: totalunidades,
                        exento:totalexento
                    })
                    .then(async(re) => {
                        const data2 = re.data;
                        if (data2.rowsAffected[0]==0){
                            funciones.AvisoError('No se logró Eliminar la lista de productos agregados');
                            reject();
                        }else{
                            await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');
                            resolve();
                        }
                    }, (error) => {
                        console.log(error);
                    });  
            }, (error) => {
                console.log(error);
                reject();
            });  
    
    //finaliza la promesa
            
        }, (error) => {
            console.log(error);
            reject();
        });
    
}
async function fcnGetMunicipios(idContainer){
    let container = document.getElementById(idContainer);
    container.innerHTML = GlobalLoader;

    let str = ""; 
    axios.get('/clientes/municipios?empnit=' + GlobalEmpnit + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<option value='${rows.CODMUNICIPIO}'>${rows.DESMUNICIPIO}</option>`
        })
        container.innerHTML= str;
        
    }, (error) => {
        console.log(error);
        container.innerHTML = '';
    });
}
async function fcnGetDepartamentos(idContainer){
    let container = document.getElementById(idContainer);
    container.innerHTML = GlobalLoader;

    let str = ""; 
    axios.get('/clientes/departamentos?empnit=' + GlobalEmpnit + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<option value='${rows.CODDEPTO}'>${rows.DESDEPTO}</option>`
        })
        container.innerHTML= str;
        
    }, (error) => {
        console.log(error);
        container.innerHTML = '';
    });
}
async function fcnCargarComboTipoPrecio(){
   let cmbp = document.getElementById('cmbClienteTipoPrecio');
   if(GlobalSistema=='ISC'){
    cmbp.innerHTML =`<option value="P">PÚBLICO</option>
                     <option value="M">MAYORISTA</option>`;
   }else{
    cmbp.innerHTML =`<option value="P">PÚBLICO</option>
                     <option value="C">MAYORISTA C</option>
                     <option value="B">MAYORISTA B</option>
                     <option value="A">MAYORISTA A</option>`;
   }
   
}