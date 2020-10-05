const query = require("./dbQuery");

const authUtil = require("../utils/authUtil");

const userService = {
    getUser: async function(email) {
        return query(`
            select user_name, email 
            from user 
            where email="${email}"
        `);
    },
    isUserExist: async function(email) {
        return query(`
            select id 
            from user
            where email="${email}"
        `);
    },
    addUser: async function(user) {
        const existUser = await this.isUserExist(user.email);

        if(!(existUser && existUser.id)) {
            user.password = await authUtil.getHashPassword(user.password);

            return query(`
                insert into user(user_name, password, email) 
                values("${user.name}", "${user.password}", "${user.email}")
            `);
        }
        
        return Promise.reject(new Error("User is already registered."));
    },
    getIdAndPassword: async function(email) {
        return query(`
            select id, password 
            from user 
            where email="${email}"
        `);
    },
    authenticate: async function(login) {
        const userInfo = await this.getIdAndPassword(login.email);
        
        if(userInfo) {
            if(authUtil.isValidPassword(login.password, userInfo.password)) {
                const token = await authUtil.getToken(userInfo);
                return Promise.resolve(token);
            }
            else {
                return Promise.reject(new Error("Invalid Password"));
            }
        } else {
            return Promise.reject(new Error("Invalid User"));
        } 
    }
};


module.exports = userService;