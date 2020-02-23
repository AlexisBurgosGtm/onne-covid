const execute = require('./connection');
const express = require('express');
const router = express.Router();

// OBTIENE LOS USUARIOS DE UN DETERMINADO TIPO
router.post("/listado", async(req,res)=>{
    
    const {sucursal,tipo} = req.body;
    
    let qry ='';

    if(tipo=='GERENTE'){
        qry = `SELECT ID,CODUSUARIO as CODIGO,NOMBRE AS USUARIO,PASS AS CLAVE,TELEFONO,CODDOC FROM ME_USUARIOS WHERE CODSUCURSAL='${sucursal}' `;     
    }else{
        qry = `SELECT ID,CODUSUARIO as CODIGO,NOMBRE AS USUARIO,PASS AS CLAVE,TELEFONO,CODDOC FROM ME_USUARIOS WHERE CODSUCURSAL='${sucursal}'AND TIPO='${tipo}'`;     
    }
        
    execute.Query(res,qry);

});

// ELIMINA UN USUARIOS
router.post("/eliminar", async(req,res)=>{
    
    const {sucursal,id} = req.body;
        
    let qry ='';

    qry = `DELETE FROM ME_USUARIOS WHERE CODSUCURSAL='${sucursal}'AND ID=${id}`;     
  
    execute.Query(res,qry);

});

// NUEVO USUARIO
router.post("/nuevo", async(req,res)=>{
    
    const {sucursal,tipo,codusuario,usuario,clave,coddoc,telefono} = req.body;
        
    let qry ='';

    qry = `INSERT INTO ME_USUARIOS 
        (CODUSUARIO,NOMBRE,PASS,TIPO,TELEFONO,CODDOC,CODSUCURSAL) VALUES
        (${codusuario},'${usuario}','${clave}','${tipo}','${telefono}','${coddoc}','${sucursal}')`;     

    execute.Query(res,qry);

});

// EDITA EL USUARIO
router.post("/editar", async(req,res)=>{
    
    const {id,sucursal,tipo,codusuario,usuario,clave,coddoc,telefono} = req.body;
        
    let qry ='';

    qry = `UPDATE ME_USUARIOS SET 
            CODUSUARIO=${codusuario},
            NOMBRE='${usuario}',
            PASS='${clave}',
            TIPO='${tipo}',
            TELEFONO='${telefono}',
            CODDOC='${coddoc}'
            WHERE ID=${id} AND CODSUCURSAL='${sucursal}'`;     
  
    execute.Query(res,qry);

});


module.exports = router;