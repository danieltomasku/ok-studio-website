// Google Analytics event tracking
// var trackEl = document.querySelectorAll('.ga-track');
// Array.prototype.forEach.call(trackEl, function(el) {
//     el.onclick = function() {
//         var elCategory = this.getAttribute('data-category');
//         var elAction = this.getAttribute('data-action');
//         var elLabel = this.getAttribute('data-label');
//         ga('send', 'event', elCategory, elAction, elLabel);
//     };
// });

// function sendAnalytics(el) {
//   var elCategory = el.getAttribute('data-category');
//   var elAction = el.getAttribute('data-action');
//   var elLabel = el.getAttribute('data-label');
//   ga('send', 'event', elCategory, elAction, elLabel);
// }

artsEventFired = 0;
educationEventFired = 0;
housingEventFired = 0;
humanrightsEventFired = 0;


// Sticky Scroll Functionality
var scrollPos;

var artsNav = document.getElementById('nav-arts');
var artsNavTopLoad;
var educationNav = document.getElementById('nav-education');
var educationNavTopLoad;
var housingNav = document.getElementById('nav-housing');
var housingNavTopLoad;
var humanrightsNav = document.getElementById('nav-humanrights');
var humanrightsNavTopLoad;

var artsEl = document.getElementById('arts');
var educationEl = document.getElementById('education');
var housingEl = document.getElementById('housing');
var humanrightsEl = document.getElementById('humanrights');
var artstitleBar = document.querySelector('#arts .title-bar');
var educationtitleBar = document.querySelector('#education .title-bar');
var housingtitleBar = document.querySelector('#housing .title-bar');
var humanrightstitleBar = document.querySelector('#humanrights .title-bar');


var loadingScreen = document.querySelector('.loading-screen');

var headerEl = document.getElementById('header');
var viewportHeight;

window.onload = function () {
  scrollPos = window.pageYOffset;
  fadeIn();
  viewportHeight = window.innerHeight;
  navBarPos();
};
window.ontouchmove = function () {
  scrollPos = window.pageYOffset;
};
window.onresize = function () {
};

function navBarPos () {
  viewportHeight = window.innerHeight;
  artsNavTopLoad = viewportHeight - 180;
  educationNavTopLoad = viewportHeight - 135;
  housingNavTopLoad = viewportHeight - 90;
  humanrightsNavTopLoad = viewportHeight - 45;
}

// Intro Animation

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
x = w.innerWidth||e.clientWidth||g.clientWidth,
is_root = location.pathname == "/";

function fadeIn() {
  setTimeout(function(){
    loadingScreen.style.opacity = 0;
  }, 2000);

  setTimeout(function(){
    loadingScreen.style.display = 'none';
  }, 3200);

  setTimeout(function(){
    if (scrollPos < 1) {
      TweenMax.to(window, 1.7, {scrollTo:125, ease: Power4.easeInOut});
    }
  }, 2000);


  if (scrollPos < 1) {
    document.body.classList.add('lock-scroll');
    setTimeout(function(){
      document.body.classList.remove('lock-scroll');
    }, 1800);
  }

  const artsElement = document.getElementById('arts');

  if (artsElement) {
    if (!scrollPos || scrollPos < 1) {
      setTimeout(function(){
        artsElement.style.opacity = 1;
      }, 1700);
    } else {
      artsElement.style.opacity = 1;
    }
  }

}

// Menu Functionality

function handleClickOutsideAbout() {
  var specifiedElement = document.getElementById('menu');
  var isClickInside = specifiedElement.contains(event.target);
  var about = document.getElementsByClassName('menu-button')[0];
  var isAbout = about == event.target;

  if (!isClickInside && !isAbout) {
    closeNav();
  }
}

const indexBgImages = document.querySelectorAll('.index-bg-image');
const indexTitles = document.querySelectorAll('.index-title');

indexTitles.forEach(item => {
  item.addEventListener('mouseenter', hoverIndexBgImage);
})


function hoverIndexBgImage() {
  console.log(this.classList[1]);
  indexBgImages.forEach(item => {
    if (item.classList[1] === this.classList[1]) {
      item.classList.add('move');
    } else {
      item.classList.remove('move');
    }
  })
}

function toggleIndex(e) {
  const overlay = document.getElementById('index-overlay');
  overlay.classList.contains('move') ? overlay.classList.remove('move') : overlay.classList.add('move');
}


