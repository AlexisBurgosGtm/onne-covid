const execute = require('./connection');
const express = require('express');
const router = express.Router();

router.post("/login",async(req,res)=>{

    const {app,codsucursal,user,pass} = req.body;

    
    let qry ='';
    qry = `SELECT CODUSUARIO AS CODIGO, NOMBRE AS USUARIO, TIPO, CODDOC, CODSUCURSAL 
            FROM ME_USUARIOS 
            WHERE CODSUCURSAL='${codsucursal}' AND NOMBRE='${user}' AND PASS='${pass}' 
            OR CODSUCURSAL='TODOS' AND NOMBRE='${user}' AND PASS='${pass}'`;
    
    execute.Query(res,qry);
});

// OBTIENE LA LISTA DE VENDEDORES DISPONIBLES DE LA LISTA DE USUARIOS
router.get("/vendedores", async(req,res)=>{
    
    const {sucursal} = req.query;
        
    let qry =''; 
    qry = `SELECT CODVEN AS CODIGO, NOMVEN AS NOMBRE, TELEFONO, DESICONO AS TIPO FROM ME_VENDEDORES WHERE ACTIVO='SI' AND CODSUCURSAL='${sucursal}' ORDER BY NOMVEN`;     
    
    
    execute.Query(res,qry);

});

router.post("/vendedores", async(req,res)=>{
    
    const {sucursal} = req.body;
        
    let qry =''; 
    qry = `SELECT CODVEN AS CODIGO, NOMVEN AS NOMBRE, TELEFONO, DESICONO AS TIPO FROM ME_VENDEDORES WHERE ACTIVO='SI' AND CODSUCURSAL='${sucursal}' ORDER BY NOMVEN`;     
    
    
    execute.Query(res,qry);

});

module.exports = router;
