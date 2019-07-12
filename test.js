const {expect} = require('chai');
const {getFirstNonFalsyValue, getAnObject, callApi, postToApi} = require('.');

describe('The tests', () => {

    let server;

    before(async () => {

        const express = require('express');
        const app = express();
        app.use(require('body-parser').json());
        app.get('/test1', (req, resp) => {
            resp.status(200).send('result');
        });
        app.post('/test2', (req, resp) => {
            resp.status(200).send(req.body);
        });
        server = app.listen(9999);
    });

    after(() => {
        server.close()
    });

    it('should get first non falsy value', () => {

        expect(getFirstNonFalsyValue(0, false, '', 'dog')).to.equal('dog');
        expect(getFirstNonFalsyValue(1, true, '', 'dog')).to.equal(1);
        expect(getFirstNonFalsyValue(0, true, '', 'dog')).to.equal(true);
        expect(getFirstNonFalsyValue(0, false, 'fish', 'dog')).to.equal('fish');
    });

    it('should get an object', () => {

        const result = getAnObject();
        expect(result.name).to.equal('Saf');
        expect(result.city).to.equal('Atlanta');
        expect(result.stuff.length).to.equal(3);
        expect(result.stuff).to.have.members([1, 5, 99]);
        expect(result.doIt()).to.equal('it');
    });

    it('should call the api', async () => {

        const answer = await callApi('http://localhost:9999/test1');
        expect(answer).to.equal('result');
    });

    it('should post data to the api', async () => {

        const result = await postToApi('http://localhost:9999/test2', {
            test: "foo"
        });
        expect(result.test).to.equal('foo');
    });
});