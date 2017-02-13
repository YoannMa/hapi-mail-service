'use strict';

const _       = require('lodash');
const server  = require('./manifest/server');
const plugins = require('./manifest/plugins');
const models  = require('./manifest/models');
const routes  = require('./manifest/routes');
const sockets = require('./manifest/sockets');

module.exports = {
    server        : server.server,
    connections   : server.connections,
    registrations : _.union(plugins, models, routes, sockets)
};
