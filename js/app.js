$(document).ready( function() {
	$('#searchButton').on('click', function (event) {
	    event.preventDefault();
	    var keyword = $('#ingredient').val();
	    var cuisine = $('#cuisine-name').val();
	    recipeValidation(keyword,cuisine);
	});
});

var recipeValidation = function(keyword,cuisine) {
	if ((keyword == '') && (cuisine == null)) {
	   	alert('Please enter something in the text box and try again!');
	    $('.recipe-details').html('');
	    return false;
	} else {
		getRecipe(keyword,cuisine);
	}
}

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
}

// takes a string of semi-colon separated tags to be searched
// for on StackOverflow
var getRecipe = function(keyword,cuisine) {
	
	var result = $.ajax({
		url: "http://api.yummly.com/v1/api/recipes?_app_id=6d9e22ab&_app_key=e4270a20949b90bf9cca1017d935f12b&q=" + keyword + "&allowedCuisine[]=cuisine^cuisine-" + cuisine + "&requirePictures=true",
		dataType: "jsonp",
		type: "GET"
		})
	.done(function(result){
		$('.recipe-details').html('');
		$.each(result.matches, function(i, matches) {
			var recipe = '<li><div class="recipe-image"><img src="' +
							matches.imageUrlsBySize[90] + '" alt="Recipe image" width="170"></div><div class="recipe-description"><p>' +
							matches.sourceDisplayName + '</p><p><a target="_blank" href=https://www.yummly.com/recipe/' +
							matches.id + ' >' + matches.recipeName + '</a></p><p>Cooking time: ' + 
							matches.totalTimeInSeconds/60 + ' minutes</p><p>Rating: ' + 
							matches.rating + '</p></div></li>';
			$('.recipe-details').append(recipe);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
}

//1 - Create the Allergy Dropdown in the HTML
//2 - match the option tags to what the API Docs lists as the possibly allowedAlergen[]'s
//3 - create the JS variable that grabs the .val() from the dropdown
//4 - pass that variable as a parameter to your other functions
//5 - adjust the functions to accept that parameter
//6 - add the allowedAllergy[] portion to the API url and concatenate your variable in

	// for allergy
		if ($('input[name=allergy]:checked').length > 0){
			console.log($('input[name=allergy]:checked'));
			var allergyArray = [];
			var allergy = $('input[name=allergy]:checked');
			$.each(allergy, function(key, value){
				allergyArray.push(value['value']);
			})
			if (jQuery.inArray( "Wheat", allergyArray ) >= 0){
				url += '&allowedAllergy[]=392^Wheat-Free'
			}
			if (jQuery.inArray( "Gluten", allergyArray ) >= 0){
				url += '&allowedAllergy[]=393^Gluten-Free'
			}
			if (jQuery.inArray( "Peanut", allergyArray ) >= 0){
				url += '&allowedAllergy[]=394^Peanut-Free'
			}
			if (jQuery.inArray( "Tree", allergyArray ) >= 0){
				url += '&allowedAllergy[]=395^Tree Nut-Free'
			}
			if (jQuery.inArray( "Dairy", allergyArray ) >= 0){
				url += '&allowedAllergy[]=396^Dairy-Free'
			}
			if (jQuery.inArray( "Egg", allergyArray ) >= 0){
				url += '&allowedAllergy[]=397^Egg-Free'
			}
			if (jQuery.inArray( "Seafood", allergyArray ) >= 0){
				url += '&allowedAllergy[]=398^Seafood-Free'
			}
			if (jQuery.inArray( "Sesame", allergyArray ) >= 0){
				url += '&allowedAllergy[]=399^Sesame-Free'
			}
			if (jQuery.inArray( "Soy", allergyArray ) >= 0){
				url += '&allowedAllergy[]=400^Soy-Free'
			}
			if (jQuery.inArray( "Sulfite", allergyArray ) >= 0){
				url += '&allowedAllergy[]=401^Sulfite-Free'
			}	
		}
