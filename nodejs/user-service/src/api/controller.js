'use strict';

const properties = require('../../package.json')
//var distance = require('../service/distance');

const user1 = {
    id: 1,
    username: "frank.rittinger",
    firstName: "Frank",
    lastName: "Rittinger",
    email: "frank@schnegg.net",
    password: "xxx",
    userStatus: "approved"
}


const controllers = {
    about: function(req, res) {
        const aboutInfo = {
            name: properties.name,
            version: properties.version
        }
        res.json(aboutInfo);
    },
    createUser: function(req, res) {
        console.log(req.body);
        res.json(req.body);
    },
    getUser: function(req, res) {
        res.json(user1);
    },
    deleteUser: function(req, res) {
        res.send(req.params)
    },
    updateUser: function(req, res) {
        console.log(req.body);
        res.json(req.body);
    },
    // get_distance: function(req, res) {
    //     distance.find(req, res, function(err, dist) {
    //         if (err)
    //             res.send(err);
    //         res.json(dist);
    //     });
    // },
};

module.exports = controllers;
