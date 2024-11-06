"use strict";

const Decimal = require("decimal.js");
const Decimal8 = Decimal.clone({ precision:8, rounding:8 });

const btcFun = require("./btcFun.js");

const blockRewardEras = [ new Decimal8(15) ];
for (let i = 1; i <= 5; i++) {
    let previous = blockRewardEras[i - 1];
    blockRewardEras.push(new Decimal8(previous).dividedBy(2));
}

const currencyUnits = [
    {
        type:"native",
        name:"AZC",
        multiplier:1,
        default:true,
        values:["AZC"],
        decimalPlaces:8
    },
    {
        type:"native",
        name:"SAGZ",
        multiplier:100000000,
        values:["SAGZ", "Saguaros"],
        decimalPlaces:0
    }
];

module.exports = {
    name:"AZ Money",
    ticker:"SAGZ",
    logoUrlsByNetwork:{
        "micro":"./img/network-micronet/logo.svg",
    },
    coinIconUrlsByNetwork:{
        "micro":"./img/network-micronet/coin-icon.svg",
    },
    coinColorsByNetwork: {
        "micro": "#CE5C17",
    },
    siteTitlesByNetwork: {
        "micro":"AZ Block Explorer",
    },
    demoSiteUrlsByNetwork: {
        "micro": "https://bitcoinexplorer.org",
    },
    knownTransactionsByNetwork: {
        "micro": "09f64601660ac8fc63fff27695643292d81a015749bd787fa10a407ad6afed95",
    },
    miningPoolsConfigUrls:[
        //"https://raw.githubusercontent.com/btc21/Bitcoin-Known-Miners/master/miners.json",
        //"https://raw.githubusercontent.com/bitcoin-data/mining-pools/generated/pools.json",
        //"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json",
        //"https://raw.githubusercontent.com/blockchain/Blockchain-Known-Pools/master/pools.json"
    ],
    maxBlockWeight: 100000,
    maxBlockSize: 25000,
    minTxBytes: 166, // ref: https://en.bitcoin.it/wiki/Maximum_transaction_rate
    minTxWeight: 166 * 4, // hack
    difficultyAdjustmentBlockCount: 1440,
    maxSupplyByNetwork: {
        "micro": new Decimal(20999817.31308491) // ref: https://bitcoin.stackexchange.com/a/38998
    },
    targetBlockTimeSeconds: 120,
    targetBlockTimeMinutes: 2,
    currencyUnits:currencyUnits,
    currencyUnitsByName:{"AZC":currencyUnits[0], "azc":currencyUnits[0], "SAGZ":currencyUnits[1], "sagz":currencyUnits[1]},
    baseCurrencyUnit:currencyUnits[1],
    defaultCurrencyUnit:currencyUnits[0],
    feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],

    halvingBlockIntervalsByNetwork: {
        "micro": 262800
    },

    terminalHalvingCountByNetwork: {
        "micro": 4
    },

    // used for supply estimates that don't need full gettxoutset accuracy
    coinSupplyCheckpointsByNetwork: {
        "micro": [ 450000, new Decimal(5346000.00) ]
    },

    utxoSetCheckpointsByNetwork: {
        // this includes values from running gettxoutsetinfo with both "muhash" and "hash_serialized_2" params
            // btc gettxoutsetinfo "muhash"; echo ""; btc gettxoutsetinfo "hash_serialized_2" # "lastUpdated" set to the time of the last block
        "micro": {
            // "muhash"
            "height": 457931,
            "bestblock": "0000000000000259ea130ff1c97afee86b7cc3a83f3a1a6e9f006eaef763ab5b",
            "txouts": 126922,
            "bogosize": 9138384,
            "muhash": "0f8a2c68f7eab170938dacad89a0d797b8c524ea462017312ef21e131e93a82b",
            "total_amount": "5405475.00000000",
            "total_unspendable_amount": "0.00000000",

            // "hash_serialized_2"
            "transactions": 126558,
            "disk_size": 9351946,
            "hash_serialized_2": "56522185b83b0418c68980f699d2d50973f2482ba17b7a9214c461523c7a5a1d",

            "lastUpdated": 1730742371958
        }
    },

    genesisBlockHashesByNetwork:{
        "micro": "00000000b00ff40d0f986a2314bbacbc003743b4b7062c6221b08256edc1ae94",
    },
    genesisCoinbaseTransactionIdsByNetwork: {
        "micro": "b9ed7f5a0f23a5063818064eb28979ca1a22fdbc38fbeb3726f759d83e82a69a",
    },
    // "hex", "size", "vsize", "vin:" were left with bitcoin's data as well as "vout:"
    genesisCoinbaseTransactionsByNetwork:{
        "micro": {
            "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0804ffff001d02fd04ffffffff0100f2052a01000000434104f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446aac00000000",
            "txid": "b9ed7f5a0f23a5063818064eb28979ca1a22fdbc38fbeb3726f759d83e82a69a",
            "hash": "b9ed7f5a0f23a5063818064eb28979ca1a22fdbc38fbeb3726f759d83e82a69a",
            "size": 204,
            "vsize": 204,
            "version": 1,
            "confirmations":457942,
            "vin": [
                {
                    "coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
                    "sequence": 4294967295
                }
            ],
            "vout": [
                {
                    "value": 15,
                    "n": 0,
                    "scriptPubKey": {
                        "asm": "04f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446a OP_CHECKSIG",
                        "hex": "4104f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446aac",
                        "reqSigs": 1,
                        "type": "pubkey",
                        "addresses": [
                            "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                        ]
                    }
                }
            ],
            "blockhash": "00000000b00ff40d0f986a2314bbacbc003743b4b7062c6221b08256edc1ae94",
            "time": 1676412978,
            "blocktime": 1676412978
        }
    },
    genesisBlockStatsByNetwork:{
        "micro": {
            "avgfee": 0,
            "avgfeerate": 0,
            "avgtxsize": 0,
            "blockhash": "00000000b00ff40d0f986a2314bbacbc003743b4b7062c6221b08256edc1ae94",
            "feerate_percentiles": [
                0,
                0,
                0,
                0,
                0
            ],
            "height": 0,
            "ins": 0,
            "maxfee": 0,
            "maxfeerate": 0,
            "maxtxsize": 0,
            "medianfee": 0,
            "mediantime": 1676412978,
            "mediantxsize": 0,
            "minfee": 0,
            "minfeerate": 0,
            "mintxsize": 0,
            "outs": 1,
            "subsidy": 1500000000,
            "swtotal_size": 0,
            "swtotal_weight": 0,
            "swtxs": 0,
            "time": 1676412978,
            "total_out": 0,
            "total_size": 0,
            "total_weight": 0,
            "totalfee": 0,
            "txs": 1,
            "utxo_increase": 1,
            "utxo_size_inc": 117
        }
    },
    testData: {
        txDisplayTestList: {
            "b6914d1ebd8e4db6259b1ddaea750c70d8b05bde7d5a42db6cb680d68016346f" : {
                blockHeight: 456515, blockHash: "00000000000001c19b50fe65f44308c62d31782954a596cfacac27be56a7fedb"
            },
            "7d7535192eab38b5c3ce8a9d55afca0cfd1ef21d256c11e192adbb915ec9b3f9" : {
                blockHeight: 457942, blockHash: "000000000000008fa7fbe5c7866649d2da67bb232047dc319556486eee90ea7b"
            }
        }
    },
    genesisCoinbaseOutputAddressScripthash:"8b01df4e368ea28f8dc0423bcf7a4923e3a12d307c875e47a0cfbf90b5c39161",
    historicalData: btcFun.items,
    exchangeRateData:{
        jsonUrl:"https://api.coindesk.com/v1/bpi/currentprice.json",
        responseBodySelectorFunction:function(responseBody) {
            //console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

            var exchangedCurrencies = ["USD", "GBP", "EUR"];

            if (responseBody.bpi) {
                var exchangeRates = {};

                for (var i = 0; i < exchangedCurrencies.length; i++) {
                    if (responseBody.bpi[exchangedCurrencies[i]]) {
                        exchangeRates[exchangedCurrencies[i].toLowerCase()] = responseBody.bpi[exchangedCurrencies[i]].rate_float;
                    }
                }

                return exchangeRates;
            }

            return null;
        }
    },
    goldExchangeRateData:{
        jsonUrl:"https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD",
        responseBodySelectorFunction:function(responseBody) {
            //console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

            if (responseBody[0].topo && responseBody[0].topo.platform == "MT5") {
                var prices = responseBody[0].spreadProfilePrices[0];

                return {
                    usd: prices.ask
                };
            }

            return null;
        }
    },
    blockRewardFunction:function(blockHeight, chain) {
        let halvingBlockInterval = 262800;
        let index = Math.floor(blockHeight / halvingBlockInterval);

        return blockRewardEras[index];
    }
};