function toggleNav(e) {
  var about = document.getElementsByClassName('menu-button')[0];
  var overlay = document.getElementById('menu');
  const indexOverlay = document.getElementById('index-overlay');

  if (indexOverlay.classList.contains('move')) {
    indexOverlay.classList.remove('move');
  } else if (overlay.classList.contains('move')) {
    overlay.classList.remove('move');
    about.classList.remove('-active');
  } else {
    overlay.classList.add('move');
    about.classList.add('-active')
  }

  document.body.classList.contains('lock-scroll') && !overlay.classList.contains('move') ? document.body.classList.remove('lock-scroll') : document.body.classList.add('lock-scroll');
  // setTimeout(function(){
  //   // document.getElementsByClassName('content-overlay')[0].classList.remove('hide');
  // }, 600);
  var eventList = ['click', 'touchstart'];
  eventList.forEach(function(event) {
    document.addEventListener(event, handleClickOutsideAbout);
  });
  // sendAnalytics(e);
}

function closeNav() {
  document.getElementById('menu').classList.remove('move');
  document.body.classList.remove('lock-scroll');
  // document.getElementsByClassName('content-overlay')[0].classList.add('hide');
  var eventList = ['click', 'touchstart'];
  eventList.forEach(function(event) {
    document.removeEventListener(event, handleClickOutsideAbout);
  });
}


// Animate to Section Functionality

function animateToAnchor1(e) {
  var anchor1 = document.getElementById('arts');
  var posTop = anchor1.offsetTop - 90;
  TweenMax.to(window, 1.7, {scrollTo:posTop, ease: Power4.easeInOut});
  sendAnalytics(e);
}

function animateToAnchor2(e) {
  var anchor2 = document.getElementById('education');
  var posTop = anchor2.offsetTop - 90;
  TweenMax.to(window, 1.7, {scrollTo:posTop, ease: Power4.easeInOut});
  sendAnalytics(e);
}

function animateToAnchor3(e) {
  var anchor3 = document.getElementById('housing');
  var posTop = anchor3.offsetTop - 90;
  TweenMax.to(window, 1.7, {scrollTo:posTop, ease: Power4.easeInOut});
  sendAnalytics(e);
}

function animateToAnchor4(e) {
  var anchor4 = document.getElementById('humanrights');
  var posTop = anchor4.offsetTop - 90;
  TweenMax.to(window, 1.7, {scrollTo:posTop, ease: Power4.easeInOut});
  sendAnalytics(e);
}

function animateToTop(e) {
  TweenMax.to(window, 1.7, {scrollTo:0, ease: Power4.easeInOut});
}


// HOME PAGE CLICK-THROUGH SLIDER
const landingProjects = [...document.querySelectorAll('.landing-project')];

const activeProject = landingProjects[0];
const landingProject = document.querySelector('.landing-project');

const slideForward = document.querySelector('.slide-forward');
const slideBackward = document.querySelector('.slide-backward');

if (slideForward) {
  slideForward.addEventListener('click', handleSlideForward);
  slideBackward.addEventListener('click', handleSlideBackward);

  let index = 0;
  let total = landingProjects.length;
  function handleSlideForward() {
    landingProjects[index].classList.remove('-active');
    landingProjects[(index+1) % total].classList.add('-active');
    index = (index+1) % total;
  }

  function handleSlideBackward() {
    const itemActive = index === 0 ? total - 1 : Math.abs(index - 1);
    landingProjects[index].classList.remove('-active');
    landingProjects[itemActive].classList.add('-active');
    index = index === 0 ? total - 1 : Math.abs(index - 1);
  }
}


// PROJECT CAROUSELS
var carouselContainers = document.querySelectorAll('.carousel-wrapper');

for ( var i=0; i < carouselContainers.length; i++ ) {
  var container = carouselContainers[i];
  initCarouselContainer( container );
}

function initCarouselContainer( container ) {
  var carousel = container.querySelector('.main-carousel');
  var flkty = new Flickity(carousel, {
    contain: false,
    pageDots: false
  });
  var carouselStatus = container.querySelector('.carousel-status');

  function updateStatus() {
    var slideNumber = flkty.selectedIndex + 1;
    carouselStatus.textContent = slideNumber + ' / ' + flkty.slides.length;
  }
  updateStatus();

  flkty.on( 'select', updateStatus );
}

// BACKGROUND COLOR FADE
let vph = window.innerHeight;

const triggerElement = document.querySelector('.js-bg-color-fade');
const projectContent = document.querySelector('.project-content');

function crossTrigger() {
  const trigger = triggerElement && triggerElement.getBoundingClientRect();
  return !(trigger.top > vph - 200);
}

function fadeBackground() {
  crossTrigger() ? projectContent.classList.add('pink') : projectContent.classList.remove('pink');
}

// window.onscroll = fadeBackground;

triggerElement && fadeBackground();


// FADE-UP WHEN ELEMENTS ENTER VIEWPORT
let fadeUpElements = [...document.querySelectorAll('.js-fade-up')];

