


function initMap() {
  window.addEventListener('load', function() {

    
    var styledMapType = new google.maps.StyledMapType([
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#e9e9e9"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f5f5f5"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 29
              },
              {
                  "weight": 0.2
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 18
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f5f5f5"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#dedede"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#333333"
              },
              {
                  "lightness": 40
              }
          ]
      },
      {
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f2f2f2"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#fefefe"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#fefefe"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      }
    ],
    {name: 'Styled Map'});

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: {lat: 53.5564284, lng: 9.958706},
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
      }
    });

    //  Associate the styled map with the MapTypeId and set it to display.
      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');

    // See Github for class https://github.com/defvayne23/SVGMarker

    var markerHome = new SVGMarker({
      map: map,
      position: new google.maps.LatLng(53.5564284,9.958706),
      icon: {
        anchor: new google.maps.Point(30, 30.26),
        size: new google.maps.Size(30,30.26),
        url: './images/favicon.png'
      }
    });

    //Create Markers

    var markers = [];
    createVariables();

    function createVariables(){
      
        for (var i = 0; i <= 13; ++i) {
            markers[i] = null;
        }
      
        return markers;
      }


    var markersArray = [
        {lat: '53.556367', long: '9.9593499'},
        {lat: '53.5548417',long: '9.9601458'},
        {lat: '53.5528256',long: '9.9564484'},
        {lat: '53.5528226',long: '9.9609056'},
        {lat: '53.5582106',long: '9.9606395'},
        {lat: '53.5564459',long: '9.9601125'},
        {lat: '53.5528868',long: '9.9579203'},
        {lat: '53.5532455',long: '9.9593401'},
        {lat: '53.5592952',long: '9.9622974'},
        {lat: '53.5556516',long: '9.9602833'},
        {lat: '53.5528628',long: '9.9589315'},
        {lat: '53.5530997',long: '9.9592442'},
        {lat: '53.5565742',long: '9.9617158'},
        {lat: '53.5581411',long: '9.9609226'}
      ];

      markers.forEach(function(object, index, markers) {
         markers[index] = new SVGMarker({
            map: map,
            position: new google.maps.LatLng(markersArray[index].lat, markersArray[index].long),
            icon: {
              anchor: new google.maps.Point(30, 30.26),
              size: new google.maps.Size(60,30.26),
              url: './pin.svg'
            }
          });
      })

    var places = document.querySelectorAll('.map-list-grid-item');
    var placesNames = [];

    places.forEach(function(place, index){
        placesNames[index] = place.childNodes[3].innerHTML;
    });

    places.forEach(function(place){
        place.addEventListener('click', zoomTo);
    });

    function zoomTo() {
        var match, zoom;
        var name = this.childNodes[3].innerHTML;

        for(var i = 0; i < placesNames.length + 1; i++) {
            if (name == placesNames[i]) {

                match = placesNames.indexOf(name);

                zoom = 18 + Math.random();

            }

        }

        map.setZoom(zoom);      // This will trigger a zoom_changed on the map
        map.panTo(new google.maps.LatLng(markersArray[match].lat, markersArray[match].long));
    };

  });
}