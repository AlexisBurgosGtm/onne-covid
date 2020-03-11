function getView(){
    let str = `
    <div class="row">
        <div class="card-header bg-trans-gradient text-white">
            <h3>Noticias equipo Mercados Efectivos</h3>
        </div>
    </div>
    <br>
    <div class="row">
        <div id="tblNoticias" class="card-deck"></div>
    </div>
    `
    root.innerHTML = '<div class="row" id="tblCoronavirus"></div>' //str;
};

function addListeners(){

};

function inicializarVistaNoticias(){
    getView();
    
    api.coronavirus('tblCoronavirus');

    //api.noticiaslistado(GlobalCodSucursal,GlobalUsuario,'tblNoticias')
};