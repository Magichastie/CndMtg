module.exports = {
    getPrices: getPrices
}
/*
var search = process.argv[2];
if(search == null) {
    console.log('Must supply a card to search for!');
    process.exit();
}

getPrices(search);
*/
function getPrices(search, callback) {
    var parser = require("./parsers");
    var async = require('async');
    var searches = [];

    var facetoface_search = 'http://www.facetofacegames.com/products/search?query=';
    searches.push({url: facetoface_search, parseFunc: parser.facetoface});

    var comichunter_search = 'http://comichunter.crystalcommerce.com/products/search?query=';
    searches.push({url: comichunter_search, parseFunc: parser.comichunter});

    var wizardtower_search = 'http://www.kanatacg.com/products/search?query=';
    searches.push({url: wizardtower_search, parseFunc: parser.wizardtower});

    var gamekeeper_search = 'http://www.gamekeeperonline.com/products/search?query=';
    searches.push({url: gamekeeper_search, parseFunc: parser.gamekeeper});

    var magicstronghold_search = 'http://www.magicstronghold.com/products/search?q='
    searches.push({url: magicstronghold_search,parseFunc: parser.magicstronghold});

    var gamersspot_search = 'http://www.gamersspot.ca/products/search?q=';
    searches.push({url: gamersspot_search, parseFunc: parser.gamersspot});

    var request = require('request');
    var products = [];

    function getProducts(item, callback) {
        request.get(item.url + search, function(err, resp, body) {
            var res = item.parseFunc(body, item.url, search);
            products = products.concat(res);
            callback();
        });
    };

    function outputResults(err) {
        products.sort(function(a, b) {
            if(a.quantity == 0) {
                if(b.quantity == 0) {
                    return a.price - b.price;
                }
                return 1;
            }
            if(b.quantity == 0) {
                return -1;
            }
            return a.price - b.price
        });
        
        callback(products);
        
        /*
        for(var i = 0; i < products.length; i++)
        {
            console.log([products[i].name, products[i].set, products[i].condition,
                products[i].price, products[i].quantity].join(', '));
        }
        */
    }

    async.each(searches, getProducts, outputResults);
}

/*
request.get('http://www.facetofacegames.com/products/search?query=' + search, function(err, resp, body) {
    parser.facetoface(body);
});
*/


