const query = require("./dbQuery");

const productService = {
    getProducts: async function(params) {
        return query(`
            select id, title from products 
            where user_id = ${params.userId}
            LIMIT ${params.size || 20} OFFSET ${params.offset || 0}
        `, true);
    },
    getProduct: async function(id) {
        return query(`
            select id, title, description from products
            where id = ${id}
        `);
    },
    addProduct: async function(product) {
        return query(`
            insert into products(title, description, user_id)
            values("${product.title}", "${product.description}", "${product.userId}")
        `);
    },
    deleteProducts: async function(userId, ids) {
        // console.log(ids);

        return query(`
            delete from products 
            WHERE id in (${ids}) and user_id = ${userId}
        `);
    },
};

module.exports = productService;