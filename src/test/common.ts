process.env.NODE_ENV = 'test';

import chai = require('chai');
import chaiHttp = require('chai-http');
import spies = require('chai-spies');
import Promise = require('bluebird');

global.chai = chai;
global.expect = global.chai.expect;
global.should = global.chai.should();
global.chaiHttp = chaiHttp;
global.Promise = Promise;

console.log('promise ', global.Promise);

chai.use(chaiHttp);
chai.use(spies);