
//Disable Body Scroll Desktop & Mobile

setTimeout(function(){
  $('body').addClass('stop-scrolling');
  $('body').bind('touchmove', function(e){e.preventDefault()});
},1000);

//Grid Animate

// const gridRight = document.querySelector(".map-container-right");
// const gridLeft = document.querySelector(".map-container-left");

// animateCSSGrid.wrapGrid(gridRight, {duration : 1000, stagger: 100, easing: 'backInOut'});
// animateCSSGrid.wrapGrid(gridLeft, {duration : 1000, stagger: 100, easing: 'backInOut'});

//Riot.JS Routing

route.start(true);

// matches to link

route(function(event, id) {

    history.pushState(null, null, '/');
        
    TweenMax.staggerTo(".header-subelement", 2, {y:'0%', ease:Power2.easeInOut}, 0);

    if(id) {

      Prismic.api("https://gemeindehaus.cdn.prismic.io/api/v2").then(function(api) {
        return api.getByID(id);
    }).then(function(response) {
        console.log("Documents: ", response);
        loadEventToDom(response);
    }, function(err) {
        console.log("Something went wrong: ", err);
    });
  }

});

//NiceScroll.js

if(window.innerWidth < 768) {
  $(function() {  
    $(".map-container-left").niceScroll({autohidemode: "hidden"});
    $(".inner-scroll-div").niceScroll({autohidemode: "hidden"});
    $(".header").niceScroll({autohidemode: "hidden"});
  });
}



//Back-end Code


