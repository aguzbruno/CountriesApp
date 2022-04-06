//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const getApiInfo = require('./src/controllers/getApiInfo.js')
const createActivityDb = require('./src/controllers/createActivityDb.js')
const {Country } = require('./src/db.js');
const activities = require("./src/data/activities");

// Syncing all the models at once.
conn.sync({ force: true })
  .then(async () => {

    try {
      // AÑADO LOS PAISES
      let response = await getApiInfo();
        // ya que tengo cada país con los datos que necesito, procedo a guardarlos en la DB
        await Country.bulkCreate(response, { validate: true });
        activities.map(activity => createActivityDb(activity));

    } catch (err) {
      console.log(err);
    }
    server.listen(process.env.PORT, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });
