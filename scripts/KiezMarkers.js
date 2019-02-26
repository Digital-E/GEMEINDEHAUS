


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
      zoom: 15,
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
      position: new google.maps.LatLng(53.555651,9.960053),
      icon: {
        anchor: new google.maps.Point(30, 30.26),
        size: new google.maps.Size(30,30.26),
        url: '../GEMEINDEHAUS/images/favicon.png'
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
        {lat: '53.556443', long: '9.961525'},
        {lat: '53.554852',long: '9.962345'},
        {lat: '53.552840',long: '9.956451'},
        {lat: '53.5528226',long: '9.9609056'},
        {lat: '53.552831',long: '9.963118'},
        {lat: '53.558223',long: '9.962832'},
        {lat: '53.556459',long: '9.962343'},
        {lat: '53.552907',long: '9.960115'},
        {lat: '53.553241',long: '9.961525'},
        {lat: '53.559312',long: '9.964531'},
        {lat: '53.555671',long: '9.962547'},
        {lat: '53.5530997',long: '9.9592442'},
        {lat: '53.556565',long: '9.962767'},
        {lat: '53.558140',long: '9.963108'}
      ];

      markers.forEach(function(object, index, markers) {
         markers[index] = new google.maps.Marker({
            position: new google.maps.LatLng(markersArray[index].lat, markersArray[index].long),
            map: map,
            icon: {
                url: '../GEMEINDEHAUS/pin.svg',
                anchor: new google.maps.Point(30, 30.26),
                scaledSize: new google.maps.Size(30, 30),
            }
        });
      })

    //   new SVGMarker({
    //     map: map,
    //     position: new google.maps.LatLng(markersArray[index].lat, markersArray[index].long),
    //     icon: {
    //       anchor: new google.maps.Point(30, 30.26),
    //       size: new google.maps.Size(60,30.26),
    //       url: './pin.svg'
    //     //   '../GEMEINDEHAUS/pin.svg'
    //     }
    //   });

    var places = document.querySelectorAll('.map-list-grid-item');
    var placesNames = [];

    places.forEach(function(place, index){
        placesNames[index] = place.childNodes[3].innerHTML;
    });

    places.forEach(function(place){
        place.addEventListener('click', zoomTo);
        place.addEventListener('mouseover', zoomTo);
        place.addEventListener('mouseout', zoomOut);
    });

    function zoomTo() {

        var match, zoom;
        var name = this.childNodes[3].innerHTML;

        for(var i = 0; i < placesNames.length + 1; i++) {
            if (name == placesNames[i]) {

                match = placesNames.indexOf(name);

                zoom = 18 + Math.random();

                markers[match] = new google.maps.Marker({
                    position: new google.maps.LatLng(markersArray[match].lat, markersArray[match].long),
                    map: map,
                    icon: {
                        url: './pin2.svg',
                        anchor: new google.maps.Point(30, 30.26),
                        scaledSize: new google.maps.Size(30, 30),
                    }
                });

            }

        }

        // map.setZoom(zoom);      // This will trigger a zoom_changed on the map
        // map.panTo(new google.maps.LatLng(markersArray[match].lat, markersArray[match].long));
    };

    function zoomOut() {

        var match, zoom;
        var name = this.childNodes[3].innerHTML;

        for(var i = 0; i < placesNames.length + 1; i++) {
            if (name == placesNames[i]) {

                match = placesNames.indexOf(name);

                zoom = 18 + Math.random();

                markers[match] = new google.maps.Marker({
                    position: new google.maps.LatLng(markersArray[match].lat, markersArray[match].long),
                    map: map,
                    icon: {
                        url: '../GEMEINDEHAUS/pin.svg',
                        anchor: new google.maps.Point(30, 30.26),
                        scaledSize: new google.maps.Size(30, 30),
                    }
                });

            }

        }

        // map.setZoom(zoom);      // This will trigger a zoom_changed on the map
        // map.panTo(new google.maps.LatLng(markersArray[match].lat, markersArray[match].long));
    };

  });
}