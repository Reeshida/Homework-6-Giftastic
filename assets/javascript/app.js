$(function(){
    populateButtons(searchArray,'searchButton','#buttonArea')
})

var searchArray=['Mercedes', 'Ford', 'BMW'];

function populateButtons(searchArray, classtoAdd, areaToAdd){
    $(areaToAdd).empty();
    for(var i=0; i<searchArray.length; i++){
        var a=$('<button>');
        a.addClass(classtoAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAdd).append(a);
    }
}
$(document).on('click','.searchButton', function(){
    var type= $(this).data('type');
    var queryURL= 'https://api.giphy.com/v1/gifs/search?q='+ type + '&api_key=NcJT0NxazQ4Iq85R9aK1geDtFOySMGDu&limit=5';
    // '&api_key=dc6zaTOxFJmzC&limit=10';

    
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response){
          $('#searches').empty();
          for(var i=0;i<response.data.length;i++){
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[i].rating;
            var p =$('<p>').text('Rating: '+rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height.url;
            var image = $('<img>');
            image.attr('src',still);
            image.attr('data-still',still);
            image.attr('data-animated',animated);
            image.attr('data-state','still');
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $('#searches').append(searchDiv);
          }
      })
})

$(document).on('click', '.searchImage', function(){
    var state= $(this).attr('data-state');
    if(state=='still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addSearch').on('click', function(){
    event.preventDefault();
    var newSearch= $('#search-input').eq(0).val();
    searchArray.push(newSearch);
    console.log(searchArray);
    populateButtons(searchArray, 'searchButton','#buttonArea');
    return false;
})