const sinon = require('sinon');
const { should } = require('chai');

const calculateHypotenuse = require('../lib/calculateHypotenuse');

should();

describe('when the user calculates the hupotenuse', () => {
  it('should execute the callback passed as argument', () => {
    const callback = sinon.spy();
    calculateHypotenuse(3, 3, callback);
    callback.called.should.be.true;
  });
});
