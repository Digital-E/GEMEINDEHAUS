
var frontFace = document.querySelector('.box__face--front');
var scene = document.querySelector('.scene');

 var box = document.querySelector('.box');
 var radioGroup = document.querySelector('.radio-group');
 var currentClass = '';

let faceName;
let cubeContainer = box.parentElement.parentElement;

var isExpanded;

 function changeSide() {

  var checkedRadio = radioGroup.querySelector(':checked');
  var showClass = 'show-' + checkedRadio.value;
  box.style.transform = '';
  document.removeEventListener('mousemove', moveFunction);

  if(isExpanded) {
    expand();
    document.removeEventListener('mousemove', moveFunction);
    setTimeout(function(){
          if ( currentClass ) {
      box.classList.remove( currentClass );
    }
      box.classList.add( showClass );
      currentClass = showClass;
    }, 1000);

    isExpanded = null;
    setTimeout(function(){
      expand(checkedRadio.value);
   }, 2000);
  } else {
      
    if ( currentClass ) {
      box.classList.remove( currentClass );
    }
    box.classList.add( showClass );
    currentClass = showClass;
      
    setTimeout(function(){
       expand(checkedRadio.value);
    }, 1000);

  }
 }
 // set initial side
// changeSide();

 radioGroup.addEventListener( 'change', changeSide );

//samuel code

// Full Screen On Div Click

let boxChildren = box.children;


function expand(currentClass, closed) {

  var index;

  console.log(closed);
  var closed = closed;

  if(currentClass) {
    faceName = currentClass;
  };
    
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

    isExpanded = box.children[index].classList[2];
    
    if(isExpanded) {
        
      scene.classList.add('scene');
      box.classList.remove('box--expanded');
      scene.classList.remove(`${faceName}--scene--expand`);
        

      box.children[index].classList.remove(`box__face--${faceName}--expanded`);
      box.children[index].classList.remove('box--expanded');
      scene.classList.remove('expanded');

      box.children[index].style.overflow = 'hidden';
        
      document.addEventListener('mousemove', moveFunction);
      
      setTimeout(function(){
          cubeContainer.classList.remove('expand--cube')
      },1000);

      for(i = 0; i < box.children.length; i++) {
        box.children[i].style.opacity = 1;
    }  

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

      isExpanded = box.children[index].classList[2];

      if(closed == 'closed') {
        isExpanded = null;
      }

    }

    // console.log(isExpanded);
    // console.log(index);
    // console.log(box.children[index]);
    // console.log(faceName);
    // console.log(currentClass);
}

//Close All on Close Button Click 

let closeButtons = document.getElementsByClassName('close-button');

for(var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', closeAll);
}

function closeAll() {
  var closed = 'closed';
  return expand(null, closed);
};

//Translate Hidden Div Up


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