process.env.NODE_ENV = 'test';

import chai = require('chai');
import chaiHttp = require('chai-http');
import spies = require('chai-spies');

global.chai = chai;
global.expect = global.chai.expect;
global.should = global.chai.should();
global.chaiHttp = chaiHttp;

chai.use(chaiHttp);
chai.use(spies);