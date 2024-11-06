"use strict";

const azc = require("./coins/azc.js");
const btc = require("./coins/btc.js");

module.exports = {
    "AZC": azc,
	"BTC": btc,

    "coins":["AZC", "BTC"]
};