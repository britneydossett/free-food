function success(position) {
  var geocoder = new google.maps.Geocoder();
  var map;
  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcontainer';
  mapcanvas.style.height = '400px';
  mapcanvas.style.width = '600px';

  document.querySelector('article').appendChild(mapcanvas);

  var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

// var locations = [
//      [3.180967,101.715546],
//      [3.200848,101.616669],
//      [3.147372,101.597443],
//      [3.19125,101.710052]
// ];

  var options = {
    zoom: 13,
    center: coords,
    mapTypeControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mapcontainer"), options);

  // var marker = new google.maps.Marker({
  //     position: coords,
  //     map: map,
  //     title:"You are here!"
  // });
// var marker, i;

// for (i = 0; i < locations.length; i++) {
//     marker = new google.maps.Marker({
//          position: new google.maps.LatLng(locations[i][0], locations[i][1]),
//          map: map
//     });

//     // google.maps.event.addListener(marker, 'click', (function(marker, i) {
//     //      return function() {
//     //          infowindow.setContent(locations[i][0]);
//     //          infowindow.open(map, marker);
//     //      }
//     // })(marker, i));
// }

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

          // loop through places and add markers
          // for (p in places) {
          //   //create gmap latlng obj
          //   tmpLatLng = new google.maps.LatLng( places[p].geo[0], places[p].geo[1]);
          //   // make and place map maker.
          //   var marker = new google.maps.Marker({
          //       map: map,
          //       position: tmpLatLng,
          //       title : places[p].name + "<br>" + places[p].geo_name
          //   });
          //   bindInfoWindow(marker, map, infowindow, '<b>'+places[p].name + "</b><br>" + places[p].geo_name);
          //   // not currently used but good to keep track of markers
          //   markers.push(marker);
          // }
        }
      })
    }
fetchPlaces();


  function codeAddress(address) {
      // var address = "675 Ponce de Leon Ave SE, Atlanta, GA"
      // console.log(fetchPlaces());
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          // map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              title: "You made it!!!!!!!!!"
          });
          console.log(marker);
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

