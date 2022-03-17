const db = require('../config/config');
const crypto = require("crypto");

const Authentication = {};

Authentication.getAuthPolicia = (auth) => {
    sql = `
    SELECT 
        * 
    FROM 
        dbpolicia
    WHERE
        placa=$1
    `;
    return db.oneOrNone(sql,auth);
}

Authentication.getAuthBombero = (auth) => {
    sql = `
    SELECT 
        * 
    FROM 
        dbbomberos
    WHERE
        registro_bomberos=$1
    `;
    return db.oneOrNone(sql,auth);
}

Authentication.getAuthDefensaCivil = (auth) => {
    sql = `
    SELECT 
        * 
    FROM 
        dbdefensacivil
    WHERE
        registro_defensa_civil=$1
    `;
    return db.oneOrNone(sql,auth);
}

Authentication.getAuthMedicina = (auth) => {
    sql = `
    SELECT 
        * 
    FROM 
        dbmedicina
    WHERE
        registro_medico=$1
    `;
    return db.oneOrNone(sql,auth);
}

Authentication.findByBandCode = (bandCode) => {
    sql = `
    SELECT 
        * 
    FROM 
        bands
    WHERE
        code=$1
    `;
    return db.oneOrNone(sql,bandCode);
}

Authentication.findUserRBand = (bandCode) => {
    sql = `
    SELECT 
        * 
    FROM 
        users
    WHERE
        bandcode=$1
    `;
    return db.oneOrNone(sql,bandCode);
}


module.exports = Authentication;