function inView (el) {
  var eb = el.getBoundingClientRect();
  return !((eb.top + eb.height < 0) || (eb.top > vph - 200));
}

function updateInView() {
  fadeUpElements.forEach(item => {
    inView(item) && item.classList.add('fade-up');
  });
}

window.onscroll = function () {
  updateInView();
  triggerElement && fadeBackground();
};

// window.onscroll = updateInView;

updateInView();


// EMOJI WORD REPLACEMENT

const allCharWrapper = Array.from(document.querySelectorAll('.char-wrapper'));
const allCharOriginal = Array.from(document.querySelectorAll('.char-original'));
const allCharEmoji = Array.from(document.querySelectorAll('.char-emoji'));


document.body.addEventListener('click', resetChars);

allCharWrapper.forEach((item) => {
  item.addEventListener('mouseenter', function (event) {
    handleMouseEnter(event);
  });
});


function handleMouseEnter(event) {
  if (event.target.children[0].classList.contains('show')) {
    event.target.children[0].classList.add('hide');
    event.target.children[0].classList.remove('show');
    event.target.children[1].classList.add('show');
    event.target.children[1].classList.remove('hide');
  } else {
    event.target.children[0].classList.add('show');
    event.target.children[0].classList.remove('hide');
    event.target.children[1].classList.add('hide');
    event.target.children[1].classList.remove('show');
  }

  if (allCharEmoji.length === document.querySelectorAll('.char-emoji.show').length) {
    allCharEmoji.forEach(item => {
      item.style.animation = 'wave 2s infinite';
    })
  } else {
    allCharEmoji.forEach(item => {
      item.style.animation = '';
    })
  }


};

function resetChars() {
  allCharOriginal.forEach(item => {
    item.classList.add('show');
    item.classList.remove('hide');
  });
  allCharEmoji.forEach(item => {
    item.classList.add('hide');
    item.classList.remove('show');
  })
}


// CIRCULAR SCROLL PROGRESS BAR + BACK TO TOP
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  var progressPath = document.querySelector('.outline'),
      pathLength   = progressPath.getTotalLength(),
      lastPosition = -1;

  progressPath.style.stroke = '#ffffff';
  progressPath.style.strokeWidth = 20;
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();

  function updateProgress() {
    var progress = pathLength - ( window.pageYOffset * pathLength / ( document.body.scrollHeight - window.innerHeight ) );

    // Update dashOffset
    progressPath.style.strokeDashoffset = progress;
  }

  function loop() {
    if ( lastPosition == window.pageYOffset ) {
      window.requestAnimationFrame( loop );
      return false;
    } else {
      lastPosition = window.pageYOffset;
      updateProgress();
    }
    window.requestAnimationFrame( loop );
  }

  // Call the loop for the first time
  loop();
}


// CUSTOM MOUSE CURSOR

// const canvas = document.querySelector('.js-canvas')
// const ctx = canvas.getContext('2d')
//
// let width = canvas.width = window.innerWidth
// let height = canvas.height = window.innerHeight
//
// let mouseX = width / 2;
// let mouseY = height / 2;
//
// let circle = {
//   radius: 10,
//   lastX: mouseX,
//   lastY: mouseY
// }
//
// const elems = [...document.querySelectorAll('[data-hover]')]
//
// function onResize () {
//   width = canvas.width = window.innerWidth
//   height = canvas.height = window.innerHeight
// }
//
// function render () {
//   circle.lastX = lerp(circle.lastX, mouseX, 0.25)
//   circle.lastY = lerp(circle.lastY, mouseY, 0.25)
//
//   ctx.clearRect(0, 0, width, height)
//   ctx.beginPath()
//   ctx.arc(circle.lastX, circle.lastY, circle.radius, 0, Math.PI * 2, false)
//   ctx.fillStyle = "#ffffff"
//   ctx.fill()
//   ctx.closePath()
//
//   requestAnimationFrame(render)
// }
//
// function init () {
//   requestAnimationFrame(render)
//
//   window.addEventListener('mousemove', function(e) {
//     mouseX = e.pageX;
//     mouseY = e.pageY;
//   })
//
//   window.addEventListener('resize', onResize, false)
//
//   let tween = TweenMax.to(circle, 0.25, {
//     radius: circle.radius * 3,
//     ease: Power1.easeInOut,
//     paused: true
//   })
//
//   elems.forEach((el) => {
//     el.addEventListener('mouseenter', () => {
//       tween.play()
//     }, false)
//     el.addEventListener('mouseleave', () => {
//       tween.reverse()
//     }, false)
//   })
// }
//
// function lerp(a, b, n) {
//   return (1 - n) * a + n * b
// }
//
// init()
