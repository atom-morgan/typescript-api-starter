"use strict";
process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
global.chai = chai;
global.should = global.chai.should();
global.chaiHttp = chaiHttp;
chai.use(chaiHttp);
