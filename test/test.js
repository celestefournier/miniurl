var chai = require('chai'),
    should = chai.should(),
    chaiHttp = require('chai-http'),
    server = 'http://localhost:3000';

chai.use(chaiHttp);

describe('PUT /create', () => {
  it('Error when trying to create a shortener without URL', (done) => {
    chai.request(server)
    .put('/create')
    .end((err, res) => {
      should.exist(res.body);
      res.body.should.have.property('message');
      res.body.message.should.have.equal('URL must be defined!');
      done();
    });
  });
  it('Create a shortener without custom alias', (done) => {
    chai.request(server)
    .put('/create')
    .query({url: "http://www.test.com"})
    .end((err, res) => {
      should.exist(res.body);
      res.body.should.have.property('url');
      res.body.url.should.have.equal('http://www.test.com');
      res.body.should.have.property('alias');
      res.body.alias.should.to.be.a('string');
      done();
    });
  });
  it('Create a shortener with custom alias', (done) => {
    chai.request(server)
    .put('/create')
    .query({url: "http://www.test.com", alias:"test"})
    .end((err, res) => {
      should.exist(res.body);
      res.body.should.have.property('url');
      res.body.url.should.have.equal('http://www.test.com');
      res.body.should.have.property('alias');
      res.body.alias.should.have.equal('test');
      done();
    }); 
  });
  it('Error when trying to use an existing alias', (done) => {
    chai.request(server)
    .put('/create')
    .query({url:'http://www.test.com', alias: "test"})
    .end((err, res) => {
      should.exist(res.body);
      res.body.should.have.property('message');
      res.body.message.should.have.equal('This alias is already in use.');
      done();
    });
  });
});

describe('GET /:alias', () => {
  it('Get site by alias', (done) => {
    chai.request(server)
    .get('/123abc')
    .end((err, res) => {
      should.exist(res.body);
      should.exist(res.redirects);
      res.redirects.should.be.an('Array');
      res.redirects.should.not.have.lengthOf(0);
      done();
    });
  });
  it("Error when alias doesn't exist", (done) => {
    chai.request(server)
    .get('/wrong-alias')
    .end((err, res) => {
      should.exist(res.body);
      res.body.should.have.property('message');
      res.body.message.should.have.equal('Alias not found.');
      done();
    });
  });
});

describe('GET /top-urls', () => {
  it('Get top 10 URLs', (done) => {
    chai.request(server)
    .get('/top-urls')
    .end((err, res) => {
      should.exist(res.body);
      res.body[0].should.have.property("_id");
      res.body[0].should.have.property("url");
      done();
    });
  });
});