/** @format */

const { Router } = require("express");
const getCountryById = require("../controllers/getCountryById");
const getCountriesByActivity = require("../controllers/getCountriesByActivity");
const { Activity, Country } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req, res) => {
    const countryName = req.query.nombre;
    let countriesDb;
    const allCountries = await Country.findAll();
    if (countryName) {
        countriesDb = await allCountries.filter((obj) =>
            obj.nombre.toLowerCase().includes(countryName.toLowerCase())
        );
    } else {
        countriesDb = allCountries;
    }
    res.status(200).send(countriesDb);
});

router.get("/countries/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let country = await Country.findOne({
            where: {
                id: id,
            },
            include: {
                model: Activity,
                through: {
                    attributes: [], //que atributos de aquí quiero o si está vacío me elimina el atributo Country anidado
                },
            },
        });

        if (country) {
            country = country.toJSON();
            country.actividades = country.Activities;
            delete country.Activities;
            req.country = country;
            res.status(200).json(country);
        } else {
            req.error = {
                status: 404,
                message: "Country not found",
            };
        }
    } catch (err) {
        console.log(err);
        req.error = {};
    }
});
router.get("/activities", async (req, res) => {
    let activities = await Activity.findAll();
    res.status(200).json(activities);
});

router.post("/activities", async (req, res) => {
    let { nombre, dificultad,duracion, descripcion, temporada, paises = [] } = req.body;
    let activityRequest = {
        nombre,
        dificultad,
        duracion,
        descripcion,
        temporada,
    };

    // const [user, created] = await Activity.findOrCreate({
    //     where:{
    //             nombre:nombre
    //     }
    // })
    // console.log(user)
    // console.log(created)

    //     let paisesMapeados = paises.map((elem) => getCountryById(elem))
    //     paisesMapeados = await Promise.all(paisesMapeados)
    //     let activityMapeada = paisesMapeados.map((elem) => user.addCountry(elem.country))
    //     await Promise.all(activityMapeada)

    // res.send(user)
    const newActivity = await Activity.create(activityRequest)
    try {
        if (!paises.length) throw new Error("No recibimos el id")
        let paisesMapeados = paises.map((elem) => getCountryById(elem))
        paisesMapeados = await Promise.all(paisesMapeados)
        let activityMapeada = paisesMapeados.map((elem) => newActivity.addCountry(elem.country))
        await Promise.all(activityMapeada)
        return res.status(201).send("Se ha creado correctamente")
    } catch (err) {
        console.log(err)
        res.status(400).send("Se ha creado incorrectamente")
    }
});

module.exports = router;
