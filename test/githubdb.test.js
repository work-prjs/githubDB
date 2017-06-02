/* eslint-disable no-console, no-unused-expressions, no-unused-vars */
import chai from 'chai';
import spies from 'chai-spies';
import assert from 'assert';
import chaiAsPromised from 'chai-as-promised';

import users from './db/users.json';
import GithubDB from '../lib/githubdb';

chai.use(chaiAsPromised);

const options = {
  owner: 'cibc-api',
  repo: 'marketplace-admin',
  path: 'users.json'
};

const githubDB = new GithubDB(options);
const expect = chai.expect;
const should = chai.should();

const personalAccessToken = process.env.TOKEN;

describe('githubDB module', () => {

  it('should failed authentication if not credentials are provided', (done) => {
    expect(githubDB.auth()).to.be.false;
    done();
  });

  it('should return authenticated client', (done) => {
    expect(githubDB.auth(personalAccessToken)).to.be.true;
    done();
  });

  it('should return the reference of the connected path', (done) => {
    expect(githubDB.connectToRepo()).eventually.to.be.an('object').notify(done);
  });

  it('should save information passed', (done) => {
    expect(githubDB.save(JSON.stringify(users))).eventually.to.be.an('object').notify(done);
  });

  it('should find all data if no query passed', (done) => {
    expect(githubDB.find()).eventually.to.contain('gonzalo').notify(done);
  });

  it('should find all object based on query', (done) => {
    expect(githubDB.find({name: 'Eric Broda'})).eventually.to.be.an('array').notify(done);
  })

  it('should find one object based on query', (done) => {
    expect(githubDB.findOne({name: 'Eric Broda'})).eventually.to.be.an('object').notify(done);
  })

  it('should only delete record from query', (done) => {
    expect(githubDB.remove({name: 'Gonzalo Vazquez'})).eventually.to.not.contain('gonzalo').notify(done);
  });

  it('should delete a file if no query is passed', (done) => {
    expect(githubDB.remove()).eventually.to.be.true.notify(done);
  });


  /**
   * @todo - Make this work.
   */
  // it('should return false if file is not found', (done) => {
  //   expect(githubDB.remove()).eventually.to.be.false.notify(done);
  // });

});
/* eslint-disable no-console, no-unused-expressions, no-unused-vars */