const db = require('../config/config');

const Qr = {};

Qr.findByBandCode = (bandCode) => {
    const sql = `
        SELECT
            id,
            bandCode,
            name,
            lastname,
            phone,
            email,
            notificationID
        FROM
            users
        WHERE
            bandCode = $1
    `;
    return db.oneOrNone(sql, bandCode);
}


module.exports = Qr;