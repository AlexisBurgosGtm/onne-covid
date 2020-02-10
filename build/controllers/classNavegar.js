let classNavegar = {
    login : async()=>{
        divUsuario.innerText = 'DESCONECTADO';
        lbTipo.innerText = "Inicie sesión";
        rootMenu.innerHTML = '';
        GlobalCoddoc = '';
        GlobalCodUsuario=99999;
        GlobalUsuario = '';
        GlobalTipoUsuario ='';
            funciones.loadScript('../views/login/index.js','root')
            .then(()=>{
                GlobalSelectedForm='LOGIN';
                InicializarVista();
            })
        
    },
    inicio : async(tipousuario)=>{
        divUsuario.innerText = GlobalUsuario;
        lbTipo.innerText = GlobalTipoUsuario;


        switch (tipousuario) {
            case 'VENDEDOR':
                classNavegar.inicioVendedor();
                break;

            case 'SUPERVISOR':
                funciones.loadScript('../views/inicio/supevisor.js','root')
                .then(()=>{
                    GlobalSelectedForm='INICIO';
                    InicializarVista();
                })          
                break;
            
            case 'REPARTIDOR':
                funciones.loadScript('../views/inicio/repartidor.js','root')
                .then(()=>{
                    GlobalSelectedForm='INICIO';
                    InicializarVista();
                })          
                break;
            case 'GERENTE':
                    classNavegar.inicioGerente();                        
                break;
            default:
                break;

        };
      
    },
    inicioVendedor : async ()=>{
        let strMenu =   `
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuVendedorClientes">
                                <span>VENDER</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuVendedorPedidos">
                                <span>LOGRO DIA</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuVendedorLogro">
                                <span>LOGRO MES</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuVendedorNoticias">
                                <span>NOTICIAS</span>
                            </a>
                            `
                rootMenu.innerHTML = strMenu;

                funciones.loadScript('../views/inicio/vendedor.js','root')
                .then(()=>{
                    GlobalSelectedForm='INICIO';
                    InicializarVista();
                    
                      // handlers del menu
                    let btnMenuVendedorClientes = document.getElementById('btnMenuVendedorClientes');
                    btnMenuVendedorClientes.addEventListener('click',()=>{
                        classNavegar.inicio('VENDEDOR');
                    });
                    let btnMenuVendedorPedidos = document.getElementById('btnMenuVendedorPedidos');
                    btnMenuVendedorPedidos.addEventListener('click',()=>{
                        classNavegar.pedidos();
                    });
                    let btnMenuVendedorLogro = document.getElementById('btnMenuVendedorLogro');
                    btnMenuVendedorLogro.addEventListener('click',()=>{
                        classNavegar.logrovendedor();
                    });
                    let btnMenuVendedorNoticias = document.getElementById('btnMenuVendedorNoticias');
                    btnMenuVendedorNoticias.addEventListener('click',()=>{
                        classNavegar.noticias();
                    });
                })          
    },
    inicioGerente: ()=>{
                let strMenu =  `
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuGerenteInicio">
                                <span>Inicio</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuGerenteVendedores">
                                <span>Vendedores</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuGerenteProductos">
                                <span>Productos</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuGerenteLogro">
                                <span>Logros</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuGerenteNoticias">
                                <span>Noticias</span>
                            </a>
                            `
                    rootMenu.innerHTML = strMenu;
                       
                    
                     // handlers del menu
                    let btnMenuGerenteInicio = document.getElementById('btnMenuGerenteInicio');
                    btnMenuGerenteInicio.addEventListener('click',()=>{
                        classNavegar.inicioGerente();
                    });
                    let btnMenuGerenteVendedores = document.getElementById('btnMenuGerenteVendedores');
                    btnMenuGerenteVendedores.addEventListener('click',()=>{
                        classNavegar.gerenteVendedores();
                    });
                    let btnMenuGerenteProductos = document.getElementById('btnMenuGerenteProductos');
                    btnMenuGerenteProductos.addEventListener('click',()=>{
                       classNavegar.gerenteProducto(); 
                    });
                    let btnMenuGerenteLogro = document.getElementById('btnMenuGerenteLogro');
                    btnMenuGerenteLogro.addEventListener('click',()=>{
                        
                    });
                    let btnMenuGerenteNoticias = document.getElementById('btnMenuGerenteNoticias');
                    btnMenuGerenteNoticias.addEventListener('click',()=>{
                        
                    });
        funciones.loadScript('../views/gerente/inicio.js','root')
        .then(()=>{
            GlobalSelectedForm='GERENTE';
            InicializarVistaGerente();
        })
    },
    ventas: async(nit,nombre,direccion)=>{
        funciones.loadView('../views/facturacion/index.html','root')
        .then(()=>{            
            funciones.loadScript('./views/facturacion/controller.js','root')
            .then(()=>{
                GlobalSelectedForm ='VENTAS';
                //controllerventa.iniciarVistaVentas(nit,nombre,direccion);
                iniciarVistaVentas(nit,nombre,direccion);
            })
        })
    },
    pedidos: async ()=>{
        funciones.loadScript('../views/pedidos/vendedor.js','root')
        .then(()=>{
            GlobalSelectedForm='PEDIDOS';
            inicializarVistaPedidos();
        })             
    },
    logrovendedor: ()=>{
        funciones.loadScript('../views/pedidos/vendedorlogro.js','root')
            .then(()=>{
                GlobalSelectedForm='LOGROVENDEDOR';
                inicializarVistaLogro();
        })
    },
    despacho: async()=>{
        funciones.loadView('../views/despacho/index.html','root')
        .then(()=>{
            funciones.loadScript('./views/despacho/controller.js','root')
            .then(()=>{
                GlobalSelectedForm ='DESPACHO';
                controllerdespacho.iniciarVistaDespacho();

            })
        })
    },
    noticias: ()=>{
        funciones.loadScript('../views/noticias/index.js','root')
        .then(()=>{
            GlobalSelectedForm='NOTICIAS';
            inicializarVistaNoticias();
        })
    },
    gerenteVendedores: ()=>{
        funciones.loadScript('../views/gerente/vendedores.js','root')
        .then(()=>{
            GlobalSelectedForm='GERENTEVENDEDORES';
            InicializarVistaGerenteVendedores();
        })
    },
    gerenteProducto: ()=>{
        funciones.loadScript('../views/gerente/productos.js','root')
        .then(()=>{
            GlobalSelectedForm='GERENTEPRODUCTOS';
            inicializarVistaGerenteProductos();
        })
    }
}