const express = require("express");
const userService = require("../services/users");
const authUtil = require("../utils/authUtil");

const router = express.Router();

router.get("/:email", (req, res) => {
    authUtil.isValidToken(req).then(id => {
        userService.getUser(req.params.email)
        .then(data => {
            if(data)
                res.json(data);
            else
                res.status(404).send();    
        })
        .catch(err => {
            res.status(404).json({ reason: err.message });  
        });
    })
    .catch(err => {
        res.status(401).json({ reason: err.message });  
    }); 
});

router.post("/", (req, res) => {
    const user =  { email: req.body.email, name: req.body.name, password: req.body.password };
    
    userService.addUser(user)
    .then(data => {
        res.status(201).send(data);
    }).catch(err => {
        console.log(err);
        res.status(400).json({ reason: err.message });
    });
});

router.post("/auth", (req, res) => {
    userService.authenticate(req.body)
    .then(token => {
        res.json({ token });
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({ reason: err.message });
    });
});


module.exports = router;