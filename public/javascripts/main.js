function success(position) {
  var geocoder = new google.maps.Geocoder();
  var map;
  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcontainer';
  mapcanvas.style.height = '550px';
  mapcanvas.style.width = '100%';

  document.querySelector('article').appendChild(mapcanvas);

  var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var mapStyle = [{"featureType":"administrative","stylers":[{"visibility":"on"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#abbaa4"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]},{"featureType":"road.highway","stylers":[{"color":"#ad9b8d"}]}];

  var styledMap = new google.maps.StyledMapType(mapStyle,
    {name: "Styled Map"});

  var options = {
    zoom: 15,
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
    $.ajax({
      url : '/foods/api/foods',
      dataType : 'json',
      success : function(response) {
          response.forEach(function(data) {
            var place = JSON.stringify(data.address);
            var name = data.name;
            var date = data.date.slice(0, 10);
            var time = data.time;
            console.log("Place = " + place);
            codeAddress(place, name, date, time);
            // codeName(name);
          })
         }
      })
    }
fetchPlaces();

  function codeAddress(address, name, date, time) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              title: "You made it!!!!!!!!!"
          });
          var infowindow = new google.maps.InfoWindow({
            content: "<div style='color:black; font-size: 1.2em'>" + 'Event Name: ' + name + "</br>" + 'Address: ' + address.replace('"', '').slice(0, -1) + "</br>" + 'Date: ' + date + "</br>" + 'Time: ' + time + "</div>"
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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success);
} else {
  error('Geo Location is not supported');
}