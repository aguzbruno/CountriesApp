const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    nombre: {
       type: DataTypes.STRING,
       allowNull: false
    },
    descripcion: {
       type: DataTypes.STRING,
       allowNull: false,
    },
    dificultad: {
       type: DataTypes.INTEGER,
       validate: {
          min: 1,
          max: 5
       }
    },
    duracion: {
       type: DataTypes.FLOAT,
       validate: {
          min: 1,
          max: 48
       }
    },
    temporada: {
       type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
    },
  },{
   tableName: 'activities',
   timestamps: false
});
};
