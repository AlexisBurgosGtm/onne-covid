if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
 navigator.serviceWorker.register('../sw.js')
  .then(registration => console.log('Service Worker registered'))
  .catch(err => 'SW registration failed'));
};


const GlobalLoader = '<h1>Cargando datos...</h1>'
let map;

let GlobalResultadoNit = false;

function Lmap(lat,long,nombre,direccion,fecha){
    
    //INICIALIZACION DEL MAPA            
      var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      osm = L.tileLayer(osmUrl, {center: [lat, long],maxZoom: 20, attribution: osmAttrib});    
      map = L.map('mapcontainer').setView([lat, long], 8.5).addLayer(osm);

      L.marker([lat, long])
        .addTo(map)
        .bindPopup(`<div class="bg-danger text-white">${nombre} - Dir:${direccion} - Fecha:${fecha}</div>`, {closeOnClick: false, autoClose: false})
        .openPopup()

      return map;
};


async function addListeners(){
  //inicializa el mapa con la ubicación del caso inicial
  map = Lmap(14.68855296094455,-90.64981941745408,"Caso inicial","San Pedro Sacatepéquez",'2020/03/05');
  /* funcion mientras armo el mapa inicial */
  map.on('click', function(e) {
    console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    console.log(e);
  });

//listeners
    
  let txtNit = document.getElementById('txtNit');
  let lbNombreNit = document.getElementById('lbNombreNit');
  let txtNombre = document.getElementById('txtNombre');
  let txtDireccion = document.getElementById('txtDireccion');
  let cmbMunicipio = document.getElementById('cmbMunicipio');
  let cmbDepartamento = document.getElementById('cmbDepartamento');
  let cmbStatus = document.getElementById('cmbStatus');
  let lbLat = document.getElementById('lbLat');
  let lbLong = document.getElementById('lbLong');

  txtNit.addEventListener('keyup',(e)=>{
    funciones.GetDataNit('txtNit')
    .then((data)=>{
      console.log('promesa nit: ' + data)
      GlobalResultadoNit = data.resultado;
      lbNombreNit.innerText = data.descripcion;
    })
    .catch((err)=>{
      GlobalResultadoNit = false;
      funciones.AvisoError(err);
    })
  })

  let btnNuevoRep = document.getElementById('btnNuevoRep');
  btnNuevoRep.addEventListener('click',()=>{
    GlobalResultadoNit = false;
    cleanData();
    funciones.ObtenerUbicacion('lbLat','lbLong');
    $('#modalNuevoReporte').modal('show');
  })

  let btnNuevo = document.getElementById('btnNuevo');
  btnNuevo.addEventListener('click',()=>{
    GlobalResultadoNit = false;
    cleanData();
    funciones.ObtenerUbicacion('lbLat','lbLong');
    $('#modalNuevoReporte').modal('show');
  })

  
  funciones.getComboMunicipios('cmbMunicipio');
  funciones.getComboDepartamentos('cmbDepartamento');

  let btnCancelar = document.getElementById('btnCancelar');
  let btnGuardar = document.getElementById('btnGuardar');
  btnGuardar.addEventListener('click',()=>{
    funciones.Confirmacion('¿Está seguro que desea enviar este reporte?')
    .then(async(value)=>{
      if(value==true){
        if(GlobalResultadoNit==true){
          if(txtNit.value =='CF'){
            funciones.AvisoError('Nit incorrecto, debe usar su número de nit para publicar.')
          }else{
            postReport(txtNit.value,txtNombre.value,txtDireccion.value,cmbStatus.value,cmbMunicipio.value,cmbDepartamento.value,lbLat.innerText,lbLong.innerText,funciones.getFecha())
            
          }
          
        }else{
          funciones.AvisoError('Nit incorrecto, debe usar su número de nit para publicar.')
        }
        
        
      }
    })
  });

  //obtiene los datos hasta el momento
  await getData('tblReportes',"totalConfirmados","totalSospechosos");

  $('#modalAviso').modal('show');
};

function cleanData(){
  document.getElementById('txtNit').value = '';
  document.getElementById('txtNombre').value = '';
  document.getElementById('txtDireccion').value ='';
  document.getElementById('cmbStatus').value = "SOSPECHOSO";
}


addListeners();


async function postReport(nit,nombre,direccion,status,municipio,departamento,lat,long,fecha){
  
    axios.post('/covid/report',{
      nit:nit,
      nombre:nombre,
      direccion:direccion,
      status:status,
      municipio:municipio,
      departamento:departamento,
      latitud:lat,
      longitud:long,
      fecha:fecha
    })
    .then(async(response) => {
      if(response.data.rowsAffected[0]==1){
        funciones.Aviso('Reporte publicado exitosamente!!')
        await getData('tblReportes',"totalConfirmados","totalSospechosos");
        btnCancelar.click();    
        cleanData();
        
      }else{
        funciones.AvisoError('Lo siento, ocurrió un error y no pude publicar tu reporte')
      }
       
    }, (error) => {
      funciones.AvisoError('Lo siento, ocurrió un error y no pude publicar tu reporte')
    });

}

async function getData(idContainer,idConfirmados,idSospechosos){

  let container = document.getElementById(idContainer);
  container.innerHTML = GlobalLoader;
  
  let containerConfirmados = document.getElementById(idConfirmados);
  let containerSospechosos = document.getElementById(idSospechosos);
  containerConfirmados.innerText = '--'
  containerSospechosos.innerText = '--'
  
  let tbl = '';
  
  axios.post('/covid/data')
  .then((response) => {
      const data = response.data.recordset;
      let confirmados =1; let sospechosos = 0;
      let classst = ''
      data.map((rows)=>{
          let fecha = rows.FECHA.toString().replace('T00:00:00.000Z','')
          if(rows.STATUS=='CONFIRMADO'){confirmados = confirmados + 1;classst='bg-danger text-white'}else{sospechosos = sospechosos + 1;classst='bg-info text-white'}
         tbl= tbl + `
         <tr>
            <td>
              ${rows.NOMBRE}<br>
              <small class="${classst}">${rows.STATUS}</small>
            </td>
            <td>${rows.DIRECCION}<br>
              <small>${rows.MUNICIPIO},${rows.DEPARTAMENTO}</small>
            </td>
            <td>${fecha}</td>
         </tr>
         `; 
         L.marker([rows.LAT, rows.LONG])
         .addTo(map)
         .bindPopup(`${rows.NOMBRE} - ${rows.STATUS} - Fecha:${fecha}`, {closeOnClick: true, autoClose: false})
      })

      container.innerHTML = tbl;
      containerConfirmados.innerText = confirmados;
      containerSospechosos.innerText = sospechosos;
  }, (error) => {
      funciones.AvisoError('Error en la solicitud');
      containerConfirmados.innerText = '--'
      containerSospechosos.innerText = '--'
      
  });
     
};
