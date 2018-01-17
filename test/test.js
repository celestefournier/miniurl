var chai = require('chai'),
    should = chai.should(),
    chaiHttp = require('chai-http'),
    server = 'http://localhost:3000'
    mongoose = require('mongoose'),
    shorturlModel = require('../app/models/shortener-model'),
    mongodb = require('../config/config.js');

chai.use(chaiHttp);

describe('PUT /create', () => {
  
  before(function(done) {

    mongoose.Promise = global.Promise;
    mongoose.connect(mongodb.db_host, { useMongoClient: true });  // Connect to MongoDB
  
    shorturlModel.remove({ url: 'http://www.test.com' }, function (err) {
      if (err) return console.error(err);
    });
  
    for (var i = 0; i < 10; i++) {
      let shortURL = new shorturlModel({
        alias: 'alias'+i, url: 'http://www.test.com', views: i
      })
      shortURL.save(function (err, shortURL) {
        if (err) return console.error(err);
      });
    }
    done();
  });
  
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
    .get('/alias0')
    .end((err, res) => {
      should.exist(res.body);
      should.exist(res.redirects);
      res.redirects.should.be.an('Array');
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
      res.body.should.not.have.lengthOf(0);
      res.body[0].should.have.property("_id");
      res.body[0].should.have.property("url");
      done();
    });
  });
});