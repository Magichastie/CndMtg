function init() {
    $('.search_button').click(onSearch);
    $('#card_name').keypress(function (e) {
        if (e.which == 13) {
            onSearch();
            return false; 
        }
    });
    
    $('#card_name').focus();
}

function searchResults(data) {
    var body = $('tbody');
    body.empty();
    for(var i = 0; i < data.length; i++) {
        var row = $('<tr>');
        
        var name = $('<td>', {text: data[i].name});
        name.append(name);
        row.append(name);
		
		var vendor_td = $('<td>');
		var vendor = $('<a>', {href: data[i].url, target: '_blank', text: data[i].vendor});
		vendor_td.append(vendor);
		row.append(vendor_td)
        
        var set = $('<td>', {text: data[i].set});
        row.append(set);
        
        var condition = $('<td>', {text: data[i].condition});
        row.append(condition);
        
        var price = $('<td>', {text: data[i].price});
        row.append(price);
        
        var quantity = $('<td>', {text: data[i].quantity});
        row.append(quantity);
        
        body.append(row);
    }
    $('.products').css('visibility', 'visible');
    $('.spinner').css('display', 'none');
}

function onSearch() {
    $('#search_wrapper').removeClass('w3-display-middle');
    $('.products').css('visibility', 'hidden');
    $('.spinner').css('display', 'block');
    var name = $('#card_name').val();
    $.ajax({
        url: '/getPrices?card=' + name,
        success: searchResults
    });
}

$(document).ready(function() {
    init();
});
