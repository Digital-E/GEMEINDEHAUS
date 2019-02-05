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


// Add click listener to all

let boxChildren = box.children;

for(var i = 0; i < boxChildren.length; i++) {
  console.log(boxChildren[i]);
  boxChildren[i].addEventListener('click', expand);
}

function expand() {
  var isExpanded = this.classList[2];
  var faceName = this.classList[1].substring(11);

  console.log(this);


  console.log(faceName);

  if(isExpanded) {
    // this.classList.remove('box--expanded');

    // box.classList.remove('box--expanded');
    //
    scene.classList.add('scene');
    scene.classList.remove(`${faceName}--scene--expand`);
    //
    this.classList.remove(`box__face--${faceName}--expanded`);
    this.classList.remove('box--expanded');
    scene.classList.remove('expanded');

  } else {
    // this.classList.add('box--expanded');
    box.classList.add('box--expanded');
    scene.classList.remove('scene');
    scene.classList.add(`${faceName}--scene--expand`);
    //
    this.classList.add('box--expanded');
    this.classList.add(`box__face--${faceName}--expanded`);
    scene.classList.add('expanded');
  }
};
