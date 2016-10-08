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

  beforeEach((done) => {
    Utils.createUserAndGetToken()
    .then((res) => {
      token = res.token;
      done();
    });
  });

  it('should call next() and set the decoded property on req with a valid token', (done) => {
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
      done();
    })
  });

  it('should return an error if no token is provided', (done) => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users'
    });

    middleware.isAuthenticated(req, res, next)
    .catch(() => {
      next.should.not.have.been.called();
      res.statusCode.should.eql(403);
      done();
    })
  });

  it('should return an error if an invalid token is provided', (done) => {
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
      done();
    });
  });
});