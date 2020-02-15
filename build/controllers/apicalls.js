let api = {
    empleadosLogin : (sucursal,user,pass)=>{

        axios.post('/empleados/login', {
            app:GlobalSistema,
            codsucursal: sucursal,
            user:user,
            pass:pass       
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                if(rows.USUARIO==user){
                    GlobalCodUsuario = rows.CODIGO;
                    GlobalUsuario = rows.USUARIO;
                    GlobalTipoUsuario = rows.TIPO;
                    GlobalCoddoc= rows.CODDOC;
                    GlobalCodSucursal = sucursal;
                    GlobalSistema = sucursal;
                    
                    classNavegar.inicio(GlobalTipoUsuario);
                    
                }else{
                    GlobalCodUsuario = 9999
                    GlobalUsuario = '';
                    GlobalTipoUsuario = '';
                    GlobalCoddoc= '';
                    funciones.AvisoError('Usuario o Contraseña incorrectos')
                }        
            })
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
        });

    },
    clientesVendedor: async(sucursal,codven,dia,idContenedor)=>{
    
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let strdata = '';

        axios.post('/clientes/listavendedor', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            dia:dia   
        })
        .then((response) => {
            const data = response.data.recordset;
            
            data.map((rows)=>{
                
                    strdata = strdata + `<tr>
                                <td>${rows.NOMCLIE}
                                    <br>
                                    <small>Cod: ${rows.CODIGO}</small>
                                </td>
                                <td>${rows.DIRCLIE}
                                    <br>
                                    <small>${rows.DESMUNI}</small>
                                </td>
                                <td>
                                    <button class="btn btn-info btn-sm btn-circle" onclick="getMenuCliente('${rows.CODIGO}','${rows.NOMCLIE}','${rows.DIRCLIE}','${rows.TELEFONO}','${rows.LAT}','${rows.LONG}','${rows.NIT}');">
                                        +
                                    </button>
                                </td>
                            </tr>`
            })
            container.innerHTML = strdata;
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
        });
        
        
    },
    pedidosVendedor: async(sucursal,codven,fecha,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let tableheader = `<table class="table table-responsive table-hover table-striped table-bordered">
                            <thead class="bg-trans-gradient text-white">
                                <tr>
                                    <td>Documento</td>
                                    <td>Cliente</td>
                                    <td>Importe</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblListaPedidos">`;
        let tablefoooter ='</tbody></table>';

        let strdata = '';
        let totalpedidos = 0;
        axios.post('/ventas/listapedidos', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            fecha:fecha   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.IMPORTE);
                    totalpedidos = totalpedidos + 1;
                    strdata = strdata + `<tr>
                                <td>
                                    ${rows.CODDOC + '-' + rows.CORRELATIVO}
                                </td>
                                <td>${rows.NOMCLIE}
                                    <br>
                                    <small>${rows.DIRCLIE + ', ' + rows.DESMUNI}</small>
                                </td>
                                <td>
                                    ${funciones.setMoneda(rows.IMPORTE,'Q')}
                                </td>
                                <td>
                                    <button class="btn btn-info btn-sm btn-circle">
                                        +
                                    </button>
                                </td>
                            </tr>`
            })
            container.innerHTML = tableheader + strdata + tablefoooter;
            lbTotal.innerText = `${funciones.setMoneda(total,'Q ')} - Pedidos: ${totalpedidos} - Promedio:${funciones.setMoneda((Number(total)/Number(totalpedidos)),'Q')}`;
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    reporteDiaMarcas: async(sucursal,codven,fecha,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table table-responsive table-hover table-striped table-bordered">
                    <thead class="bg-trans-gradient text-white"><tr>
                        <td>Marca</td>
                        <td>Importe</td></tr>
                    <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reportemarcasdia', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            fecha:fecha
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.DESMARCA}
                                            </td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    reporteDiaProductos: async(sucursal,codven,fecha,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table table-responsive table-hover table-striped table-bordered">
                    <thead class="bg-trans-gradient text-white"><tr>
                        <td>Producto</td>
                        <td>Unidades</td>
                        <td>Importe</td>
                        </tr>
                    <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reporteproductosdia', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            fecha:fecha   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.DESPROD}
                                                <br>
                                                <small class="text-danger">${rows.CODPROD}</small>
                                            </td>
                                            <td>${rows.TOTALUNIDADES}</td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    reporteDinero: async(sucursal,codven,anio,mes,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table-responsive table-hover table-striped">
                    <thead class="bg-trans-gradient text-white"><tr>
                        <td>Fecha</td>
                        <td>Pedidos</td>
                        <td>Importe</td></tr>
                    <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reportedinero', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            anio:anio,
            mes:mes   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0; let pedidos = 0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALVENTA);
                    pedidos = pedidos + Number(rows.PEDIDOS);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.FECHA.toString().replace('T00:00:00.000Z','')}
                                            </td>
                                            <td>${rows.PEDIDOS}</td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALVENTA,'Q')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ') + ' Pedidos: ' + pedidos.toString();
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    reporteProductos: async(sucursal,codven,anio,mes,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table-responsive table-hover table-striped">
                    <thead class="bg-trans-gradient text-white"><tr>
                        <td>Producto</td>
                        <td>Unidades</td>
                        <td>Importe</td>
                        </tr>
                    <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reporteproductos', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            anio:anio,
            mes:mes   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.DESPROD}
                                                <br>
                                                <small class="text-danger">${rows.CODPROD}</small>
                                            </td>
                                            <td>${rows.TOTALUNIDADES}</td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    reporteMarcas: async(sucursal,codven,anio,mes,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table-responsive table-hover table-striped">
                    <thead class="bg-trans-gradient text-white"><tr>
                        <td>Marca</td>
                        <td>Importe</td></tr>
                    <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reportemarcas', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            anio:anio,
            mes:mes   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.DESMARCA}
                                            </td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    noticiaslistado : (sucursal,user,idContenedor)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;

        let str = '';

        axios.get('/noticias/listado', {
            sucursal: sucursal,
            user:user
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                let classprioridad ='';
                switch (rows.PRIORIDAD) {
                    case 'ALTA':
                        classprioridad = 'bg-danger';
                        break;
                    case 'MEDIA':
                        classprioridad = 'bg-warning';
                        break;
                    case 'BAJA':
                        classprioridad = 'bg-info';
                         break;               
                    default:
                        break;
                }
                str = str + `
                        <div class="card">
                            <div class="card-header ${classprioridad}">
                                <label class="text-white">${rows.FECHA.toString().replace('T00:00:00.000Z','')}</label>
                            </div>
                            <div class="card-body">
                                <label>${rows.NOTICIA}</label>
                            </div>
                            <div class="card-footer text-right">
                                <label><i>${rows.USUARIO}</i></label>
                            </div>
                        </div>`        
            })
            container.innerHTML = str;

        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = 'No se pudo cargar la lista';
        });

    },
    tblVendedores : (sucursal,idContainer)=>{
        let container = document.getElementById(idContainer);
        container.innerHTML = GlobalLoader;

        let str = '';

        axios.post('/empleados/vendedores', {
            sucursal: sucursal,
            user:GlobalUsuario
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                str = str + `<tr>
                                <td>
                                    ${rows.NOMBRE}<br>
                                    <small>
                                        Tel:<b class="text-danger">${rows.TELEFONO}</b> - 
                                        Cod:${rows.CODIGO} - 
                                        
                                    </small>
                                </td>
                                <td>
                                    <button class="btn btn-info btn-circle btn-sm" onclick="">
                                        +
                                    </button>
                                </td>
                            </tr>`        
            })
            container.innerHTML = str;

        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = 'No se pudo cargar la lista';
        });

    },
    comboVendedores : (sucursal,idContainer)=>{
        let container = document.getElementById(idContainer);
        let str = '';

        return new Promise((resolve,reject)=>{
            axios.post('/empleados/vendedores', {
                sucursal: sucursal,
                user:GlobalUsuario
            })
            .then((response) => {
                const data = response.data.recordset;
                data.map((rows)=>{
                    str = str + `<option value='${rows.CODIGO}'>
                                    ${rows.NOMBRE}
                                   Tel:<b class="text-danger">${rows.TELEFONO}</b>
                                 </option>
                                `        
                })
                container.innerHTML = str;
                resolve();
            }, (error) => {
                funciones.AvisoError('Error en la solicitud');
                container.innerHTML = '';
                reject();
            });
        })
    },
    gerenciaResumenSucursal: (mes,anio,idContenedor,idLbTotal)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
        
        let strdata = '';

        axios.post('/ventas/rptsucursalesventas', {
            mes:mes,
            anio: anio
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.IMPORTE);
                    strdata = strdata + `
                    <div class="col-sm-6 col-xl-3">
                        <div class="p-3 bg-${rows.COLOR}-300 rounded overflow-hidden position-relative text-white mb-g">
                            <div class="">
                                <h3 class="display-4 d-block l-h-n m-0 fw-500">
                                            ${funciones.setMoneda(rows.IMPORTE,'Q')}
                                    <small class="m-0 l-h-n">${rows.SUCURSAL}</small>
                                </h3>
                            </div>
                                <i class="fal fa-lightbulb position-absolute pos-right pos-bottom opacity-15 mb-n5 mr-n6" style="font-size:6rem"></i>
                            </div>
                        </div>
                    </div>
                    `
            })
            container.innerHTML = strdata;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
    },
    gerenciaRankingVendedores: (mes,anio,idContenedor)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
            
        let strdata = '';
        let tblHead = `<table class="table table-responsive table-striped table-hover table-bordered">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>Vendedor</td>
                                <td>Venta</td>
                                <td>Sucursal</td>
                            </tr>
                        </thead>
                        <tbody>`;
        let tblFoot = `</tbody></table>`;

        axios.post('/ventas/rptrankingvendedores', {
            mes:mes,
            anio: anio
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <tr>
                        <td>${rows.NOMVEN}</td>
                        <td>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</td>
                        <td>${rows.SUCURSAL}</td>
                    </tr>
                    `
            })
            container.innerHTML = tblHead + strdata + tblFoot;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    gerenciaMarcas: (idContenedor, idContenedorProductos)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
            
        let strdata = '';
        
        axios.post('/productos/marcas')
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <div class="card">
                        <div class="row">
                            <div class="col-10">
                                <h3 class="text-info">${rows.DESMARCA}</h3>    
                            </div>
                            <div class="col-1 text-right">
                                <button class="btn btn-info btn-circle btn-md" onclick="getProductosMarca('${rows.CODMARCA}','${idContenedorProductos}');">
                                    +
                                </button>    
                            </div>
                        </div>
                    </div>
                    `
            })
            container.innerHTML = strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    gerenciaProductos: (filtro, idContenedor)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
            
        let strdata = '';
        
        axios.post('/productos/listado',{filtro:filtro})
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                let classHabilitado = '';
                if(rows.NOHABILITADO==0){classHabilitado=''}else{classHabilitado='bg-warning'}
                    strdata = strdata + `
                    <tr class='${classHabilitado}'>
                        <td>${rows.DESPROD}
                            <br>
                            <small>Cod:<b>${rows.CODPROD}</b> - uxc:${rows.EQUIVALEINV}</small>
                            <br>
                            <small>Costo:<b>${funciones.setMoneda(rows.COSTO,'Q')}</b> - UF:<b>${rows.LASTUPDATE.replace('T00:00:00.000Z','')}</b></small>
                        </td>
                        <td>
                            <button class="btn btn-info btn-sm btn-circle" onclick="getOpcionesProducto('${rows.CODPROD}','${rows.DESPROD}',${rows.NOHABILITADO});">
                                +
                            </button>
                        </td>
                    </tr>
                    `
            })
            container.innerHTML = strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    productosSetStatus: (codprod,st)=>{
        return new Promise((resolve,reject)=>{
            axios.put('/productos/status',{codprod:codprod,status:st})
            .then((response) => {
                console.log(response);
               resolve();             
            }, (error) => {
                reject();
            });


        })
        
    },
    productosEditDetalle : (data)=>{
        return new Promise((resolve,reject)=>{
            axios.put('/productos/detalles',data)
            .then((response) => {
                console.log(response);
               resolve();             
            }, (error) => {
                reject();
            });


        })
    },
    productosGetDetalle: (codprod,idDesprod,idUxc,idMarca,idClaseUno,idClaseDos,idClaseTres)=>{
        axios.post('/productos/detalles',{codprod:codprod})
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                document.getElementById(idDesprod).value = rows.DESPROD;
                document.getElementById(idUxc).value = rows.EQUIVALEINV;
                document.getElementById(idMarca).value = rows.CODMARCA;
                document.getElementById(idClaseUno).value = rows.CODCLAUNO;
                document.getElementById(idClaseDos).value = rows.CODCLADOS;
                document.getElementById(idClaseTres).value = rows.CODCLATRES;
            })
                        
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
        });
    },
    productosComboMarcas: (idContainer)=>{
        let container = document.getElementById(idContainer);
        let strdata = '';
        axios.post('/productos/marcas')
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <option value="${rows.CODMARCA}">${rows.DESMARCA}</option>
                    `
            })
            container.innerHTML = strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    productosComboClaseUno: (idContainer)=>{
        let container = document.getElementById(idContainer);
        let strdata = '';
        axios.post('/productos/claseuno')
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <option value="${rows.COD}">${rows.DES}</option>
                    `
            })
            container.innerHTML =  strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    productosComboClaseDos: (idContainer)=>{
        let container = document.getElementById(idContainer);
        let strdata = '';
        axios.post('/productos/clasedos')
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <option value="${rows.COD}">${rows.DES}</option>
                    `
            })
            container.innerHTML =  strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    productosComboClaseTres: (idContainer)=>{
        let container = document.getElementById(idContainer);
        let strdata = '';
        axios.post('/productos/clasetres')
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <option value="${rows.COD}">${rows.DES}</option>
                    `
            })
            container.innerHTML = strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = strdata;
        });
    },
    productosGetPrecios: (codprod,idContainer)=>{
        let container = document.getElementById(idContainer);
        container.innerHTML = GlobalLoader;
        let str = '';

        axios.post('/productos/preciosproducto',{codprod:codprod})
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                str = str + `
                    <tr>
                        <td>${rows.CODMEDIDA}</td>
                        <td>${rows.EQUIVALE}</td>
                        <td>${rows.COSTO}</td>
                        <td>${rows.PPUBLICO}</td>
                        <td>${rows.PMAYOREOC}</td>
                        <td>${rows.PMAYOREOB}</td>
                        <td>${rows.PMAYOREOA}</td>
                        <td>
                            <button class="btn btn-warning btn-circle" 
                            onclick="getPrecioEditar('${rows.CODPROD}','${rows.CODMEDIDA}',${rows.COSTO},${rows.EQUIVALE},${rows.PPUBLICO},${rows.PMAYOREOC},${rows.PMAYOREOB},${rows.PMAYOREOA});">
                                <i class="fa fa-check"></i>
                            </button>
                        </td>
                    </tr>
                `
            })
            container.innerHTML = str;  
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = '';
        });
    },
    productosSetPrecio: (codprod,codmedida,costo,equivale,ppublico,pmayoreoc,pmayoreob,pmayoreoa)=>{
        return new Promise((resolve,reject)=>{
            axios.put('/productos/precio',{
                codprod:codprod,
                codmedida:codmedida,
                costo:costo,
                equivale:equivale,
                ppublico:ppublico,
                pmayoreoc: pmayoreoc,
                pmayoreob:pmayoreob,
                pmayoreoa:pmayoreoa
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                reject();
            });


        })
        
    },
    digitadorPedidosVendedor: async(sucursal,codven,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
        
        let strdata = '';
        let totalpedidos = 0;
        axios.post('/digitacion/pedidospendientes', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.IMPORTE);
                    totalpedidos = totalpedidos + 1;
                    let f = rows.FECHA.toString().replace('T00:00:00.000Z','');
                    strdata = strdata + `
                            <tr>
                                <td>${rows.FECHA.toString().replace('T00:00:00.000Z','')}</td>
                                <td>
                                    ${rows.CODDOC + '-' + rows.CORRELATIVO}
                                </td>
                                <td>${rows.NOMCLIE}
                                    <br>
                                    <small>${rows.DIRCLIE + ',' + rows.DESMUNI}</small>
                                </td>
                                <td>
                                    ${funciones.setMoneda(rows.IMPORTE,'Q')}
                                </td>
                                <td>
                                    <button class="btn btn-info btn-sm btn-circle" onclick="getDetallePedido('${f}','${rows.CODDOC}','${rows.CORRELATIVO}')">
                                        +
                                    </button>
                                </td>
                            </tr>`
            })
            container.innerHTML = strdata;
            lbTotal.innerText = `${funciones.setMoneda(total,'Q ')} - Peds:${totalpedidos} - Prom:${funciones.setMoneda((Number(total)/Number(totalpedidos)),'Q')}`;
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    digitadorDetallePedido: async(fecha,coddoc,correlativo,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
        
        let strdata = '';

        GlobalSelectedCoddoc = coddoc;
        GlobalSelectedCorrelativo = correlativo;

        axios.post('/digitacion/detallepedido', {
            sucursal: GlobalCodSucursal,
            fecha:fecha,
            coddoc:coddoc,
            correlativo:correlativo
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.IMPORTE);
                    strdata = strdata + `
                            <tr>
                                <td>${rows.DESPROD}
                                    <br>
                                    <small class="text-danger">${rows.CODPROD}</small>
                                </td>
                                <td>${rows.CODMEDIDA}</td>
                                <td>${rows.CANTIDAD}</td>
                                <td>${rows.PRECIO}</td>
                                <td>${rows.IMPORTE}</td>
                            </tr>
                            `
            })
            container.innerHTML = strdata;
            lbTotal.innerText = `${funciones.setMoneda(total,'Q')}`;
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q0.00';
        });
           
    },
    digitadorPedidosTipoprecio: async(sucursal,codven,idContenedor)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
                
        let strdata = '';
     
        axios.post('/digitacion/pedidostipoprecio', {
            sucursal: sucursal,
            codven:codven
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                            <tr>
                                <td><b class="text-danger">${rows.CODDOC + '-' + rows.CORRELATIVO}<b>
                                    <br>
                                    <small>${rows.FECHA.toString().replace('T00:00:00.000Z','')}</small>
                                </td>
                                <td>${rows.DESPROD}
                                    <br>
                                    <small class="text-info">${rows.CODPROD}</small>
                                </td>
                                <td>${rows.CODMEDIDA}
                                    <br>
                                    TipoP:<b class="text-danger">${rows.TIPOPRECIO}</b>
                                </td>
                                <td>${rows.CANTIDAD}</td>
                                <td>
                                    <small>${funciones.setMoneda(rows.PRECIO,'Q')}</small>    
                                </td>
                                <td>
                                    ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}    
                                </td>
                            </tr>`
            })
            container.innerHTML = strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
           
    },
    digitadorBloquearPedido: async(sucursal,codven,coddoc,correlativo)=>{
        
        return new Promise((resolve,reject)=>{
            axios.put('/digitacion/pedidobloquear',{
                sucursal:sucursal,
                coddoc:coddoc,
                correlativo:correlativo,
                codven:codven
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                
                reject();
            });


        })
    },
    digitadorConfirmarPedido: async(sucursal,codven,coddoc,correlativo)=>{
        return new Promise((resolve,reject)=>{
            axios.put('/digitacion/pedidoconfirmar',{
                sucursal:sucursal,
                coddoc:coddoc,
                correlativo:correlativo,
                codven:codven
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                
                reject();
            });

        })
    }
}
