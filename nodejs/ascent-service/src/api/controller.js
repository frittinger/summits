'use strict';

const request = require('request');
const properties = require('../../package.json')
//var distance = require('../service/distance');

const ascentSki = {
    id: 1,
    summitId: 2,
    userId: 2,
    ascentDate: "2019-04-01",
    status: "success",
    tourType: "ski"
}
const ascentHike = {
    id: 1,
    summitId: 1,
    userId: 2,
    ascentDate: "2019-08-01",
    status: "success",
    tourType: "hike"
}

const controllers = {
    about: function(req, res) {
        const aboutInfo = {
            name: properties.name,
            version: properties.version
        }
        res.json(aboutInfo);
    },
    createAscent: function(req, res) {
        console.log(req.body);
        res.json(req.body);
    },
    getAscent: function(req, res) {
        res.json(ascentSki);
    },
    deleteAscent: function(req, res) {
        res.send(req.params)
    },
    getAscentsByUser: function(req, res) {
        request('http://localhost:3002/user/frank.rittinger', { json: true }, (err, innerRes, body) => {
            if (!err && innerRes.statusCode == 200) {
                console.log('# response status: ' + innerRes.statusCode);
                console.log('# Ascent Service: email=%s', body.email);
                res.json([body.username, ascentSki, ascentHike]);

            } else {
                console.log(err);
                res.sendStatus(500);
            }
        });
    },
    getAscentsBySummit: function(req, res) {
        res.json(ascentSki);
    }
    // get_distance: function(req, res) {
    //     distance.find(req, res, function(err, dist) {
    //         if (err)
    //             res.send(err);
    //         res.json(dist);
    //     });
    // },
};

module.exports = controllers;
