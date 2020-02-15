let root = document.getElementById('root');
let rootMenu = document.getElementById('rootMenu');
let rootMenuLateral = document.getElementById('rootMenuLateral');
let lbMenuTitulo = document.getElementById('lbMenuTitulo');

let divUsuario = document.getElementById('divUsuario');
let lbTipo = document.getElementById('lbTipo');

divUsuario.innerText = "DESCONECTADO";
lbTipo.innerText = "Inicie sesión";

let GlobalToken = 'MERCADOSEFECTIVOS';
let GlobalCodSucursal = '';

let GlobalCodUsuario = 99999;
let GlobalUsuario = 'MERCADOSEFECTIVOS';
let GlobalNivelUser = 0;
let GlobalTipoUsuario ='';
let GlobalSelectedDia ='';

let GlobalEmpnit = '1034261-3';
let GlobalEmpNombre = 'MERCADOS EFECTIVOS';
let GlobalSelectedForm = '';

let map;
let GlobalSelectedId ;
let GlobalCoddoc = 'PED01';
let GlobalTotalDocumento = 0;
let GlobalTotalCostoDocumento = 0;
let GlobalCodBodega = '01';
let GlobalTipoCobro = 'TERMINAR';

let GlobalSelectedCodCliente;
let GlobalSelectedNomCliente;
let GlobalSelectedDirCliente;

let GlobalSelectedCodprod;
let GlobalSelectedDesprod;
let GlobalSelectedStatus=0;
let GlobalSelectedCoddoc = '';
let GlobalSelectedCorrelativo = '';

let GlobalSelectedApp = '';

let GlobalSistema = 'ISC';



let GlobalLoader = `
                <div>
                    <div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>
                    <div class="spinner-grow text-info" role="status"><span class="sr-only">Loading...</span></div>
                    <div class="spinner-grow text-danger" role="status"><span class="sr-only">Loading...</span></div>
                    <div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div>
                </div>
                `

//'<div class="spinner-grow text-info" role="status"><span class="sr-only">Loading...</span></div>'


//'<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';



