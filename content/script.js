function init() {
    $('.search_button').click(onSearch);
    $('#card_name').keypress(function (e) {
        if (e.which == 13) {
            onSearch();
            return false; 
        }
    });
}

function searchResults(data) {
    var body = $('tbody');
    body.empty();
    for(var i = 0; i < data.length; i++) {
        var row = $('<tr>');
        
        var name_td = $('<td>');
        var name = $('<a>', {href: data[i].url, target: '_blank', text: data[i].name});
        name_td.append(name);
        row.append(name_td);
        
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
    $('.loader').css('display', 'none');
}

function onSearch() {
    $('.products').css('visibility', 'hidden');
    $('.loader').css('display', 'inline');
    var name = $('#card_name').val();
    $.ajax({
        url: '/getPrices?card=' + name,
        success: searchResults
    });
}

$(document).ready(function() {
    init();
});