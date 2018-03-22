const { expect, should } = require('chai');
const sinon = require('sinon');

should();

const rollDice = require('../lib/rollDice');

describe('When a customer rolls a dice', () => {
  it('should return an integer number', () => {
    expect(rollDice()).to.be.an('number');
  });

  it('should get a number below 7', () => {
    rollDice().should.be.below(7);
  });

  // 用来模拟单元测试失败的用例
  // it('should get a number bigger than 0', () => {
  //   rollDice().should.be.above(0);
  // });

  it('should not be null', () => {
    expect(rollDice()).to.not.be.null;
  });

  it('should not be undefined', () => {
    expect(rollDice()).to.not.be.undefined;
  });

  it('Math#random should be called with no arguments', () => {
    sinon.stub(Math, 'random');
    rollDice();
    console.log(Math.random.calledWith());
  });
});

after(() => {
  Math.random.restore();
});
