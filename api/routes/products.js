const express = require("express");
const productService = require("../services/products");
const authUtil = require("../utils/authUtil");

const router = express.Router();

router.get("/", function(req, res) {
    authUtil.isValidToken(req)
    .then(id => {
        productService.getProducts({userId: id, ...(req.body || {})})
        .then(products => {
            res.json(products);
        })
        .catch(err => {
           res.status(400).send(); 
        });
    })
    .catch(err => {
        res.status(401).json({ reason: err.message });
    });
});

router.get("/:id", function(req, res) {
    authUtil.isValidToken(req)
    .then(id => {
        productService.getProduct(req.params.id)
        .then(product => {
            res.json(product);
        })
        .catch(err => {
           res.status(404).send(); 
        });
    })
    .catch(err => {
        res.status(401).json({ reason: err.message });
    });
});

router.post("/", function(req, res) {
    authUtil.isValidToken(req)
    .then(id => {
        productService.addProduct({...req.body, userId: id})
        .then(data => {
            res.status(201).send({id: data});
        })
        .catch(err => {
           res.status(400).send(); 
        });
    })
    .catch(err => {
        res.status(401).json({ reason: err.message });
    });
});

router.delete("/:ids", function(req, res) {
    authUtil.isValidToken(req)
    .then(id => {
        productService.deleteProducts(id, req.params.ids)
        .then(data => {
            res.status(204).send();
        })
        .catch(err => {
           res.status(400).send(); 
        });
    })
    .catch(err => {
        res.status(401).json({ reason: err.message });
    });
});

module.exports = router;