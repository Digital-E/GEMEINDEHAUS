var frontFace = document.querySelector('.box__face--front');
var scene = document.querySelector('.scene');

var box = document.querySelector('.box');
 var radioGroup = document.querySelector('.radio-group');
 var currentClass = '';

 function changeSide() {
   var checkedRadio = radioGroup.querySelector(':checked');
   var showClass = 'show-' + checkedRadio.value;
   
   box.style.transform = '';
   document.removeEventListener('mousemove', moveFunction);
     
   if ( currentClass ) {
     box.classList.remove( currentClass );
   }
   box.classList.add( showClass );
   currentClass = showClass;
     
   setTimeout(function(){
      expandBis(checkedRadio.value) 
   }, 1000);
 }
 // set initial side
// changeSide();

 radioGroup.addEventListener( 'change', changeSide );

//samuel code


//frontFace.addEventListener('click', expand);


// Full Screen On Div Click

let boxChildren = box.children;

for(var i = 0; i < boxChildren.length; i++) {
  boxChildren[i].addEventListener('click', expand);
}


function expand() {
  var isExpanded = this.classList[2];
  var faceName = this.classList[1].substring(11);
  var cubeContainer = this.parentElement.parentElement.parentElement;
    
    if(isExpanded) {
        
      scene.classList.add('scene');
      box.classList.remove('box--expanded');
      scene.classList.remove(`${faceName}--scene--expand`);
        

      this.classList.remove(`box__face--${faceName}--expanded`);
      this.classList.remove('box--expanded');
      scene.classList.remove('expanded');

      this.style.overflow = 'hidden';
        
      document.addEventListener('mousemove', moveFunction);
        
      
      setTimeout(function(){
          cubeContainer.classList.remove('expand--cube')
      },1000);
        
      for(i = 0; i < box.children.length; i++) {
          box.children[i].style.opacity = 1;
      }  

    } else {
      box.classList.add(`${faceName}--box--expanded`);
      scene.classList.remove('scene');
      scene.classList.add(`${faceName}--scene--expand`);
      
      cubeContainer.classList.add('expand--cube'); 

      this.classList.add('box--expanded');
      this.classList.add(`box__face--${faceName}--expanded`);
      scene.classList.add('expanded');
        
      this.style.overflow = 'auto';
    
      
      document.removeEventListener('mousemove', moveFunction);
    
    }

};

function expandBis(currentClass) {
    
  var isExpanded = box.children[0].classList[2];
  var faceName = currentClass;
  var cubeContainer = box.parentElement.parentElement;
  var index;
  var filterArray;
    
    if (faceName == 'front') {
        index = 0;
        }
    else if (faceName == 'back') {
        index = 1;
    }
    else if (faceName == 'right') {
         index = 2;    
    }
    else if (faceName == 'left') {
        index = 3;
    }
    else if (faceName == 'top') {
        index = 4;
    }
    else {
        index = 5;
    }

    
    if(isExpanded) {
        
      scene.classList.add('scene');
      box.classList.remove('box--expanded');
      scene.classList.remove(`${faceName}--scene--expand`);
        

      box.children[index].remove(`box__face--${faceName}--expanded`);
      box.children[index].remove('box--expanded');
      scene.classList.remove('expanded');

      box.children[index].style.overflow = 'hidden';
        
      document.addEventListener('mousemove', moveFunction);
        
      for(i = 0; i < box.children.length; i++) {
          box.children[i].style.opacity = 1;
      }  
      
      setTimeout(function(){
          cubeContainer.classList.remove('expand--cube')
      },1000);
        


    } else {
        
      for(i = 0; i < box.children.length; i++) {
          box.children[i].style.opacity = 0;
          box.children[index].style.opacity = 1;
      }
        
      box.classList.add(`${faceName}--box--expanded`);
      scene.classList.remove('scene');
      scene.classList.add(`${faceName}--scene--expand`);
      
      cubeContainer.classList.add('expand--cube'); 

      box.children[index].classList.add('box--expanded');
      box.children[index].classList.add(`box__face--${faceName}--expanded`);
      scene.classList.add('expanded');
        
      box.children[index].style.overflow = 'auto';
    
      
      document.removeEventListener('mousemove', moveFunction);

    }
}

//Translate Div See News


var newsElements = document.querySelectorAll('.news-element');
var backButton = document.querySelector('.back-button');

newsElements.forEach((element) => {
    element.addEventListener('click', function(){
        TweenMax.staggerTo(".header-subelement", 1.5, {y:'-100%', ease:Power2.easeInOut}, 0.1);

        TweenMax.staggerFromTo(".loaded-subelement", 2,{y:'100%'}, {y:'0%', ease: Circ.easeOut}, 0.1)
    })
});

backButton.addEventListener('click', function(){
        TweenMax.staggerTo(".header-subelement", 2, {y:'0%', ease:Power2.easeInOut}, 0);
});


//Mouse Move Cube

document.addEventListener('mousemove', moveFunction);

function moveFunction(e) {
    
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
        
    var mouseX = e.clientX * 100 / windowWidth;
    var mouseY = e.clientY * 100 / windowHeight;
    
    var centerX = windowWidth / 2;
    var centerY = windowHeight / 2;
    
    
    var rotX;
    var rotY;
    
        rotX = (centerY - e.clientY) * (100 / windowHeight) * 0.5;
        rotY = (centerX - e.clientX) * (100 / windowWidth) * 0.5;
        
        box.style.transform = `translateZ(-200px) rotateX(${rotX}deg) rotateY(${-rotY}deg)`;
};


//Init Map
function initMap() {

        // Create a map object, and include the MapTypeId to add
        // to the map type control.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 55.647, lng: 37.581},
          zoom: 11,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
        });

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

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
  };
  
