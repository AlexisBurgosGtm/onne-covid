const execute = require('./connection');
const express = require('express');
const router = express.Router();

router.put('/pedidobloquear', async(req,res)=>{
    const {sucursal,codven,coddoc,correlativo} = req.body;

    let qry = `UPDATE ME_DOCUMENTOS SET DOC_ESTATUS='A' WHERE CODSUCURSAL='${sucursal}' AND CODVEN=${codven} AND CODDOC='${coddoc}' AND DOC_NUMERO='${correlativo}'`;
    console.log(qry);
    execute.Query(res,qry);

});

router.put('/pedidoconfirmar', async(req,res)=>{
    const {sucursal,codven,coddoc,correlativo} = req.body;

    let qry = `UPDATE ME_DOCUMENTOS SET DOC_ESTATUS='I' WHERE CODSUCURSAL='${sucursal}' AND CODVEN=${codven} AND CODDOC='${coddoc}' AND DOC_NUMERO='${correlativo}'`;

    console.log(qry);

    execute.Query(res,qry);

});

router.post("/pedidostipoprecio", async(req,res)=>{
    const {sucursal,codven}  = req.body;
    
    let qry = '';
    qry = `SELECT ME_Documentos.CODDOC, ME_Documentos.DOC_NUMERO AS CORRELATIVO, ME_Documentos.DOC_FECHA AS FECHA, ME_Documentos.CODVEN, ME_Documentos.CODSUCURSAL, ME_Docproductos.CODPROD, 
            ME_Docproductos.DESCRIPCION AS DESPROD, ME_Docproductos.CODMEDIDA, ME_Docproductos.CANTIDAD, ME_Docproductos.PRECIO, ME_Docproductos.TOTALPRECIO, ME_Docproductos.TIPOPRECIO
            FROM ME_Documentos LEFT OUTER JOIN
                ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND 
                ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT LEFT OUTER JOIN
                ME_Docproductos ON ME_Documentos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Documentos.DOC_ANO = ME_Docproductos.DOC_ANO AND 
                ME_Documentos.DOC_NUMERO = ME_Docproductos.DOC_NUMERO AND ME_Documentos.CODDOC = ME_Docproductos.CODDOC AND ME_Documentos.EMP_NIT = ME_Docproductos.EMP_NIT
            WHERE (ME_Documentos.CODVEN = ${codven}) AND (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Documentos.DOC_ESTATUS = 'O') AND (ME_Docproductos.TIPOPRECIO<>'P')`

    
    execute.Query(res,qry);
});


router.post("/pedidospendientes", async(req,res)=>{
    const {sucursal,codven}  = req.body;
    
    let qry = '';
    qry = `SELECT DOC_FECHA AS FECHA, CODDOC, DOC_NUMERO AS CORRELATIVO, DOC_NOMREF AS NOMCLIE, DOC_DIRENTREGA AS DIRCLIE, '' AS DESMUNI, DOC_TOTALVENTA AS IMPORTE, LAT, LONG
            FROM ME_Documentos
            WHERE (CODSUCURSAL = '${sucursal}') AND (CODVEN = ${codven}) AND (DOC_ESTATUS='O')
            ORDER BY DOC_FECHA,DOC_NUMERO`

    
    execute.Query(res,qry);
});


router.post("/detallepedido", async(req,res)=>{
    const {sucursal,fecha,coddoc,correlativo}  = req.body;

    let ncorrelativo = correlativo;
    
    console.log('correlativo: ' + ncorrelativo);
    
    let qry = '';
    qry = `SELECT ME_Docproductos.CODPROD, ME_Docproductos.DESCRIPCION AS DESPROD, ME_Docproductos.CODMEDIDA, ME_Docproductos.CANTIDAD, ME_Docproductos.PRECIO, ME_Docproductos.TOTALPRECIO AS IMPORTE
            FROM ME_Documentos LEFT OUTER JOIN
            ME_Docproductos ON ME_Documentos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Documentos.DOC_NUMERO = ME_Docproductos.DOC_NUMERO AND 
            ME_Documentos.CODDOC = ME_Docproductos.CODDOC AND ME_Documentos.EMP_NIT = ME_Docproductos.EMP_NIT
            WHERE  (ME_Documentos.CODSUCURSAL = '${sucursal}') 
            AND (ME_Documentos.DOC_FECHA = '${fecha}') 
            AND (ME_Documentos.CODDOC = '${coddoc}') 
            AND (ME_Documentos.DOC_NUMERO = '${ncorrelativo}')`;

    execute.Query(res,qry);
});

module.exports = router;