const { Country } = require('../db');

module.exports = async (id) => {
   let res = {};

      const country = await Country.findByPk(id.toUpperCase());
      country ? res.country = country : res.error = `No se ha encontrado un pais con id "${id}"`;
   return res;
}