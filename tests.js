#!/usr/bin/env node
'use strict';

var chai = require('chai');
var expect = chai.expect;

var machine = require('./machine.js');


describe('machine', function() {
  it('getChange() should handle change properly', function() {

    var coins = [
      [0.25, 100],
      [0.10, 100],
      [0.05, 100],
      [0.01, 100]
    ];


    expect(machine.getChange(1, coins)).to.deep.equal([[0.25,4]]);


    expect(coins).to.deep.equal([
      [0.25, 96],
      [0.10, 100],
      [0.05, 100],
      [0.01, 100]
    ]);


    expect(machine.getChange(20, coins)).to.deep.equal([[0.25,80]]);


    expect(coins).to.deep.equal([
      [0.25, 16],
      [0.10, 100],
      [0.05, 100],
      [0.01, 100]
    ]);


    expect(machine.getChange(5, coins)).to.deep.equal([[0.25,16], [0.1,10]]);



    expect(coins).to.deep.equal([
      [0.25, 0],
      [0.10, 90],
      [0.05, 100],
      [0.01, 100]
    ]);

  });
});
