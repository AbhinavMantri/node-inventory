const connection = require('../utils/dbConnection');

async function query(queryStr, mutiple = false, inserted = false) {
    // console.log(queryStr);
    return new Promise(function (resolve, reject) {
        connection.query(queryStr, (err, results, fields) => {
            if(!err) {
                return resolve(inserted ? results.insertId : (mutiple ? results : results[0]));
            } else {
                console.log(err);
                return reject(err);
            }
        });
    });
}


module.exports = query;