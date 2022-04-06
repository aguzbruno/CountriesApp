const getApiInfo = require('../controllers/getApiInfo.js')

let allcountries = await getApiInfo();
    allcountries.map(obj => {
        Country.findOrCreate(
            {
                where: { nombre: obj.nombre },
                defaults: {
                    id: obj.id,
                    nombre: obj.nombre,
                    img: obj.img,
                    continente: obj.continente,
                    capital: obj.capital,
                    subregion: obj.subregion,
                    poblacion: obj.poblacion,
                    area: obj.area,
                }
            }
        )
    })
    res.status(200).send({ countries: allcountries })