Prismic.api("https://gemeindehaus.cdn.prismic.io/api/v2").then(function(api) {
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

Prismic.api("https://gemeindehaus.cdn.prismic.io/api/v2").then(function(api) {
    return api.query(
      Prismic.Predicates.at('document.type', 'calendar-event'),
    { orderings : '[my.calendar-event.date desc]' }
    ); // An empty query will return all the documents
}).then(function(response) {
    console.log("Documents: ", response.results);

    response.results.forEach(item => {
      addToCalendar(item);
    });

}, function(err) {
    console.log("Something went wrong: ", err);
}).then(function(){

  //Add Impressum Button To DOM

  setTimeout(function(){
    
    var impressumButton = document.createElement('div');
    impressumButton.className = 'impressum-button';
    impressumButton.innerHTML = 'Impressum';
    var newsElementsList = document.querySelector('.news-elements');
    newsElementsList.appendChild(impressumButton);
  
    // Translate Impressum Div
  
  var impressumButton = document.querySelector('.impressum-button');
  var impressumContent = document.querySelector('.impressum-content');
  
  impressumButton.addEventListener('click', function() {

    $('.news-elements').animate({scrollTop:0}, 1000);

    $('body').removeClass('stop-scrolling');

    TweenMax.staggerTo(".header-subelement", 2, {y:'30%', ease:Power2.easeInOut}, 0);
    impressumContent.style.zIndex = "999";
    TweenMax.to(".impressum-content",2, {y:'5%', ease:Power2.easeInOut});
  
    window.addEventListener('scroll', function(){
      $('body').addClass('stop-scrolling');
      TweenMax.staggerTo(".header-subelement", 0.5, {y:'0%', ease:Power2.easeOut}, 0);
      impressumContent.style.zIndex = "0";
      TweenMax.to(".impressum-content",0.2, {y:'-200%', ease:Power2.easeIn});
    }); 
  });

  },500);

});

function addToDom(response) {
  // console.log(response);

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
  var hr = document.createElement('hr');

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

  newEventNode.parentNode.insertBefore(hr, newEventNode.nextSibling);

};

function addToCalendar(response) {

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


  var eventsList = document.querySelectorAll('.kalender-container');
  var newEventNode = document.createElement('div');
  var span = document.createElement('span');
  span.innerHTML = `${response.rawJSON.title[0].text}`;
  var span2 = document.createElement('div');
  var span3 = document.createElement('span');
  span3.innerHTML = dateReformat;
  var span4 = document.createElement('span');
  span4.innerHTML = `${response.rawJSON.tag[0].text}`;
  var span5 = document.createElement('span');
  var link = document.createElement('a');
  link.innerHTML = '<img src="./GEMEINDEHAUS/link.svg" alt="">';
  link.setAttribute('href', `${response.rawJSON.link.url}` );
  span5.appendChild(link);
  var hr = document.createElement('hr');

  newEventNode.className = 'kalender-content';
  newEventNode.id = `${response.id}`;

  span.className = 'news-loaded-content-top-container-title';
  span2.appendChild(span3);
  span2.appendChild(span4);
  span2.className = "news-loaded-content-top-container-flex";
  span3.className = 'news-loaded-content-top-container-date';
  span4.className = 'news-loaded-content-top-container-tag';
  span5.className = 'news-loaded-content-top-container-share';

  newEventNode.appendChild(span);
  newEventNode.appendChild(span2);
  newEventNode.appendChild(span5);


  newEventNode.addEventListener('click', function(){
    clickEvent(newEventNode);
  })

  eventsList[0].appendChild(newEventNode);

  newEventNode.parentNode.insertBefore(hr, newEventNode.nextSibling);

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

var index;

 function changeSide() {

  $('.close-button').animate({'display' : 'inline-block', 'opacity' : '1'},2000);
  
  $('body').addClass('stop-scrolling');
  $('body').bind('touchmove', function(e){e.preventDefault()});
  $('.header').bind('touchmove', function(e){e.preventDefault()});

  box.style.transition = 'transform 1s'; 

  var checkedRadio = radioGroup.querySelector(':checked');
  var showClass = 'show-' + checkedRadio.value;
  box.style.transform = '';
  
  document.removeEventListener('mousemove', moveFunction);

  window.removeEventListener("deviceorientation", handleOrientation);

  //Hide All Sides Except Shown Side

  if(checkedRadio.value) {
    faceName = checkedRadio.value;
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

    setTimeout(function(){
      for(i = 0; i < box.children.length; i++) {
        // box.children[i].style.visibility = 'hidden';
        // box.children[i].style.opacity = 0;
        box.children[i].style.display = 'none';
        // box.children[index].style.visibility = 'visible';
        // box.children[index].style.opacity = 1;
        box.children[index].style.display = 'inline-block';
      }
    },700);

  if(isExpanded) {

    expand();
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


//Close All on Close Button Click 

let closeButtons = document.getElementsByClassName('close-button');

for(var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', closeAll);
}

function closeAll() {

  $('.close-button').animate({'display' : 'inline-block', 'opacity':'0'},1000);

  expand("", "closed");

  setTimeout(function(){
    document.addEventListener('mousemove', moveFunction);
    $('body').removeClass('stop-scrolling');
    box.style.transition = 'transform 1s';
  },1000);

  if(window.innerWidth < 768) {
    setTimeout(function(){
      box.style.transform = 'translateZ(-200px) rotateX(0deg) rotateY(0deg)';
    },1000);
    setTimeout(function(){
      box.style.transition = 'transform 0.1s';
      $('.header').unbind('touchmove');
      window.addEventListener("deviceorientation", handleOrientation);
    },1500);

  }

};

// Full Screen On Div Click

function expand(currentClass, closed) {

  closed = closed;

  var overlay = document.querySelector('.overlay');

  if(overlay.style.visibility == "visible") {
    overlay.style.visibility = "hidden";
    document.querySelector('.news-elements').style.filter = 'blur(0px)';
    document.querySelector('.radio-group').style.filter = 'blur(0px)';
    document.querySelector('.socials').style.filter = 'blur(0px)';
    document.querySelector('.impressum-button').style.filter = 'blur(0px)';
    document.querySelector('.news-container').classList.toggle('news-container-expanded');
    
    setTimeout(function(){
      document.querySelector('.news-container').style.transitionDuration = "0s";
    },500);

  } else {
    overlay.style.visibility = "visible";
    document.querySelector('.news-elements').style.filter = 'blur(20px)';
    document.querySelector('.radio-group').style.filter = 'blur(20px)';
    document.querySelector('.socials').style.filter = 'blur(20px)';
    document.querySelector('.impressum-button').style.filter = 'blur(20px)';
    document.querySelector('.news-container').style.transitionDuration = "1s";
    document.querySelector('.news-container').classList.toggle('news-container-expanded');
  }

    isExpanded = box.children[index].classList[2];

    
    
    if(isExpanded) {
        
      scene.classList.add('scene');
      scene.classList.remove(`${faceName}--scene--expand`);
      scene.classList.remove('expanded');
        
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
            box.children[i].style.opacity = 1;

            box.children[i].style.display = 'inline-block';
              }  
            },1000);

    } else {

      document.removeEventListener('mousemove', moveFunction);
      window.removeEventListener("deviceorientation", handleOrientation);

    

      setTimeout(function(){
        scene.classList.remove('scene');
        scene.classList.add(`${faceName}--scene--expand`);
        scene.classList.add('expanded');
  
        box.children[index].classList.add('box--expanded');
        box.children[index].classList.add(`box__face--${faceName}--expanded`);
          
        if (index !==1)
        box.children[index].children[1].style.overflow = 'auto';
  
        cubeContainer.classList.add('expand--cube'); 
  
        isExpanded = box.children[index].classList[2];
      },0);
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

if (window.innerWidth > 768) {
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
    
        rotX = (centerY - e.clientY) * (100 / windowHeight) * 1.2;
        rotY = (centerX - e.clientX) * (100 / windowWidth) * 1.2;
        
        box.style.transform = `translateZ(-200px) rotateX(${rotX}deg) rotateY(${-rotY}deg)`;
};
}

//Accelerometer Move Cube

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", handleOrientation);
}

function handleOrientation(event) {
  // var absolute = event.absolute;
  // var alpha    = event.alpha;
  var beta  = event.beta;
  var gamma = event.gamma;

  var rotX;
  var rotY;

        rotX =  beta * 1;
        rotY = gamma * 1;
      
        box.style.transform = `translateZ(-200px) rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
}

//Map Mobile Expand

var mapToExpand = document.querySelector('.map-container');
var mapExpandButton = document.querySelector('.map-button-mobile');

mapExpandButton.addEventListener('click', function(){
  mapToExpand.classList.toggle('map-container-expand');
})


//Z-index Change

$(".news-element").on("mouseover",function(){
  $(this).parent().children().each(function(){
    $(this).css({"opacity":"0.7","z-index":"1"});
  }
  );
  $(this).css({"opacity":"1","z-index":"999"});
});

$(".news-element").on("mouseout",function(){
  $(this).parent().children().each(function(){
    $(this).css({"opacity":"1","z-index":"1"});
  }
  );
  $(this).css({"opacity":"1","z-index":"1"});
});
