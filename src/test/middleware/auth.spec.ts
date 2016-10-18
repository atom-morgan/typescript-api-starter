import User from '../../models/user';
import middleware from '../../middleware/auth';
import * as httpMocks from 'node-mocks-http';
import Utils from '../utils';

describe('Auth middleware', () => {
  let req, res, next, token;

  beforeEach((done) => {
    res = httpMocks.createResponse();
    next = chai.spy();
    done();
  });

  before(() => {
    return Utils.getUserAndToken().spread((user, session) => {
      token = session.token;
    });
  });

  it('should call next() and set the decoded property on req with a valid token', () => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users',
      headers: {
        'Authorization': token
      }
    });

    middleware.isAuthenticated(req, res, next)
    .then(() => {
      next.should.have.been.called();
      req.should.have.property('decoded');
      req.decoded.should.have.property('username');
      req.decoded.should.have.property('iat');
      req.decoded.should.have.property('exp');
    });
  });

  it('should return an error if no token is provided', () => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users'
    });

    middleware.isAuthenticated(req, res, next)
    .catch(() => {
      next.should.not.have.been.called();
      res.statusCode.should.eql(403);
    });
  });

  it('should return an error if an invalid token is provided', () => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users',
      headers: {
        'Authorization': '123'
      }
    });

    middleware.isAuthenticated(req, res, next)
    .catch(() => {
      next.should.not.have.been.called();
      res.statusCode.should.eql(403);
    });
  });

  after(() => {
    return User.remove({});
  });
});
