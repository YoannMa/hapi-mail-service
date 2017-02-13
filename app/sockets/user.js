'use strict';

const Joi  = require('joi');
const user = require('../schemas/user');

module.exports.register = (server, options, next) => {
    server.route(
        [
            {
                method : 'POST',
                path   : '/user/createMail',
                config : {
                    description : 'todo',
                    tags        : [ 'api' ],
                    plugins     : {
                        'hapi-io' : 'user/createMail'
                    },
                    handler     : (request, reply) => {
                        let socket = request.plugins[ 'hapi-io' ].socket;
                        
                        if (socket) {
                            // todo
                        }
                        
                        request.server.mailer.sendCreationDataInfo(request.payload).then(() => {
                            reply({ msg : 'ok' });
                        }).catch((err) => {
                            if (err) {
                                request.server.log('error', `${ err.message } : Couldn\'t send the mail to the user ${ JSON.stringify(request.payload) }`);
                            }
                            reply({ msg : 'ko' });
                        });
                    },
                    validate    : {
                        payload : user.get([ 'firstname', 'lastname', 'login', 'password' ])
                    }
                }
            },
            {
                method : 'POST',
                path   : '/user/changePassword',
                config : {
                    description : 'todo',
                    tags        : [ 'api' ],
                    plugins     : {
                        'hapi-io' : 'user/changePassword'
                    },
                    handler     : (request, reply) => {
                        request.server.mailer.sendNewPasswordInfo(request.payload).then(() => {
                            reply({ msg : 'ok' });
                        }).catch((err) => {
                            if (err) {
                                request.server.log('error', `${ err.message } : Couldn\'t send the mail to the user ${ JSON.stringify(request.payload) }`);
                            }
                            reply({ msg : 'ok' });
                        });
                    },
                    validate    : {
                        payload :  user.get([ 'firstname', 'lastname', 'password' ])
                    }
                }
            },
            {
                method : 'POST',
                path   : '/user/updateUser',
                config : {
                    description : 'todo',
                    tags        : [ 'api' ],
                    plugins     : {
                        'hapi-io' : 'user/updateUser'
                    },
                    handler     : (request, reply) => {
                        let socket = request.plugins[ 'hapi-io' ].socket;
                        
                        if (socket) {
                            // todo
                        }
                        
                        request.server.mailer.sendUpdatedDataInfo(request.payload).then(() => {
                            reply({ msg : 'ok' });
                        }).catch((err) => {
                            if (err) {
                                request.server.log('error', `${ err.message } : Couldn\'t send the mail to the user ${ JSON.stringify(request.payload) }`);
                            }
                            reply({ msg : 'ko' });
                        });
                    },
                    validate    : {
                        payload :  user.get([ 'firstname', 'lastname' ])
                    }
                }
            }
        ]
    );
    next();
};

module.exports.register.attributes = {
    name : 'user-sockets'
};