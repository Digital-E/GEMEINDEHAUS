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
     
//   expand();
 }
 // set initial side
 changeSide();

 radioGroup.addEventListener( 'change', changeSide );

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
        
//      box.style.transform = none;
    
    }

};

//Translate Div See News


var newsElements = document.querySelectorAll('.news-element');
var backButton = document.querySelector('.back-button');

newsElements.forEach((element) => {
    element.addEventListener('click', function(){
        TweenMax.staggerTo(".header-subelement", 1.5, {y:'-100%', ease: Circ.easeIn}, 0.1);
    })
});

backButton.addEventListener('click', function(){
        TweenMax.staggerTo(".header-subelement", 2, {y:'0%', ease: Circ.easeInOut}, 0);
//        TweenMax.to(".news-loaded-container", 1, {y:'0%', ease: Circ.easeIn});
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
