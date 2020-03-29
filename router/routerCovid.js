const execute = require('./connection');
const express = require('express');
const router = express.Router();


router.post('/data',async(req,res)=>{
    let qry = `SELECT COVID_DATA.FECHA, COVID_DATA.NOMREPORTADO AS NOMBRE, COVID_DATA.DIRREPORTADO AS DIRECCION, GENERAL_MUNICIPIOS.DESMUNICIPIO AS MUNICIPIO, GENERAL_DEPARTAMENTOS.DESDEPARTAMENTO AS DEPARTAMENTO, COVID_DATA.STATUS, COVID_DATA.LAT, 
                COVID_DATA.LONG
                FROM COVID_DATA LEFT OUTER JOIN
                GENERAL_DEPARTAMENTOS ON COVID_DATA.CODDEPTO = GENERAL_DEPARTAMENTOS.CODDEPARTAMENTO LEFT OUTER JOIN
                GENERAL_MUNICIPIOS ON COVID_DATA.CODMUNI = GENERAL_MUNICIPIOS.CODMUNICIPIO WHERE COVID_DATA.LAT<>0 AND COVID_DATA.NIT<>'00'`;
    
    execute.Query(res,qry);

})

router.post('/report',async(req,res)=>{
    const {nit,nombre,direccion,status,municipio,departamento,latitud,longitud,fecha} = req.body;
    console.log(req.body)

    let qry = `INSERT INTO COVID_DATA (FECHA,NIT,NOMREPORTADO,DIRREPORTADO,CODMUNI,CODDEPTO,LAT,LONG,STATUS) 
        VALUES ('${fecha}','${nit}','${nombre}','${direccion}',${municipio},${departamento},${latitud},${longitud},'${status}')`;
    
    execute.Query(res,qry);

})


module.exports = router;
