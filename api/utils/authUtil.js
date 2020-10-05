const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getHashPassword(password) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
}

async function getToken(user) {
  return jwt.sign({id: user.id}, process.env.DB_SECRET_KEY, {expiresIn: '1h'});
}

async function isValidToken(req) {
    return new Promise(function(resolve, reject) {
        if(req.headers['access-token']) {
            jwt.verify(req.headers['access-token'], process.env.DB_SECRET_KEY, function(err, decoded) {
                if(err) {
                   return reject(new Error("unauthorized"));
                } 
    
                return resolve(decoded.id);
            });
        }

        return reject(new Error("unauthorized"));
    });
}

function isValidPassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
}

// function authApi(req, res, callBack) {
//     isValidToken(req)
//     .then(id => {
//         callBack(id);
//     })
//     .catch(err => {
//         res.status(401);        
//     }); 
// }

module.exports = {
    getHashPassword,
    getToken,
    isValidPassword,
    isValidToken
};