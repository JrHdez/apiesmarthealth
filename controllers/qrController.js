const QR = require('../models/qr');
const axios = require('axios');



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
                    "app_id": "d972c946-2ec3-48b7-bf2b-cc89f84320db",
                    "data": {"userId": "PostMan1234"},
                    "contents": {"en": `${data.name}, el código QR ha sido escaneado. Toca para mirar la ubicación`, "es": "Este mensaje está en español"},
                    "heading": {"en": "Alerta", "es": "Este es el título"},
                    "include_player_ids": [`${data.notificationid}`],
                    "url": `https://maps.google.com/?q=${latitude},${longitude}`
                };
                    
                // fetch("https://onesignal.com/api/v1/notifications",{
                //     method: "POST",
                //     body: notification,
                //     headers: {
                //         'Content-type': 'application/json',
                //         'Authorization': 'Basic YzE1NmNlN2ItMzQ4MS00ODJjLTgwMjAtNTE3MmE4YTVhYzU2'
                //     }
                // }).then(res => res.json()).then(res => console.log(res));

                axios.post("https://onesignal.com/api/v1/notifications",notification,{
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Basic MzliM2VmN2EtNDBjNy00ZjY1LTlhYmQtYjNjOTM5MTU0YThh'
                    }
                }).then(response => console.log(response)).catch(error => console.log('Axios error mandando post req',error));

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
                message: 'Hubo un error al tratar de obtener la informacion del usuario',
                error: error,
                success: false
            })
        }


    }
}

