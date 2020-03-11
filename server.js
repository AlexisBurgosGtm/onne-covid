var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const execute = require('./router/connection');
var routerNoticias = require('./router/routerNoticias');
var routerVentas = require('./router/routerVentas');
var routerTipoDocs = require('./router/routerTipoDocs');
var routerEmpleados = require('./router/routerEmpleados');
var routerClientes = require('./router/routerClientes');
var routerProductos = require('./router/routerProductos');
let routerDigitacion = require('./router/routerDigitacion');
let routerUsuarios = require('./router/routerUsuarios');

/**
var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("quick.db");
 */

var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 777;

app.use(bodyParser.json());

app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  /*
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, pplication/json');
        // Set to true if you need the website to include cookies in the requests sent
      res.setHeader('Access-Control-Allow-Credentials', true);
*/
  console.log("/" + req.toString());
  next();
});

app.get("/",function(req,res){
  execute.start();
	res.sendFile(path + 'index.html');
}); 

// CORONAVIRUS
/**
var getall=setInterval(async()=>{let e;try{200!==(e=await axios.get("https://www.worldometers.info/coronavirus/")).status&&console.log("ERROR")}catch(e){return null}const t={};cheerio.load(e.data)(".maincounter-number").filter((e,a)=>{let l=a.children[0].next.children[0].data||"0";l=parseInt(l.replace(/,/g,"")||"0",10),0===e?t.cases=l:1===e?t.deaths=l:t.recovered=l}),db.set("all",t),console.log("Updated The Cases",t)},6e5);

var getcountries=setInterval(async()=>{let e;try{200!==(e=await axios.get("https://www.worldometers.info/coronavirus/")).status&&console.log("Error",e.status)}catch(e){return null}const t=[],r=cheerio.load(e.data)("table#main_table_countries").children("tbody").children("tr").children("td");for(let e=0;e<r.length-8;e+=1){const a=r[e];if(e%8==0){let e=a.children[0].data||a.children[0].children[0].data||a.children[0].children[0].children[0].data||a.children[0].children[0].children[0].children[0].data||"";0===(e=e.trim()).length&&(e=a.children[0].next.children[0].data||""),t.push({country:e.trim()||""})}if(e%8==1){let e=a.children[0].data||"";t[t.length-1].cases=parseInt(e.trim().replace(/,/g,"")||"0",10)}if(e%8==2){let e=a.children[0].data||"";t[t.length-1].todayCases=parseInt(e.trim().replace(/,/g,"")||"0",10)}if(e%8==3){let e=a.children[0].data||"";t[t.length-1].deaths=parseInt(e.trim().replace(/,/g,"")||"0",10)}if(e%8==4){let e=a.children[0].data||"";t[t.length-1].todayDeaths=parseInt(e.trim().replace(/,/g,"")||"0",10)}if(e%8==6){let e=a.children[0].data||0;t[t.length-1].recovered=parseInt(e.trim().replace(/,/g,"")||0,10)}if(e%8==7){let e=a.children[0].data||"";t[t.length-1].critical=parseInt(e.trim().replace(/,/g,"")||"0",10)}}db.set("countries",t),console.log("Updated The Countries",t)},6e4);

app.get("/coronavirus", async function(request, response) {
  let a = await db.fetch("all");
  response.send(`${a.cases} cases are reported of the COVID-19 Novel Coronavirus strain<br> ${a.deaths} have died from it <br>\n${a.recovered} have recovered from it <br> Get the endpoint /all to get information for all cases <br> get the endpoint /countries for getting the data sorted country wise`);
});

//var listener = app.listen(process.env.PORT, function() {
  //console.log("Your app is listening on port " + listener.address().port);
//});

app.get("/allcoronavirus/", async function(req, res) {
  let all = await db.fetch("all");
  res.send(all);
});

app.get("/countriescoronavirus/", async function(req, res) {
  let countries = await db.fetch("countries");
  res.send(countries);
});
 */
// COVID19

//Router para app NOTICIAS
app.use('/noticias', routerNoticias);

//Router para app VENTAS
app.use('/ventas', routerVentas);

// Router para Tipodocumentos
app.use('/tipodocumentos', routerTipoDocs);

// Router para empleados o vendedores
app.use('/empleados', routerEmpleados);

// Router para clientes
app.use('/clientes', routerClientes);

// Router para productos
app.use('/productos', routerProductos);

// Router para digitacion
app.use('/digitacion', routerDigitacion);

// Router para usuarios
app.use('/usuarios', routerUsuarios);


app.use("/",router);

app.use("*",function(req,res){
  res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});




// SOCKET HANDLER
io.on('connection', function(socket){
  
  socket.on('noticias nueva', (msg,usuario)=>{
    io.emit('noticias nueva', msg,usuario);
  });

  socket.on('productos precio', function(msg,usuario){
	  io.emit('productos precio', msg, usuario);
  });

  socket.on('productos bloqueado', function(msg,usuario){
	  io.emit('productos bloqueado', msg, usuario);
  });


  socket.on('chat msn', function(msg,user){
	  io.emit('chat msn', msg, user);
  });
  
  
});


http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

