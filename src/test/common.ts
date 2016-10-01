process.env.NODE_ENV = 'test';

import chai = require('chai');
import chaiHttp = require('chai-http');

global.chai = chai;
global.should = global.chai.should();
global.chaiHttp = chaiHttp;

chai.use(chaiHttp);