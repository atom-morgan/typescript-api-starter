import middleware from '../../middleware/auth';
import * as httpMocks from 'node-mocks-http';

describe('Auth middleware', () => {
  let req, res, next;

  beforeEach((done) => {
    res = httpMocks.createResponse();
    next = chai.spy();
    done();
  });

  it('should call next() and set the decoded property on req with a valid token', (done) => {
    //TODO change this to user+session utility method
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users',
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkYW0xIiwiaWF0IjoxNDc1MzUwNTA4LCJleHAiOjE0NzU0MzY5MDh9.NcTlsiMVWaIqV4horsqVy6AdoH5rqqIydlaeAk_7mOw'
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