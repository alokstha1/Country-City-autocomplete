<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places"></script>
<script>
  var country_input = /** @type {HTMLInputElement} */(
    document.getElementById('reg_field_user_country'));
  
  var city_input = /** @type {HTMLInputElement} */(
    document.getElementById('reg_field_user_city'));
  jQuery(city_input).prop('disabled', 'disabled');
  


  var autocomplete_country = new google.maps.places.Autocomplete(country_input);


  google.maps.event.addListener(autocomplete_country, 'place_changed', function() {

    var result = autocomplete_country.getPlace();
    if (!result.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    console.log(result); // take a look at this result object
    console.log(result.address_components); // a result has multiple address components

    var selected_country='';

    for(var i = 0; i < result.address_components.length; i += 1) {
      var addressObj = result.address_components[i];
      for(var j = 0; j < addressObj.types.length; j += 1) {
        if (addressObj.types[j] === 'country') {
          console.log(addressObj.types[j]); // confirm that this is 'country'
          console.log(addressObj.long_name); // confirm that this is the country name
          jQuery(country_input).attr('value',addressObj.long_name );
          selected_country = addressObj.short_name;
        }
      }
    }



    jQuery(city_input).removeAttr('disabled');

    var city_options = {
      types: ['(cities)'],
      componentRestrictions: {country: selected_country}
    };

    var autocomplete_city = new google.maps.places.Autocomplete(city_input, city_options);

    google.maps.event.addListener(autocomplete_city, 'place_changed', function() {

     var place = autocomplete_city.getPlace();

     for(var i = 0; i < place.address_components.length; i += 1) {
      var locObj = place.address_components[i];
      for(var j = 0; j < locObj.types.length; j += 1) {
        console.log(locObj.types[j]+' ->'+locObj.long_name);
        if (locObj.types[j] === 'locality') {
          jQuery(city_input).attr('value', locObj.long_name);
        }
      }
    }
  });

  });

</script>
