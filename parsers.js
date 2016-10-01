var DEBUG = false;

module.exports = {
    facetoface: facetoface,
    comichunter: comichunter,
    wizardtower: facetoface,
    gamekeeper: gamekeeper,
    magicstronghold: magicstronghold,
    gamersspot: magicstronghold,
    tome2: tome2
}

var request = require('request');

function Product(url, vendor, price, quantity, condition, set, name) {
    this.url = url;
	this.vendor = vendor;
    this.price = price;
    this.quantity = quantity;
    this.condition = condition;
    this.set = set;
    this.name = name;
}

function getMatches(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }
  return matches;
}

function convertPriceTextToNumber(text_value) {
    if(text_value == null)
        return null;
    var pattern = /\d+\.\d+/;
    var num_match = text_value.match(pattern);
    if(num_match != null)
        return num_match[0];
    else 
        return null;
}

function convertQuantityTextToNumber(text_value) {
    if(text_value == null)
        return 0;
    var pattern = /\d+/;
    var quan_match = text_value.match(pattern);
    var num = null;
    if(quan_match != null)
        num = quan_match[0]
    return num != null ? num : 0;
}

function convertCondition(text_value) {
    return text_value.replace("Condition: ", '');
}

function facetoface(body, bundle, search) {
	var url = bundle.url;
	var vendor = bundle.vendor;
    var products = [];
    var cheerio = require('cheerio');
    $ = cheerio.load(body);
    
    var content_div = $('#content');
    var table_div = $('table', content_div).first();
    
    // each row will contain a version of the card (version = foil & set)
    var rows = table_div.children('tr');
    rows.each(function() {
        // the first cell is the card image
        $(this).children('td').first().remove();
        var cells = $(this).children('td');
        cells.each(function() {
            var current_cell = $(this).first();
            var name = current_cell.children('a').first().text();
            if(!new RegExp(search, 'i').test(name))
                return [];
            
            var set = current_cell.children('small').first().text();
            if(DEBUG) {
                console.log(set);
                console.log(name);
            }
            
            var product_table = current_cell.children('table').first();
            var condition_rows = product_table.children('tr');
            condition_rows.each(function() {
                var info = $(this).children('td');
                var condition = convertCondition($(info.get(0)).text().trim());
                var price = convertPriceTextToNumber($(info.get(1)).text().trim());
                var quantity = convertQuantityTextToNumber($(info.get(2)).text().trim());
                products.push(new Product(url + search, vendor, price, quantity, condition, set, name));
                if(DEBUG)
                    console.log([condition, price, quantity].join(', '));
            });
        });
        if(DEBUG)
            console.log('-----------------------');
    });
    return products;
}

function comichunter(body, bundle, search) {
	var url = bundle.url;
	var vendor = bundle.vendor;
    var products = [];
    var cheerio = require('cheerio');
    $ = cheerio.load(body);
    
    var content_div = $('#content');
    var table_div = $('table', content_div).first();
    
    // each row will contain a version of the card (version = foil & set)
    var rows = table_div.children('tr');
    rows.each(function() {
        // the first cell is the card image
        $(this).children('td').first().remove();
        var cells = $(this).children('td');
        cells.each(function() {
            var current_cell = $(this).first();
            var name = current_cell.children('a').first().text();
            if(!new RegExp(search, 'i').test(name))
                return [];
            if(DEBUG)
                console.log(name);
            
            var product_table = current_cell.children('table').first();
            var condition_rows = product_table.children('tr');
            condition_rows.each(function() {
                var info = $(this).children('td');
                var set = $($(info.get(0)).children('span').get(0)).text().trim();
                var condition = $($(info.get(0)).children('span').get(1)).text().trim();
                var price = convertPriceTextToNumber($(info.get(1)).text().trim());
                var quantity = convertQuantityTextToNumber($(info.get(2)).text().trim());
                products.push(new Product(url + search, vendor, price, quantity, condition, set, name));
                if(DEBUG)
                    console.log([set, condition, price, quantity].join(', '));
            });
        });
        if(DEBUG)
            console.log('-----------------------');
    });
    return products;
}

