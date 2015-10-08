function success(position) {
  var geocoder = new google.maps.Geocoder();
  var map;
  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcontainer';
  mapcanvas.style.height = '550px';
  mapcanvas.style.width = '850px';

  document.querySelector('article').appendChild(mapcanvas);

  var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var mapStyle = [{"featureType":"administrative","stylers":[{"visibility":"on"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#abbaa4"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]},{"featureType":"road.highway","stylers":[{"color":"#ad9b8d"}]}];

  var styledMap = new google.maps.StyledMapType(mapStyle,
    {name: "Styled Map"});

  var options = {
    zoom: 14,
    center: coords,
    mapTypeControl: false,
    navigationControlOptions: {
    style: google.maps.NavigationControlStyle.SMALL
    },
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var map = new google.maps.Map(document.getElementById("mapcontainer"), options);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

// fetch Places JSON from /data/places
// loop through and populate the map with markers
  function fetchPlaces() {
    // var infowindow =  new google.maps.InfoWindow({
    //     content: ''
    // });
    $.ajax({
      url : 'http://127.0.0.1:3000/foods/api/foods',
      dataType : 'json',
      success : function(response) {
          response.forEach(function(data) {
            var place = JSON.stringify(data.address);
            console.log("Place = " + place);
            codeAddress(place);
          })
            // bindInfoWindow(marker, map, infowindow, '<b>'+ places.name + "</b><br>" + places.geo_name);
            // // not currently used but good to keep track of markers
            // markers.push(marker);
         }
      })
    }
fetchPlaces();



  function codeAddress(address) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              title: "You made it!!!!!!!!!"
          });
          var infowindow = new google.maps.InfoWindow({
          content: 'Address: ' + address
          });
          marker.addListener('click', function() {
          infowindow.open(map, marker);
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
};

<<<<<<< HEAD
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    error('Geo Location is not supported');
  }
=======
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success);
} else {
  error('Geo Location is not supported');
}

>>>>>>> editpage
