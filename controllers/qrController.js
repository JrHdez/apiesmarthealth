const QR = require('../models/qr');
const axios = require('axios')



module.exports = {
    async findByBandCode(req, res, nect){
        try{
            const code_request = req.query.code_request;
            const latitude = req.query.latitude;
            const longitude = req.query.longitude;
            const data = await QR.findByBandCode(code_request);
            // console.log(`ubic`,latitude,longitude);
            if (data){
                const notification = {
                    "app_id": "c790b704-4abc-4caa-8bf3-0b801cd9c5a0",
                    "data": {"userId": "PostMan1234"},
                    "contents": {"en": `${data.name}, el código QR ha sido escaneado. Toca para mirar la ubicación`, "es": "Este mensaje está en español"},
                    "heading": {"en": "Alerta", "es": "Este es el título"},
                    "include_player_ids": [`${data.notificationid}`],
                    "url": `https://maps.google.com/?q=${latitude},${longitude}`
                };

                axios.post("https://onesignal.com/api/v1/notifications",notification,{
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Basic YzE1NmNlN2ItMzQ4MS00ODJjLTgwMjAtNTE3MmE4YTVhYzU2'
                    }
                })

                return res.status(201).json({
                    message: 'Se ha identificado el código',
                    success: true,
                    data: data
                });
            }else{
                return res.status(401).json({
                    message: 'No se pudo identificar el código',
                    success: false,
                })
            }
        }catch(error){
            console.log(`Error al obtener cotizaciones ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las cotizaciones',
                error: error,
                success: false
            })
        }


    }
}

