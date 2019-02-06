var box = document.querySelector('.box');
 var radioGroup = document.querySelector('.radio-group');
 var currentClass = '';

 function changeSide() {
   var checkedRadio = radioGroup.querySelector(':checked');
   var showClass = 'show-' + checkedRadio.value;
   if ( currentClass ) {
     box.classList.remove( currentClass );
   }
   box.classList.add( showClass );
   currentClass = showClass;
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


function OnFaceClick(faceName, e, isExpanded, that) {

  function callback(isExpanded, faceName, that) {
    console.log(that);

  }
}

function expand(e) {
  var isExpanded = this.classList[2];
  var faceName = this.classList[1].substring(11);

  
    if(isExpanded) {

      scene.classList.add('scene');
      box.classList.remove('box--expanded');
      scene.classList.remove(`${faceName}--scene--expand`);

      this.classList.remove(`box__face--${faceName}--expanded`);
      this.classList.remove('box--expanded');
      scene.classList.remove('expanded');

      this.style.overflow = 'hidden';

    } else {
      box.classList.add(`${faceName}--box--expanded`);
      scene.classList.remove('scene');
      scene.classList.add(`${faceName}--scene--expand`);

      this.classList.add('box--expanded');
      this.classList.add(`box__face--${faceName}--expanded`);
      scene.classList.add('expanded');
      this.style.overflow = 'auto';
    }

};