var box = document.querySelector('.box');
// var radioGroup = document.querySelector('.radio-group');
// var currentClass = '';
//
// function changeSide() {
//   var checkedRadio = radioGroup.querySelector(':checked');
//   var showClass = 'show-' + checkedRadio.value;
//   if ( currentClass ) {
//     box.classList.remove( currentClass );
//   }
//   box.classList.add( showClass );
//   currentClass = showClass;
// }
// // set initial side
// changeSide();
//
// radioGroup.addEventListener( 'change', changeSide );

//samuel code

var frontFace = document.querySelector('.box__face--front');
var scene = document.querySelector('.scene');

frontFace.addEventListener('click', expand);


// Full Screen On Div Click

let boxChildren = box.children;

for(var i = 0; i < boxChildren.length; i++) {
  console.log(boxChildren[i]);
  boxChildren[i].addEventListener('click', expand);
}

// var that;

function rotationOnClick(faceName, e, isExpanded, that) {

  lastMouseX = window.innerWidth / 2;
  lastMouseY = window.innerHeigh / 2;

  that = that;

  if(faceName == 'front') {
    box.style.transform = 'translateZ(-200px) rotateX(0deg) rotateY(0deg)';
    rotX = 0;
    rotY = 0;
  }
  else if(faceName == 'back') {
    box.style.transform = 'translateZ(-200px) rotateX(0deg) rotateY(-180deg)';
    rotX = 0;
    rotY = -180;
  }
  else if (faceName =='right') {
    box.style.transform = 'translateZ(-200px) rotateX(0deg) rotateY(-90deg)';
    rotX = 0;
    rotY = -90;
  }
  else if (faceName == 'left') {
    box.style.transform = 'translateZ(-200px) rotateX(0deg) rotateY(90deg)';
    rotX = 0;
    rotY = 90;
  }
  else if (faceName == 'top'){
    box.style.transform = 'translateZ(-200px) rotateY(0deg) rotateX(-90deg)';
    rotY = 0;
    rotX = -90;
  }
  else {
    box.style.transform = 'translateZ(-200px) rotateY(0deg) rotateX(90deg)';
    rotY = 0;
    rotX = 90;
  }

  setTimeout(callback,1000,isExpanded, faceName, that);

  return [lastMouseX, lastMouseY];

  function callback(isExpanded, faceName, that) {
    console.log(that);

    if(isExpanded) {

      scene.classList.add('scene');
      box.classList.remove('box--expanded');
      scene.classList.remove(`${faceName}--scene--expand`);

      that.classList.remove(`box__face--${faceName}--expanded`);
      that.classList.remove('box--expanded');
      scene.classList.remove('expanded');

      that.style.overflow = 'hidden';

    } else {
      box.classList.add(`${faceName}--box--expanded`);
      scene.classList.remove('scene');
      scene.classList.add(`${faceName}--scene--expand`);

      that.classList.add('box--expanded');
      that.classList.add(`box__face--${faceName}--expanded`);
      scene.classList.add('expanded');
      that.style.overflow = 'auto';
    }
  }
}

function expand(e) {
  var isExpanded = this.classList[2];
  var faceName = this.classList[1].substring(11);

  let that = this;

  rotationOnClick(faceName, e, isExpanded, that);

};

//Rotate On Drag
    var lastMouseX = 0;
    var lastMouseY = 0;

    var rotY = 0;
    var rotX = 0;

  document.addEventListener('mousedown', function(e){
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    document.addEventListener('mousemove', mousePosition2);
  });

document.addEventListener('mouseup', function(){
    document.removeEventListener('mousemove', mousePosition2);
  });

  function mousePosition2(e) {

    var box = document.querySelector('.box');

    var deltaX = (e.pageX * 180 / 1440) - (lastMouseX * 180 / 1440);
    var deltaY = (e.pageY * 180 / 1440) - (lastMouseY * 180 / 1440);

    // lastMouseX = e.pageX;
    // lastMouseY = e.pageY;


    // let mouseY = e.clientX * 180 / 1440;
    // let mouseX = e.clientX * 180 / 1440;

    rotY += deltaX * 0.1;
    rotX -= deltaY * 0.1;


    box.style.transform = `translateZ(-200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    console.log(box.style.transform);
  }
