'use strict';

const controller = require('./controller');

module.exports = function(app) {
    app.get('/about', controller.about);
    app.post('/user', controller.createUser);
    app.route('/user/:username')
        .get(controller.getUser)
        .put(controller.updateUser)
        .delete(controller.deleteUser);
};
