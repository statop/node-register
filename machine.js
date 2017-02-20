#!/usr/bin/env node
'use strict';

var inquirer = require('inquirer');

var startNumCoins = 100;

var coins = [
  [0.25, startNumCoins],
  [0.10, startNumCoins],
  [0.05, startNumCoins],
  [0.01, startNumCoins]
];

function printCoins() {
  console.log("Coins:");
  coins.forEach(function(e) {
    console.log("  " + e[0].toFixed(2) + " - " + e[1]);
  });
  console.log(" ");
}

function printChange(change) {
  console.log("Change:");
  change.forEach(function(e) {
    console.log("  " + e[0].toFixed(2) + " - " + e[1]);
  });
  console.log(" ");
}

function getChange(bill, newCoins) {
  var curCoin = 0;

  var change = [];

  while (bill > 0) {

    while ((curCoin < newCoins.length) && ((newCoins[curCoin][1] <= 0) || (newCoins[curCoin][0] > bill))) {
      ++curCoin;
    }

    if (curCoin >= newCoins.length) {
      console.log("Cannot make change, not enough coins!");
      return null;
    }

    if ((change.length == 0) || (change[change.length - 1][0] != newCoins[curCoin][0])) {
      change.push([newCoins[curCoin][0], 0])
    }

    change[change.length - 1][1]++;
    newCoins[curCoin][1]--;

    bill -= newCoins[curCoin][0];

    bill = Number.parseFloat(bill.toFixed(2));

  }

  return change;
}

function loop() {
  printCoins();

  inquirer.prompt([    {
    type: "list",
    name: "bill",
    message: "Choose a Bill to Change",
    choices: ['1','2','5','10','20','50','100']
  }]).then(function (answers) {

    try {
      var bill = Number.parseFloat(answers.bill);

      var newCoins = JSON.parse(JSON.stringify(coins));

      var change = getChange(bill, newCoins);

      if (change) {
        coins = newCoins;
        printChange(change);
      }


    } catch (ex) {
      console.error(ex.stack);
    }

    var hasCoins = false;
    coins.forEach(function(e) {
      if (e[1] > 0) {
        hasCoins = true;
      }
    });

    if (hasCoins) {
      loop();
    } else {
      console.log("Out of coins, exiting.");
    }

  });

}


module.exports.getChange = getChange;
module.exports.loop = loop;

