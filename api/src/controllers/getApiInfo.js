const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
module.exports = async () => {
    const response = await axios.get('https://restcountries.com/v3/all')
    const apiData = response.data.map(obj => {
        return {
            id: obj.cca3,
            nombre: obj.name.common,
            img: obj.flags[0],
            continente: obj.region,
            capital: JSON.stringify(obj.capital ? obj.capital : "No information"),
            subregion: obj.subregion,
            poblacion: obj.population,
            area: obj.area,
        }
    })
    orderedCountries = apiData.sort((countryA, countryB) => countryA.nombre.localeCompare(countryB.nombre))
    return orderedCountries
}