function gamekeeper(body, bundle, search) {
	var url = bundle.url;
	var vendor = bundle.vendor;
    var products = [];
    var cheerio = require('cheerio');
    $ = cheerio.load(body);
    
    var content_div = $('#childContent');
    var table_div = $('table', content_div).first();
    
    // each row will contain a version of the card (version = foil & set)
    var rows = table_div.children('tr');
    rows.each(function() {
        // the first cell is the card image
        $(this).children('td').first().remove();
        var cells = $(this).children('td');
        cells.each(function() {
            var current_cell = $(this).first();
            var name = current_cell.children('a').first().text();
            if(!new RegExp(search, 'i').test(name))
                return [];
            if(DEBUG)
                console.log(name);
            
            var product_table = current_cell.children('table').first();
            var condition_rows = product_table.children('tr');
            condition_rows.each(function() {
                var info = $(this).children('td');
                var set = $($(info.get(0)).children('span').get(0)).text().trim();
                var condition = $($(info.get(0)).children('span').get(1)).text().trim();
                var price = convertPriceTextToNumber($(info.get(1)).text().trim());
                var quantity = convertQuantityTextToNumber($(info.get(2)).text().trim());
                products.push(new Product(url + search, vendor, price, quantity, condition, set, name));
                if(DEBUG)
                    console.log([set, condition, price, quantity].join(', '));
            });
        });
        if(DEBUG)
            console.log('-----------------------');
    });
    return products;
}

function magicstronghold(body, bundle, search) {
	var url = bundle.url;
	var vendor = bundle.vendor;
    var products = [];
    var cheerio = require('cheerio');
    $ = cheerio.load(body);
    
    var list = $('ul.products');
    
    // each item will contain a version of the card (version = foil & set)
    var items = list.children('li');
    items.each(function () {
        var name = $('h4.name', this).text();
        if(!new RegExp(search, 'i').test(name))
            return [];
        var set = $('span.category', this).text();
        if(DEBUG) {
            console.log(name);
            console.log(set);
        }
        
        var conditions = $('div.variant-row.row', this);
        
        conditions.each(function () {
            var condition_full = $('span.variant-short-info', this).text();
            var condition_pattern = /([^,]*,[^,]*),\s*(\d+)/;
            var matches = condition_pattern.exec(condition_full);
            var condition = null;
            if(matches !== null) {
                condition = matches[1];
            }

            var price = convertPriceTextToNumber($('span.regular.price', this).text().trim());
            var quantity = null;
            if(matches != null) {
                quantity = convertQuantityTextToNumber(matches[2]);
            }
            
            if($(this).hasClass('no-stock')) {
                quantity = 0;
                condition = 'Not in stock';
            }
            
            products.push(new Product(url + search, vendor, price, quantity, condition, set, name));
            if(DEBUG)
                console.log([condition, price, quantity].join(', '));
        });
        if(DEBUG)
            console.log('-----------------------');
    });
    return products;
}

function tome2(body, bundle, search) {
	var url = bundle.url;
	var vendor = bundle.vendor;
    var products = [];
    var cheerio = require('cheerio');
    $ = cheerio.load(body);
    
    var list = $('ul.product-results');
    
   // each item will contain a version of the card (version = foil & set)
    var items = list.children('li');
    items.each(function () {
        var name = $('h4.title', this).text().trim();
        if(!new RegExp(search, 'i').test(name))
            return [];
        var set = $('span.cat-name', this).text();
        if(DEBUG) {
            console.log(name);
            console.log(set);
        }
        
        var conditions = $('div.variant-row.row', this);
        
        conditions.each(function () {
            
            var condition_full = $('span.variant-short-info', this).text().trim();
            var condition_pattern = /([^,]*,[^,]*),\s*(\d+)/;
            var matches = condition_pattern.exec(condition_full);
            var condition = null;
            if(matches !== null) {
                condition = matches[1];
            }

            var price = convertPriceTextToNumber($('span.regular.price', this).text().trim());
            var quantity = null;
            if(matches != null) {
                quantity = convertQuantityTextToNumber(matches[2]);
            }
            
            if($('span.no-stock', this).length !== 0) {
                quantity = 0;
                condition = 'Not in stock';
            }
            
            products.push(new Product(url + search, vendor, price, quantity, condition, set, name));
            if(DEBUG)
                console.log([condition, price, quantity].join(', '));
        });
        if(DEBUG)
            console.log('-----------------------');
    });
    return products;
}

function parsePage(to_parse) {
    var res_regex = /pagination[\s\S]*pagination/gm;
    var all_info_match = to_parse.match(res_regex);
    var all_info = all_info_match[0];

    function list_matches(reg, index) {
        index || (index = 0);
        var rtn = [];
        var match;
        while((match = reg.exec(all_info)) != null) {
            rtn.push(match[index]);
            console.log(match[index]);
        }
        return rtn;
    }

    var price_reg = /CAD\$ \d+\.\d+/g;
    var prices = list_matches(price_reg);

    var condition_reg = /(Condition: .*)<\/td>/g;
    var conditions = list_matches(condition_reg, 1);

    var quantity_reg = /x \d+/g;
    var quantities = list_matches(quantity_reg);
}