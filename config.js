'use strict';
exports.API_ORIGIN = 'https://dry-depths-20265.herokuapp.com';
exports.CLIENT_ORIGIN = 'http://localhost:3000';
exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://apagano76:76apagano@ds121282.mlab.com:21282/react-capstone';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://apagano76:76apagano@ds229878.mlab.com:29878/react-capstone-test';
exports.PORT = process.env.PORT || 8080;