//Riot.JS Routing

route.start(true);

// matches to link

route(function(event, id) {

  if(id) {

    Prismic.api("https://gemindehaus.cdn.prismic.io/api/v2").then(function(api) {
      return api.getByID(id);
  }).then(function(response) {
      console.log("Documents: ", response);
      loadEventToDom(response);
  }, function(err) {
      console.log("Something went wrong: ", err);
  });

  } else {

    history.pushState(null, null, '/');
        
    TweenMax.staggerTo(".header-subelement", 2, {y:'0%', ease:Power2.easeInOut}, 0);

  }

})


//Back-end Code


Prismic.api("https://gemindehaus.cdn.prismic.io/api/v2").then(function(api) {
    return api.query(
      Prismic.Predicates.at('document.type', 'blog-post'),
    { orderings : '[my.blog-post.date desc]' }
    ); // An empty query will return all the documents
}).then(function(response) {
    console.log("Documents: ", response.results);

    response.results.forEach(item => {
      addToDom(item);
    });

}, function(err) {
    console.log("Something went wrong: ", err);
});

function addToDom(response) {
  console.log(response);

  //var dateReformat = response.rawJSON.date.split('-').reverse().join('/');

  //Get Date and make Array
  var dateReformatPrePre = response.rawJSON.date.split('-').reverse();

  //Remove Two First Digits From Year
  var reformatYear = dateReformatPrePre[2].split('').splice(2,2).join('');

  //Remove Pre-Formatted Year From Date
  var dateReformatPre = dateReformatPrePre.splice(0,2);

  //Add reformatYear to Array
  dateReformatPre.push(reformatYear);

  //Join reFormatted Array
  var dateReformat = dateReformatPre.join('/');


  var eventsList = document.querySelectorAll('.news-elements');
  var newEventNode = document.createElement('div');
  var span = document.createElement('span');
  span.innerHTML = `${response.rawJSON.title[0].text}`;
  var span2 = document.createElement('span');
  var span3 = document.createElement('span');
  span3.innerHTML = dateReformat;
  var span4 = document.createElement('span');
  span4.innerHTML = `${response.rawJSON.tag[0].text}`;

  newEventNode.className = 'news-element';
  newEventNode.id = `${response.id}`;

  span2.appendChild(span3);
  span2.appendChild(span4);

  span2.classList.add('news-element-flex');

  newEventNode.appendChild(span);
  newEventNode.appendChild(span2);

  newEventNode.addEventListener('click', function(){
    clickEvent(newEventNode);
  })

  eventsList[0].appendChild(newEventNode);

};


//Animation Code

var frontFace = document.querySelector('.box__face--front');
var scene = document.querySelector('.scene');

var box = document.querySelector('.box');
var radioGroup = document.querySelector('.radio-group');
var currentClass = '';

let faceName;
let cubeContainer = box.parentElement.parentElement;

var isExpanded;
var closed;

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

//Close All on Close Button Click 

let closeButtons = document.getElementsByClassName('close-button');

for(var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', closeAll);
}

function closeAll() {
  // closed = "closed";
  expand("", "closed");
};

// Full Screen On Div Click

let boxChildren = box.children;


function expand(currentClass, closed) {

  var index;

  closed = closed;

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
      scene.classList.remove(`${faceName}--scene--expand`);
      scene.classList.remove('expanded');

      // box.classList.remove('box--expanded');
      // box.classList.remove(`${faceName}--box--expanded`);
      // box.classList.remove(`show-${faceName}`);
        

      box.children[index].classList.remove(`box__face--${faceName}--expanded`);
      box.children[index].classList.remove('box--expanded');

      if (index !==1)
      box.children[index].children[1].style.overflow = 'hidden';
        
      
      setTimeout(function(){
          cubeContainer.classList.remove('expand--cube')
      },1000);

      setTimeout(function(){
          for(i = 0; i < box.children.length; i++) {
            box.children[i].style.visibility = "visible";
              }  
            },1000);
      
      setTimeout(function(){
        document.addEventListener('mousemove', moveFunction);
      },1000);

    } else {
        
      for(i = 0; i < box.children.length; i++) {
          box.children[i].style.visibility = 'hidden';
          box.children[index].style.visibility = 'visible';
      }
        
      // box.classList.add(`${faceName}--box--expanded`);

      setTimeout(function(){
        scene.classList.remove('scene');
        scene.classList.add(`${faceName}--scene--expand`);
        scene.classList.add('expanded');
  
        box.children[index].classList.add('box--expanded');
        box.children[index].classList.add(`box__face--${faceName}--expanded`);
          
        if (index !==1)
        box.children[index].children[1].style.overflow = 'auto';
  
        cubeContainer.classList.add('expand--cube'); 
  
        document.removeEventListener('mousemove', moveFunction);
  
        isExpanded = box.children[index].classList[2];
      },1000);
    }

    if(closed) {
      isExpanded = null;
    }
}


//Translate Hidden Div Up


var newsElements = document.querySelectorAll('.news-element');
var backButton = document.querySelector('.back-button');

// newsElements.forEach((element) => {
//     element.addEventListener('click', function(){
//         TweenMax.staggerTo(".header-subelement", 1.5, {y:'-100%', ease:Power2.easeInOut}, 0.1);

//         TweenMax.staggerFromTo(".loaded-subelement", 2,{y:'100%'}, {y:'0%', ease: Circ.easeOut}, 0.1)
//     })
// });

backButton.addEventListener('click', function(){

        history.pushState(null, null, '/');
        
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