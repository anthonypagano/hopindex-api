'use strict';
exports.API_ORIGIN = 'https://dry-depths-20265.herokuapp.com';
exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost:27017/react-capstone';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/react-capstone-test';
exports.PORT = process.env.PORT || 8080;